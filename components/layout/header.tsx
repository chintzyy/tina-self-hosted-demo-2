import { Container } from "../util/container";
import Nav from "./nav";
import { Global, GlobalHeader, GlobalContact } from "../../tina/__generated__/types";
import { client } from "../../tina/__generated__/databaseClient";

const ContactBar = ({ contact }) => (
  <div className="bg-white p-2 text-black text-xs text-right">
    <ul className="flex justify-end list-none m-0 [&>li]:text-xs">
      <li className="">{contact.phone}</li>
      <li>{contact.email}</li>
      <li>{contact.address}</li>
    </ul>
  </div>
)

export const  Header = async () => {
  const res = await client.queries.global({ relativePath: 'index.json' })

  const { global: { header, theme, contact } }: { global: Global, header: GlobalHeader, contact: GlobalContact } = JSON.parse(JSON.stringify(res.data))

  const headerColor = {
    default: "text-black dark:text-white from-gray-50 to-white dark:from-gray-800/90 dark:to-black/95",
    primary: {
      blue: "text-white from-blue-300 to-blue-500",
      teal: "text-white from-teal-400 to-teal-500",
      green: "text-white from-green-400 to-green-500",
      red: "text-white from-red-400 to-red-500",
      pink: "text-white from-pink-400 to-pink-500",
      purple: "text-white from-purple-400 to-purple-500",
      orange: "text-white from-orange-400 to-orange-500",
      yellow: "text-white from-yellow-400 to-yellow-500",
    },
  };

  const headerColorCss =
    header.color === "primary"
      ? headerColor.primary[theme.color]
      : headerColor.default;


  const bodyColor = header.color === "primary" ? `via-white` : `via-black dark:via-white`

  return (
    <>
      <ContactBar contact={contact} />
      <div
        className={`relative overflow-hidden font-light bg-gradient-to-b ${headerColorCss}`}
      >
        <Container size="custom" className="py-0 relative z-10 max-w-8xl">
          <Nav global={ JSON.stringify(res) } />
          <div
            className={`absolute h-1 bg-gradient-to-r from-transparent ${bodyColor} to-transparent bottom-0 left-4 right-4 -z-1 opacity-5`}
          />
        </Container>
      </div>
    </>
  );
};

