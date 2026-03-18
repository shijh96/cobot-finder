import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CobotFinder — Find the Right Cobot for Your Factory",
    template: "%s | CobotFinder",
  },
  description:
    "Compare collaborative robots across top brands, calculate ROI, and get quotes from authorized distributors. Independent cobot buying guides for welding, palletizing, assembly, and more.",
  keywords: [
    "cobot",
    "collaborative robot",
    "cobot comparison",
    "cobot ROI",
    "industrial robot",
    "Universal Robots",
    "Fanuc",
    "ABB",
    "KUKA",
  ],
  metadataBase: new URL("https://cobotfinder.com"),
  openGraph: {
    type: "website",
    siteName: "CobotFinder",
    title: "CobotFinder — Find the Right Cobot for Your Factory",
    description:
      "Compare collaborative robots, calculate ROI, and get quotes from authorized distributors.",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} font-sans antialiased bg-white text-gray-900`}>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
