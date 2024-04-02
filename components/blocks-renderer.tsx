import type { Page, PageBlocks } from "../tina/__generated__/types";
import { Content } from "./blocks/content";
import { Features } from "./blocks/features";
import { Hero } from "./blocks/hero";
import { Testimonial } from "./blocks/testimonial";
import { InfoTabs } from "./blocks/infoTabs";
import { FormTabs } from "./blocks/formTabs";
import { ContactInfo } from "./blocks/contactInfo";
import { NewsletterList } from "./blocks/newsletterList";
import { HomeBox } from "./blocks/homeBox";
import { ImageGallery } from "./blocks/imageGallery";
import Placeholder from "./util/Placeholder";

const components = {
  PageBlocksContent: Content,
  PageBlocksFeatures: Features,
  PageBlocksHero: Hero,
  PageBlocksTestimonial: Testimonial,
  PageBlocksInfoTabs: InfoTabs,
  PageBlocksNewsletterList: NewsletterList,
  PageBlocksFormTabs: FormTabs,
  PageBlocksContact: ContactInfo,
  PageBlocksHomeBoxes: HomeBox,
  PageBlocksImageGallery: ImageGallery,
}

export const Blocks = (props: Omit<Page, "id" | "_sys" | "_values">) => {
  const { data } = props

  return (
    <>
      {data?.page?.blocks
        ? data.page.blocks.map(function (block, i) {
          const Component = components[block.__typename] as PageBlocks
          
          return (typeof Component !== 'undefined')
            ? (
              <div 
                key={i.toString() + block.__typename}
              >
                <Component index={i} data={props} /> 
              </div>
            )
            : (
              <Placeholder
                key={i.toString() + block.__typename}
                message={<span>The component <strong>{block.__typename}</strong> has not yet been created or setup correctly.</span>}
              />
            )
        })
        : (
          <Placeholder message="No components have been added to this page." />
        )
      }
    </>
  );
}
