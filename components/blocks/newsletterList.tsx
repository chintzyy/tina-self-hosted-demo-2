'use client'

import React from "react";
import Link from "next/link";
import { DateTime } from "luxon";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { PageBlocksNewsletterList } from "../../tina/__generated__/types";
import { useTina, tinaField } from "tinacms/dist/react";

function NewsletterLinks({ index, data }) {
  const { data: { page: { blocks }} } = useTina(data)
  const block = blocks[index]

  if (!block || !Array.isArray(block.newsletterItems)) {
    return (
      <p>No newsletters currently available</p>
    )
  }

  return (
    <> 
      <h4 className="text-right">Published</h4>
      <ul>
        { block.newsletterItems.map((item, i) => {
          if (item.status && item.status.toLowerCase() !== 'published') { return null }
          return (
            <li
              key={item.publishedDate?.trim()}
              className="border-t-slate-400 border-t relative list-none first:border-t-0 [&:last-child>a]:pb-0 transition-all ease-in-out duration-150 hover:scale-[1.01]  [&:hover>a]:text-purple-900"

              data-tina-field={tinaField(block, "swayLink")}
            >
              <Link
                href={item.swayLink}
                target="_blank"
                className="flex justify-between py-6 text-slate-900 no-underline"
                data-tina-field={tinaField(item, "swayLink")}
              >
                <h4

                >Maypole Newsletter - {DateTime.fromISO(item.publishedDate).toFormat('LLL yyyy')}</h4>
                <div
                  data-tina-field={tinaField(item, "publishedDate")}
                >
                  {DateTime.fromISO(item.publishedDate).toLocaleString(DateTime.DATE_FULL)}
                </div>
              </Link>
            </li>
          )
        })
        }
      </ul>
    </>
  );
}


export const NewsletterList = ({ data, index }: { data: PageBlocksNewsletterList }) => {

  return (
    <Section>
      <Container size="large">
        {/* data */}
        <NewsletterLinks 
          data={data}
          index={index}
        /> 
      </Container>
    </Section>
  );
};

export const newsletterListBlockSchema: TinaTemplate = {
  name: "newsletterList",
  label: "Newsletter List",
  fields: [
    {
      type: "object",
      label: "Newsletter Items",
      name: "newsletterItems",
      ui: {
        itemProps: (item) => {
          return {
            label: `Maypole-${DateTime.fromISO(item?.publishedDate).toISODate()}`,
          };
        },
      },
      list: true,
      fields: [
        {
          type: "datetime",
          label: "Published Date",
          name: "publishedDate",
        },
        {
          type: "string",
          label: "Sway Link",
          name: "swayLink",
        },
        {
          type: "string",
          label: "Status",
          name: "status",
          options: [
            { label: "Published", value: "published" },
            { label: "Draft", value: "draft" },
            { label: "Archive", value: "archive" },
          ],
        },
      ],
    },

  ],
};

