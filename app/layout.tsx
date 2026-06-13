import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://xml-update-gallery.vercel.app";

const title = "XML UPDATE";
const description =
  "XML UPDATE Gallery — แกลเลอรี showcase สินค้าและคอนเทนต์ดิจิทัล";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "th_TH",
    siteName: title,
    images: [
      {
        url: "/placeholders/item-1.svg",
        width: 1200,
        height: 630,
        alt: "XML UPDATE Gallery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/placeholders/item-1.svg"],
  },
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
