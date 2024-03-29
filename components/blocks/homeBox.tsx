'use client'

import React from "react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { useTina, tinaField } from "tinacms/dist/react";
import { ColorPickerInput } from "../../tina/fields/color";
import { IconPickerInput } from "../../tina/fields/icon";
import type { TinaTemplate } from "tinacms";
import { PageBlocksHomeBoxes, PageBlocksHomeBoxesHomeBox } from "../../tina/__generated__/types";
import { Placeholder, Icon } from "../util";


function ContentBox(props: PageBlocksHomeBoxesHomeBox) {
  const { title, icon, body, item } = props
  return (
    <div className="w-1/4 odd:bg-blue-800/80 even:bg-sky-800/80 [&_a]:text-white">
      <div className="p-4 bg-black/40 flex align-middle items-center justify-center gap-4">
        <Icon
          data-tina-field={tinaField(item,'icon')}
          data={{name: icon, color: 'white', size: 'xs'}} />
        <span
          data-tina-field={tinaField(item,'title')}
          className="text-base">{title}</span>
      </div> 
      <div
        data-tina-field={tinaField(item,'body')}
        className="p-4"
      >
        <TinaMarkdown content={body} />
      </div> 
    </div>
  );
}

export const HomeBox = ({ data, index }: { data: PageBlocksHomeBoxes }) => {
  const { data: { page: { blocks }} } = useTina(data)
  const block = blocks[index]

  return (
    <div className="flex mt-auto">
      <style jsx global>{`html, body {height: 100%} body {display: flex; flex-direction: column} main { display: flex; flex-direction: column; margin-top: auto; padding: 0 !important} }`}</style>
      { block.homeBox
        ? block.homeBox.map(box => box?.title && <ContentBox item={box} key={box.title} {...box} />)
        : <Placeholder message="No homeboxes have been configured" />}
    </div>
  );
};

export const homeBoxBlockSchema: TinaTemplate = {
  name: "homeBoxes",
  label: "Home Boxes",
  fields: [
    {
      type: "object",
      label: "Create home box",
      name: "homeBox",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item.title ? item.title : 'Create new home box',
          };
        },
      },
      fields: [
        {
          type: "string",
          label: "Icon",
          name: "icon",
          ui: {
            component: IconPickerInput,
          },
        },
        {
          type: "string",
          label: "Color",
          name: "color",
          ui: {
            component: ColorPickerInput,
          },
        },
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "rich-text",
          label: "Body",
          name: "body",
        }
      ]
    }
  ],
};

