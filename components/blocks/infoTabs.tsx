'use client'

import React, { useState } from "react";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { TinaTemplate } from "tinacms";
import { PageBlocksInfoTabs } from "../../tina/__generated__/types";
import { useTina, tinaField } from "tinacms/dist/react";
import Placeholder from "../util/Placeholder";

export const Tabs = ({ items, activeTab, setActiveTab }) => {
  const flattenTabName = name => name && name.toLowerCase().replace(/\s/g, '')
  const isTabActive = tab => activeTab.toLowerCase().replace(/\s/g, '') === flattenTabName(tab)

  if (!items) {
    return  <Placeholder message="No tabs have been created yet." />
  }

  return (
    <ul className="list-none ml-0">
      {items.map(tab => {
        const flattenedTab = flattenTabName(tab.title)
        const isActive = isTabActive(flattenedTab)
        const activeTabStyling = isActive ? "border-purple-800 border-2" : ""

        return (
          <li
            key={flattenedTab}
            isActive={isActive}
            onClick={() => setActiveTab(flattenedTab)}
            className={`px-3 py-2 inline-block text-black text-2xs bg-white border rounded-t-lg rounded-b-lg mx-1 mb-2 cursor-pointer ${activeTabStyling}`}
            data-tina-field={tinaField(tab, "title")}
          >{tab.title}
          </li>
        )
      })}
    </ul>
  )
}

export const InfoSection = ({ activeTab, block }) => {
  return (
    block.items.map(item => {
      const isShown = (activeTab && activeTab.toLowerCase().replace(/\s/g, '') === item.title.toLowerCase().replace(/\s/g, '') || activeTab === '')
      return (
        isShown
          ? (
            <section
              data-tina-field={tinaField(item,'body')}
              css={{ display: isShown ? 'block' : 'none', marginBottom: 'inherit', position: 'relative' }}
            >
              <TinaMarkdown key={item.title} content={item.body} data-tina-field={tinaField(item, "body")} />
            </section>
          )
          : null

      )
    })
  )
}

export const InfoTabs = ({ data, index }: { data: PageBlocksInfoTabs }) => {
  const [activeTab, setActiveTab] = useState('');
  const { data: { page: { blocks }} } = useTina(data)
  const block = blocks[index]
  
  return (
    <Section>
      <Container
        size="large"
        width="medium"
      >
        <Tabs
          items={block.items}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <InfoSection
          block={block}
          activeTab={activeTab}
        />
      </Container>
    </Section>
  );
};

export const infoTabsBlockSchema: TinaTemplate = {
  name: "infoTabs",
  label: "Info Tabs",
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
            label: item?.title,
          };
        },
        // defaultItem: {
        //   ...defaultFeature,
        // },
      },
      fields: [
        {
          type: "rich-text",
          label: "Body",
          name: "body",
        },
        {
          type: "string",
          label: "Title",
          name: "title",
        },
      ],
    },

  ],
};
