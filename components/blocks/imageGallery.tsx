'use client'

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "../util/container";
import { Section } from "../util/section";
import { HiddenField } from "tinacms";
import { useTina, tinaField , } from "tinacms/dist/react";

export const ImageGallery = ({ data, index }: { data: PageBlocksImageGallery }) => {
  const { data: { page: { blocks }} } = useTina(data)
  if (index === undefined || index === null || blocks.length < 1) return null
  
  const block = blocks[index]
  if (!block) return null

  return (
    <Section>
      <Container
        size="large"
        width="medium"
      >
        <ul className="list-none flex flex-wrap">
          {
            block.gallery?.map(item => {
              const prevImage = item.images && item.images.length ? item.images[0].src : null
              if (!item.title || !item.images || item.images?.length < 1 || !prevImage) return null
              // console.log('item: ', item)

              return (
                <li key={item.title} className="w-fit max-w-80 list-none shadow-lg bg-white p-2">
                  <div className="relative w-64 h-64">
                    <Link href={`/photo-gallery/${item.slug}`}> 
                      <Image
                        alt={item.title}
                        src={prevImage}
                        fill
                      />
                    </Link>
                  </div>
                  <footer className="flex justify-center items-center pt-3 pb-5">
                    <span className="text-sm">{item.title}</span>
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
        label: 'Image Gallery',
      };
    },
  },
  fields: [
    {
      type: "object",
      label: "Image Galleries",
      name: "gallery",
      list: true,
      ui: {
        itemProps: (item) => {
          console.log('ui itemProps: ', item)
          return {
            label: item?.title,
          };
        },
      },
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
          HiddenField,
        },
        {
          type: "datetime",
          label: "Published",
          name: "publishedDate",
        },
        {
          type: "string",
          label: "Slug",
          name: "slug",
          description: "A URL slug (also known as website slug) for the specific image gallery.",
          required: false
        },
        {
          type: "object",
          label: "Images",
          name: "images",
          list: true,
          defaultItem: () => ({ meta: { height: null, width: null }}),
          fields: [
            {
              type: "image",
              label: "Image",
              name: "src",
            },
            {
              label: "Meta",
              name: "meta",
              type: "object",
              fields: [
                {
                  label: "thumb",
                  name: "thumb",
                  type: "object",
                  fields: [
                    {
                      label: "src",
                      name: "src",
                      type: "string",
                    },
                    {
                      label: "width",
                      name: "width",
                      type: "number",
                    },
                    {
                      label: "height",
                      name: "height",
                      type: "number",
                    },
                    {
                      label: "id",
                      name: "id",
                      type: "string"
                    },
                  ]
                },
                {
                  label: "large",
                  name: "large",
                  type: "object",
                  fields: [
                    {
                      label: "src",
                      name: "src",
                      type: "string",
                    },
                    {
                      label: "width",
                      name: "width",
                      type: "number",
                    },
                    {
                      label: "height",
                      name: "height",
                      type: "number",
                    },
                    {
                      label: "id",
                      name: "id",
                      type: "string"
                    },
                  ]
                },
              ],
              ui:{
                component: 'hidden',
              }
            },
          ]
        },
      ]
    },
  ],
};

