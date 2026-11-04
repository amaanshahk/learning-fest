
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { designConfig } from "../lib/design-seed";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amaan Shah K | Developer Portfolio",
  description:
    "Technology enthusiast exploring different fields, learning continuously, and building things.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      style={
        {
          "--seed-accent-light": designConfig.accentLight,
          "--seed-accent-dark": designConfig.accentDark,
        } as CSSProperties
      }
    >
      <body>
        <div className="min-h-screen w-full px-5 sm:px-8 lg:px-12 xl:px-16">
          {children}
        </div>
      </body>
    </html>
  );
}
