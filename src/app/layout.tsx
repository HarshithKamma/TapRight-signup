import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "TapRight — Smart Credit Card Companion",
  description:
    "Join TapRight to discover the smartest credit card mix for your lifestyle, powered by insights and real-time rewards tracking.",
  icons: {
    icon: [
      { url: "/tapright-favicon.png", sizes: "16x16", type: "image/png" },
      { url: "/tapright-favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/tapright-favicon.png", sizes: "192x192", type: "image/png" },
      { url: "/tapright-favicon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/tapright-favicon.png",
    shortcut: "/tapright-favicon.png",
  },
  openGraph: {
    title: "TapRight — Smart Credit Card Companion",
    description:
      "Secure your early access to TapRight and never miss rewards, cashback, or travel perks again.",
    url: "https://tapright.app",
    siteName: "TapRight",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 1200,
        alt: "TapRight Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TapRight — Smart Credit Card Companion",
    description:
      "TapRight analyses your spending to recommend the ideal cards and optimise your rewards.",
    images: ["/twitter-image.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 5.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
