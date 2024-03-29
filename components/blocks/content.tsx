'use client'

import React from "react";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { TinaTemplate } from "tinacms";
import { PageBlocksContent } from "../../tina/__generated__/types";
import { useTina, tinaField } from "tinacms/dist/react";

export const Content = ({ data, index }: { data: PageBlocksContent, index: number }) => {
  const { data: { page: { blocks }} } = useTina(data)
  const block = blocks[index]
  
  if (!block) return null
  
  return (
    <Section color={block.color}>
      <Container
        className={`prose prose-lg ${
          block.color === "primary" ? `prose-primary` : `dark:prose-dark`
        }`}
        data-tina-field={tinaField(block,'body')}
        size="large"
        width="medium"
      >
        <TinaMarkdown content={block.body} />
      </Container>
    </Section>
  );
};

export const contentBlockSchema: TinaTemplate = {
  name: "content",
  label: "Content",
  ui: {
    previewSrc: "/blocks/content.png",
    defaultItem: {
      body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
    },
  },
  fields: [
    {
      type: "rich-text",
      label: "Body",
      name: "body",
    },
    {
      type: "string",
      label: "Color",
      name: "color",
      options: [
        { label: "Default", value: "default" },
        { label: "Tint", value: "tint" },
        { label: "Primary", value: "primary" },
      ],
    },
  ],
};
