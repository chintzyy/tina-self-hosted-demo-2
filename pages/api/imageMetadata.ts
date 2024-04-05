import type { NextApiRequest, NextApiResponse } from "next";
import sharp from 'sharp'
import Sentry from "@sentry/nextjs";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import env from '~/utils/env'
import Error from "app/error";

async function processImages(buffer) {
  // Create thumbnail and normal-sized image in parallel
  try {
  const [thumbnailBuffer, largeBuffer] = await Promise.all([
    sharp(buffer)
    .resize({
      width: 400, 
      kernel: sharp.kernel.lanczos3,
      fit: 'outside',
    })
    .jpeg({
      quality: 50,
      chromaSubsampling: '4:4:4',
    })
    .toBuffer(),
    sharp(buffer)
    .resize({ width: 1600, kernel: sharp.kernel.lanczos3, })
    .jpeg({
      quality: 50,
      chromaSubsampling: '4:4:4',
    })
    .toBuffer()
  ]);

  return { thumbnailBuffer, largeBuffer };
  } catch (error) {
    // Sentry.captureException(error);
    throw Error(error)
  }
}

async function pushbufferToS3(imageBuffers, filename) {
  const client = new S3Client({
    region: env.S3_REGION,
    credentials: {
      accessKeyId: env.S3_ACCESS_KEY,
      secretAccessKey: env.S3_SECRET_KEY,
    }
  });

  return await Promise.all([
    client.send(new PutObjectCommand({
      Bucket: env.S3_BUCKET,
      Key: `gallery/${filename}-thumb.jpg`,
      Body: imageBuffers.thumbnailBuffer,
      ContentType: 'image/jpeg',
      ACL: 'public-read',
    })),

    client.send(new PutObjectCommand({
      Bucket: env.S3_BUCKET,
      Key: `gallery/${filename}-large.jpg`,
      Body: imageBuffers.largeBuffer,
      ContentType: 'image/jpeg',
      ACL: 'public-read',
    })),
  ])
    .catch((err) => {
      console.error('Pushing images to AWS s3 failed:', err)
      throw Error(err)
    })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Ensure the request is a POST request
  if (req.method !== 'GET') {
    Sentry.captureMessage(`/metadata endpoint was evoked with the ${req.method} method`)
    return res.status(405).end(); // Method Not Allowed
  }
  const { url } = req.query;

  if (!url) {
    Sentry.captureMessage('Missing URL parameter passed to imageMetadata endpoint')
    return res.status(400).json({ error: 'Missing URL parameter' });
  }

  try {
    const response = await fetch(url); 
    if (!response.ok) {
      Sentry.captureMessage(`Undable to fetch ${url}. Failed to create thumbnails`)
      return res.status(response.status).json({ error: 'Failed to fetch image' });
    } 
    // Get the image buffer from the request body
    const imageData = await response.arrayBuffer();

    const imageBuffers = await processImages(imageData)
    const filename = url.split('/').pop().split('.').shift()
    await pushbufferToS3(imageBuffers, filename)

    // Resize the image and get its metadata
    const { width: thumbWidth, height: thumbHeight } = await sharp(Buffer.from(imageBuffers.thumbnailBuffer)).metadata();
    const { width: largeWidth, height: largeHeight } = await sharp(Buffer.from(imageBuffers.largeBuffer)).metadata();

    const images = {
      thumb: {
        src: `https://${env.S3_BUCKET_DOMAIN}/gallery/${filename}-thumb.jpg`,
        width: thumbWidth,
        height: thumbHeight,
        id:`${filename}-thumb`,
      },
      large: {
        src: `https://${env.S3_BUCKET_DOMAIN}/gallery/${filename}-large.jpg`,
        width: largeWidth,
        height: largeHeight,
        id:`${filename}-large`,
      },
    }

    // Respond with the image metadata
    res.status(200).json(images);
  } catch (error) {
    console.error('Error:', error);
    Sentry.captureException(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

