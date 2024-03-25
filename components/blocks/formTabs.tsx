import React, { useState } from "react";
import Link from "next/link";
import { DateTime } from "luxon"
import { Container } from "../util/container";
import { Section } from "../util/section";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { TinaTemplate } from "tinacms";
import { PageBlocksFormTabs, PageBlocksFormTabsItems } from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { Placeholder, uniqueValues, camelCaseToCapitalizedWithSpaces } from "../util";

export const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  const flattenTabName = ( name: string ) => name && name.toLowerCase().replace(/\s/g, '')
  const isTabActive = ( tab: string ) => activeTab.toLowerCase().replace(/\s/g, '') === flattenTabName(tab)

  if (!tabs) {
    return  <Placeholder message="No tabs have been created yet." />
  }

  return (
    <ul>
      {tabs.map(( tab: string ) => {
        const flattenedTab = flattenTabName(tab)
        const isActive = isTabActive(flattenedTab)
        const activeTabStyling = isActive ? "border-purple-800 border-2" : ""

        return (
          <li
            key={flattenedTab}
            onClick={() => setActiveTab(flattenedTab)}
            className={`px-3 py-2 inline-block text-black text-2xs bg-white border rounded-t-lg rounded-b-lg mx-1 cursor-pointer ${activeTabStyling}`}
            data-tina-field={tinaField(tab, "category")}
          >{tab}
          </li>
        )
      })}
    </ul>
  )
}

const InfoLink = ({ title, document, item, isShown }) => (
  isShown
    ? (
      <li 
        className="border-t-slate-300 border-t relative list-none first:border-t-0 [&:last-child>a]:pb-0 transition-all ease-in-out duration-150 hover:scale-[1.01]  [&:hover>a]:text-purple-900"
        style={{ display: isShown ? 'block' : 'none' }}>
        <Link
          key={title}
          href={document}
          data-tina-field={tinaField(item, "document")}
          className="flex justify-between py-4"
        >
          <span>{title}</span>
          <span className="text-right text-slate-400">{DateTime.fromISO(item.publishedDate).toLocaleString(DateTime.DATE_FULL)}</span>
        </Link>
      </li>
    )
    : null
)

export const InfoSection = ({ activeTab, items }) => {
  if (!items.length) return <Placeholder message="Form item requires configuration" />

  return (
    <>
      <h3>{camelCaseToCapitalizedWithSpaces(activeTab)}</h3>
      <ul>
        {items.map((item: PageBlocksFormTabsItems) => {
          const isShown = (activeTab && activeTab.toLowerCase().replace(/\s/g, '') === item.category.toLowerCase().replace(/\s/g, '') || activeTab === '')
          return (
            <InfoLink 
              key={item.title}
              title={item.title}
              document={item.document}
              item={item}
              isShown={isShown}
            />
          )
        })}
      </ul>
    </>
  )
}

export const FormTabs = ({ data }: { data: PageBlocksFormTabs }) => {
  const [activeTab, setActiveTab] = useState('');

  if (!data.items) return <Placeholder message="Form tabs component requires data" />
  const tabs = uniqueValues(data.items.map(item => item?.category))

  return (
    <Section>
      <Container
        size="large"
        width="medium"
      >
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <InfoSection
          items={data.items}
          activeTab={activeTab}
        />
      </Container>
    </Section>
  );
};

export const formTabsBlockSchema: TinaTemplate = {
  name: "formTabs",
  label: "Form Items",
  // ui: {
  //   previewSrc: "/blocks/content.png",
  //   defaultItem: {
  //     body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
  //   },
  // },
  fields: [
    {
      type: "object",
      label: "Info Items",
      name: "items",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: `${item?.title} (${item.category})`,
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
          label: "Document",
          name: "document",
          required: true,
        },
        {
          type: "string",
          label: "Category",
          name: "category",
          required: true,
          options: [
            { label: "General", value: "General" },
            { label: "Book List", value: "Book List" },
          ]
        }
      ],
    },

  ],
};

