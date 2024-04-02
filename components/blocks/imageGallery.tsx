'use client'

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { TinaTemplate } from "tinacms";
import { useTina, tinaField } from "tinacms/dist/react";

const ImageThumbnail = () => {

  return (
    <>
    </>
  )
}

export const ImageGallery = ({ data, index }: { data: PageBlocksImageGallery }) => {
  console.log(data)
  const { data: { page: { blocks }} } = useTina(data)
  const block = blocks[index]

  console.log(block)
  return (
    <Section>
      <Container
        size="large"
        width="medium"
      >
        <ul className="list-none flex flex-wrap">
          {
            block.gallery.map(item => {
              if (!item.title || !item.images || item.images?.length < 1) return null

              return (
                <li className="w-fit list-none shadow-lg bg-white p-2">
                  <div className="relative w-64 h-64">
                    <Link href={`/photo-gallery/${item.slug}`}> 
                      <Image
                        alt={item.title}
                        src={item.images[0]}
                        fill
                      />
                    </Link>
                  </div>
                  <footer className="flex justify-between items-center pt-3 pb-5">
                    <span className="text-sm">{item.title}</span>
                    <small className="text-xs">Images: {item.images.length}</small>
                  </footer>
                </li>
              )
            })
          }
        </ul>
      </Container>
    </Section>
  );
};

export const imageGalleryBlockSchema = {
  name: "imageGallery",
  label: "Image Gallery",
  ui: {
    itemProps: (item) => {
      return {
        label: `Image Gallery - ${item?.title}`,
      };
    },
  },
  fields: [
    {
      type: "object",
      label: "Image Gallery",
      name: "gallery",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.title,
          };
        },
        // defaultItem: {
        //   ...defaultFeature,
        // },
      },

      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "datetime",
          label: "Published",
          name: "publishedDate",
        },
        {
          type: "image",
          label: "Images",
          name: "images",
          list: true,
        },
        {
          type: "string",
          label: "Slug",
          name: "slug",
          description: "A URL slug (also known as website slug) for the specific image gallery.",
          required: false
        },

      ]
    },
  ],
};

