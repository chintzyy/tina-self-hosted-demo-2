import React from "react";
import Link from "next/link";
import { DateTime } from "luxon";
import { Container } from "../util/container";
import { Section } from "../util/section";
import type { TinaTemplate } from "tinacms";
import { PageBlocksNewsletterList } from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";

function getFullMonthName(dateString) {
  const date = new Date(dateString);
  const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(date);
  return month;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function NewsletterLinks({ newsletterItems, data }) {
  if (!newsletterItems || !Array.isArray(newsletterItems)) {
    return (
      <p>No newsletters currently available</p>
    )
  }

  return (
    <> 
      <h4 className="text-right">Published</h4>
      <ul>
        { newsletterItems.map(item => {
          return (
            <li
              key={item.publishedDate?.trim()}
              className="border-t-slate-400 border-t relative list-none first:border-t-0 [&:last-child>a]:pb-0 transition-all ease-in-out duration-150 hover:scale-[1.01]  [&:hover>a]:text-purple-900"
            >
              <Link
                href={item.swayLink}
                target="_blank"
                className="flex justify-between py-6 text-slate-900 no-underline"
                tinaField={tinaField(item, "swayLink")}
              >
                <h4>Maypole Newsletter - {DateTime.fromISO(item.publishedDate).toFormat('LLL yyyy')}</h4>
                <div
                  tinaField={tinaField(item, "publishedDate")}
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


export const NewsletterList = ({ data }: { data: PageBlocksNewsletterList }) => {
  return (
    <Section>
      <Container size="large">
        {/* data */}
        <NewsletterLinks 
          newsletterItems={data.newsletterItems}
          data={data}
        /> 
      </Container>
    </Section>
  );
};

export const NewsletterListBlockSchema: TinaTemplate = {
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
            label: `Maypole-${formatDate(item?.publishedDate)}`,
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

