import { Collection } from "tinacms";
import { TinaCMS, Form,  } from "tinacms";

import { contentBlockSchema } from "../../components/blocks/content";
import { infoTabsBlockSchema } from "../../components/blocks/infoTabs";
import { featureBlockSchema } from "../../components/blocks/features";
import { heroBlockSchema } from "../../components/blocks/hero";
import { testimonialBlockSchema } from "../../components/blocks/testimonial";
import { newsletterListBlockSchema } from "../../components/blocks/newsletterList";
import { formTabsBlockSchema } from "../../components/blocks/formTabs";
import { contactInfoBlockSchema } from "../../components/blocks/contactInfo";
import { homeBoxBlockSchema } from "../../components/blocks/homeBox";
import { imageGalleryBlockSchema } from "../../components/blocks/imageGallery";

export const PageCollection: Collection = {
  label: "Pages",
  name: "page",
  path: "content/pages",
  ui: {
    beforeSubmit: async ({
      form,
      cms,
      values,
    }: {
        form: Form
        cms: TinaCMS
        values: Record<string, any>
      }) => {
      // console.log('beforeSubmit...: ', {form, cms, values})
      if (values?.blocks.some(b => b._template === "imageGallery")) {
        const updatedValues = { ...values };
        await Promise.all(updatedValues.blocks.map(async element => {
          if (element._template === 'imageGallery') {
            await Promise.all(element.gallery.map(async elem => {
              if (!elem.images) return Promise.resolve()
              await Promise.all(elem.images.map(async el => {
                if (el.meta.width === null || el.meta.height === null) {
                  const getImageDimensions = await fetch(`http://localhost:3000/api/imageMetadata?url=${el.src}`);
                  const metaData = await getImageDimensions.json();
                  el.meta = {
                    ...metaData,
                  };
                }
              }));
            }));
          }
        }));
      }
      if (form.crudType === 'create') {
        return {
          ...values,
          createdAt: new Date().toISOString(),
        }
      }
      return {
        ...values,
        lastUpdated: new Date().toISOString(),
      }
    },
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
      type: "string",
      label: 'Created At',
      name: "createdAt",
      ui:{
        component: 'hidden',
      }
    },
    {
      type: "string",
      label: 'Updated At',
      name: "lastUpdated",
      ui:{
        component: 'hidden',
      }
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
        newsletterListBlockSchema,
        formTabsBlockSchema,
        contactInfoBlockSchema,
        homeBoxBlockSchema,
        imageGalleryBlockSchema,
      ],
    },
  ],
}
