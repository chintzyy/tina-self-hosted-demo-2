import { Collection } from "tinacms";

import { contentBlockSchema } from "../../components/blocks/content";
import { infoTabsBlockSchema } from "../../components/blocks/infoTabs";
import { featureBlockSchema } from "../../components/blocks/features";
import { heroBlockSchema } from "../../components/blocks/hero";
import { testimonialBlockSchema } from "../../components/blocks/testimonial";
import { NewsletterListBlockSchema } from "../../components/blocks/newsletterList";
import { formTabsBlockSchema } from "../../components/blocks/formTabs";
import { contactInfoBlockSchema } from "../../components/blocks/contactInfo";
import { homeBoxBlockSchema } from "../../components/blocks/homeBox";

export const PageCollection: Collection = {
  label: "Pages",
  name: "page",
  path: "content/pages",
  ui: {
    router: ({ document }) => {
      /* Show the visual editor for every page collection */      
      return document._sys.filename;
    },
    filename: {
      readonly: true,
      slugify: (values) => {
        // Values is an object containing all the values of the form. In this case it is {title?: string, topic?: string}
        return values.slug || `${values?.title ? values?.title.toLowerCase().replace(/ /g, '-') : 'no-topic'}`
      }, 
    },
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
      description: "Defines the text displayed on the browser's title bar or tab, summarizing the page's content for users and aiding search engines in understanding its relevance",
      isTitle: true,
      required: true,
    },
    { 
      type: "string",
      label: "Slug",
      name: "slug",
      description: "A URL slug (also known as website slug) is the last part of the URL address that serves as a unique identifier of the page.",
      required: false,
    },
    {
      type: "string",
      label: "Tagline",
      name: "tagline",
      description: "A sub header displayed under the main title",
      required: false,
    },
    {
      type: "string",
      label: "Description",
      name: "description",
      description: "The meta description used for SEO. Add the a description of what this page is about",
      required: true,
    },
    {
      type: "image",
      label: "Background Image",
      name: "backgroundImage",
      description: "Display an image as the background of this page",
    },
    {
      type: "object",
      list: true,
      name: "blocks",
      label: "Sections",
      ui: {
        visualSelector: true,
      },
      templates: [
        heroBlockSchema,
        // @ts-ignore
        featureBlockSchema,
        contentBlockSchema,
        testimonialBlockSchema,
        infoTabsBlockSchema,
        NewsletterListBlockSchema,
        formTabsBlockSchema,
        contactInfoBlockSchema,
        homeBoxBlockSchema,
      ],
    },
  ],
}
