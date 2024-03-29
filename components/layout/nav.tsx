'use client'

import { useState, useEffect} from "react";
import Link from "next/link"
import Image from "next/image"
import { usePathname } from 'next/navigation'
import { useTina, tinaField } from "tinacms/dist/react";
import { Icon } from "../util/icon";

function Nav({ global }) {

  const pathname = usePathname()
  const  { data } = useTina(JSON.parse(global));
  const { header, theme } = data.global

  const activeItemClasses = {
    blue: "border-b-3 border-blue-200 text-blue-700 dark:text-blue-300 font-medium dark:border-blue-700",
    teal: "border-b-3 border-teal-200 text-teal-700 dark:text-teal-300 font-medium dark:border-teal-700",
    green:
    "border-b-3 border-green-200 text-green-700 dark:text-green-300 font-medium dark:border-green-700",
    red: "border-b-3 border-red-300 text-red-700 dark:text-green-300 font-medium dark:border-red-700",
    pink: "border-b-3 border-pink-200 text-pink-700 dark:text-pink-300 font-medium dark:border-pink-700",
    purple:
    "border-b-3 border-purple-200 text-purple-700 dark:text-purple-300 font-medium dark:border-purple-700",
    orange:
    "border-b-3 border-orange-200 text-orange-700 dark:text-orange-300 font-medium dark:border-orange-700",
    yellow:
    "border-b-3 border-yellow-300 text-yellow-700 dark:text-yellow-300 font-medium dark:border-yellow-600",
  };

  const activeBackgroundClasses = {
    blue: "text-blue-500",
    teal: "text-teal-500",
    green: "text-green-500",
    red: "text-red-500",
    pink: "text-pink-500",
    purple: "text-purple-500",
    orange: "text-orange-500",
    yellow: "text-yellow-500",
  };

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex items-center justify-between gap-6">
      <h4 className="select-none text-lg font-bold tracking-tight my-4 transition duration-150 ease-out transform">
        <Link
          href="/"
          className="flex gap-1 items-center whitespace-nowrap tracking-[.002em]"
        >
          <Image
            src={header.logo}
            data-tina-field={tinaField(header, 'logo')}
            width={60}
            height={62}
            alt={header.name}
          />
          {/* <span data-tina-field={tinaField(header, "name")}>{header.name}</span> */}
        </Link>
      </h4>

      <ul className="flex gap-1 tracking-[.002em] -mx-4 list-none m-0">
        {header?.nav && header.nav.map((item, i) => {

          const activeItem = (( item.href === "" || item.href === "/" ) ? pathname === "/" : (pathname.includes(item.href) )) && isClient ;
          // console.log('href: ', item.href, 'pathname: ', pathname, pathname==='/', isClient,  pathname.includes(item.href) )
          return (
            <li
              key={`${item.label}-${i}`}
              className={`${activeItem ? activeItemClasses[theme.color] : ""}`}
            >
              <Link
                data-tina-field={tinaField(item, "label")}
                href={`/${item.href}`}
                className={`z-20 relative select-none text-sm inline-block tracking-wide transition duration-150 ease-out hover:opacity-100 py-8 px-4 ${activeItem ? `` : `opacity-70`}`}
              >
                {item.label}
                {activeItem && (
                  <svg
                    className={`absolute bottom-0 left-1/2 w-[120%] h-full -translate-x-1/2 -z-10 opacity-10 dark:opacity-15 ${activeBackgroundClasses[theme.color]}`}
                    preserveAspectRatio="none"
                    viewBox="0 0 230 230"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="230"
                      y="230"
                      width="230"
                      height="230"
                      transform="rotate(-180 230 230)"
                      fill="url(#paint0_radial_1_33)"
                      className="relative z-0"
                    />
                    <defs>
                      <radialGradient
                        id="paint0_radial_1_33"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(345 230) rotate(90) scale(230 115)"
                      >
                        <stop stopColor="currentColor" />
                        <stop
                          offset="1"
                          stopColor="currentColor"
                          stopOpacity="0"
                        />
                      </radialGradient>
                    </defs>
                  </svg>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  )
}

export default Nav
