'use client'

import React from "react";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { TinaTemplate } from "tinacms";
import { useTina, tinaField } from "tinacms/dist/react";

function Iframe(props) {
  return <iframe {...props} />;
}

export const ContactInfo = ({ data, index }: { data: PageBlocksContactInfo }) => {
  console.log(data)
  const { data: { page: { blocks }} } = useTina(data)
  const block = blocks[index]

  return (
    <Section>
      <Container
        data-tina-field={tinaField(block, "body")}
        size="large"
        width="medium"
      >
        <TinaMarkdown content={block.body} />

        <Iframe src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3330.8416292593!2d115.76132380066257!3d-33.40129573627546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2a31e6d240184e9d%3A0xfdbaa06f95c1814a!2s${data.address}!5e0!3m2!1sen!2sca!4v1590597991231!5m2!1sen!2sca`} height="500" width="100%" css="border:0; box-shadow: 0 0 0px grey; margin-top 0rem;" allowFullScreen="" aria-hidden="false" tabindex="0" />

      </Container>
    </Section>
  );
};

export const contactInfoBlockSchema: TinaTemplate = {
  name: "contact",
  label: "Contact Info",
  fields: [
    {
      type: "rich-text",
      label: "Body",
      name: "body",
    },
    {
      type: "string",
      label: "Address",
      name: "address",
      description: "Provide the full address for Google Maps"
    }
  ],
};

