'use client'

import { useTina, tinaField } from "tinacms/dist/react";

const ContactBar = ({ global }) => {
  const data = useTina(JSON.parse(global));
  const { data: { global: { contact }}} = data

  return (
    <div className="bg-white p-2 text-black text-xs text-right">
      <ul className="flex justify-end list-none m-0 [&>li]:text-xs">
        <li data-tina-field={tinaField(contact,'phone')}>{contact.phone}</li>
        <li data-tina-field={tinaField(contact,'email')}>{contact.email}</li>
        <li data-tina-field={tinaField(contact,'address')}>{contact.address}</li>
      </ul>
    </div>
  )
}

export default ContactBar
