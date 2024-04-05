import { isAuthorized, isUserAuthorized } from "@tinacms/auth";
import type { NextApiRequest } from "next";
import { mediaHandlerConfig, createMediaHandler } from "next-tinacms-s3/dist/handlers";
import env from "~/utils/env"
import { authJSProvider } from "../tina/[...routes]";
export const config = mediaHandlerConfig;

export default createMediaHandler({
  config: {
    credentials: {
      accessKeyId: env.S3_ACCESS_KEY,
      secretAccessKey: env.S3_SECRET_KEY,
    },
    region: env.S3_REGION,
  },
  bucket: env.S3_BUCKET,
  authorized: async (req: NextApiRequest, res: NextApiResponse): Promise<boolean> => {
    
    if (env.isDev) {
      console.log('authorized as this is a dev login')
      return true;
    }

    try {
      const user = await authJSProvider.isAuthorized(req, res)
      console.log('Authorizing user... ', user)
      return (user && user.isAuthorized) as boolean;
    } catch (e) {
      console.error(e);
      return false;
    }
  },
});
