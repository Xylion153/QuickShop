import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/data/site";

// Archivo (variable weight), self-hosted. License: src/fonts/ARCHIVO-LICENSE.txt
const body = localFont({ src: "../fonts/archivo-latin-wght-normal.woff2", variable: "--font-body", weight: "100 900", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.tagline}`, template: `%s | ${site.name}` },
  description: `${site.tagline}. Fragrance and home appliances, shipped from ${site.shipsFrom}.`,
  applicationName: site.name,
  formatDetection: { telephone: false },
  openGraph: { type: "website", siteName: site.name, title: site.name, description: site.tagline },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f6f3ec",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={body.variable}>
      <body className="flex min-h-screen flex-col overflow-x-hidden">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:rounded-lg focus:bg-card focus:px-4 focus:py-2">Skip to content</a>
        <Header ebayStoreUrl={site.ebayStoreUrl} />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
