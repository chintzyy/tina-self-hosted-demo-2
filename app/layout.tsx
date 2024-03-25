import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";
import { josefin, poppins } from "~/components/util/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins} ${josefin}`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
