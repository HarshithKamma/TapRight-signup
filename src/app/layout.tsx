import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TapRight — Smart Credit Card Companion",
  description:
    "Join TapRight to discover the smartest credit card mix for your lifestyle, powered by AI-driven insights and real-time rewards tracking.",
  openGraph: {
    title: "TapRight — Smart Credit Card Companion",
    description:
      "Secure your early access to TapRight and never miss rewards, cashback, or travel perks again.",
    url: "https://tapright.ai",
    siteName: "TapRight",
  },
  twitter: {
    card: "summary_large_image",
    title: "TapRight — Smart Credit Card Companion",
    description:
      "TapRight analyses your spending to recommend the ideal cards and optimise your rewards.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
