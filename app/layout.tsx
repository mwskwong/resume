import { Metadata } from "next";
import { Inter, Source_Code_Pro } from "next/font/google";
import { FC, PropsWithChildren } from "react";

import Header from "@/components/shared/header";

import Analytics from "./analytics";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code-pro",
});

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="en" className={`${inter.variable} ${sourceCodePro.variable}`}>
    <body>
      <Providers>
        <Header />
        {children}
      </Providers>
      <Analytics />
    </body>
  </html>
);

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default RootLayout;
