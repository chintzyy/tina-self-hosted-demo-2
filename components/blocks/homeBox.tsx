import React from "react";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { ColorPickerInput } from "../../tina/fields/color";
import { IconPickerInput } from "../../tina/fields/icon";
import type { TinaTemplate } from "tinacms";
import { PageBlocksHomeBoxes, PageBlocksHomeBoxesHomeBox } from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Placeholder, Icon } from "../util";


function ContentBox(props: PageBlocksHomeBoxesHomeBox) {
  const { title, icon, body } = props
  return (
    <div className="w-1/4 odd:bg-blue-800/80 even:bg-sky-800/80 [&_a]:text-white">
      <div className="p-4 bg-black/40 flex align-middle items-center justify-center gap-4">
        <Icon data={{name: icon, color: 'white', size: 'xs'}} />
        <span className="text-base">{title}</span>
      </div> 
      <div className="p-4">
        <TinaMarkdown content={body} />
      </div> 
    </div>
  );
}

export const HomeBox = ({ data }: { data: PageBlocksHomeBoxes }) => {
  return (
    <div className="flex mt-auto">
      <style jsx global>{`html, body {height: 100%} body {display: flex; flex-direction: column} main { display: flex; flex-direction: column; margin-top: auto; padding: 0 !important} }`}</style>
      { data.homeBox
        ? data.homeBox.map(box => box?.title && <ContentBox key={box.title} {...box} />)
        : <Placeholder message="No homeboxes have been configured" />}
    </div>
  );
};

export const homeBoxBlockSchema: TinaTemplate = {
  name: "homeBoxes",
  label: "Home Boxes",
  // ui: {
  //   previewSrc: "/blocks/testimonial.png",
  //   defaultItem: {
  //     quote:
  //       "There are only two hard things in Computer Science: cache invalidation and naming things.",
  //     author: "Phil Karlton",
  //     color: "primary",
  //   },
  // },
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

