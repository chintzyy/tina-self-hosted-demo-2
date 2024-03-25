'use client'

import { tinaField, useTina } from "tinacms/dist/react";
// import type { Page, PageBlocks } from "../tina/__generated__/types";
import type { Page } from "@/tina/__generated__/types";

const Headline = (props: Omit<Page, "id" | "_sys" | "_values" | "children">) => {
  const { children, ...rest } = props
  const  { data } = useTina(rest);
  
  return (
    <div className="relative text-center  py-10 bg-gradient-to-b from-[rgba(255,255,255,0.7)] via-[rgba(255,255,255,0.3)] to-transparent">
      { data.page?.backgroundImage &&
        <div className="relative flex justify-center items-center">
          <div className="w-20 h-0.5 bg-purple-900 mr-4"></div>
          <h1
            className="
            font-normal
            font-josefin 
            inline-block
            relative
            text-black
            text-4xl
            uppercase
            data-tina-field={tinaField(data.page, 'title')}"
          >
            {data.page.title}
          </h1>
          <div className="w-20 h-0.5 bg-purple-900 ml-4"></div>
        </div>
      }
      { data.page?.tagline && (
        <h3
          className="text-black font-josefin text-2xl font-normal"
          data-tina-field={tinaField(data.page, 'tagline')}>{data.page.tagline}</h3> 
      )}
    </div>
  )

}
export default Headline
