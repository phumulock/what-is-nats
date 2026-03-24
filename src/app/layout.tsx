import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "What is NATS?",
  description: "An interactive guide to understanding NATS - the simple, high-performance messaging system",
  openGraph: {
    title: "What is NATS?",
    description: "An interactive guide to understanding NATS",
    type: "website",
    images: [
      {
        url: "/images/whatisnats-og.png",
        width: 1320,
        height: 660,
        alt: "What is NATS? - An interactive guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "What is NATS?",
    description: "An interactive guide to understanding NATS - the simple, high-performance messaging system",
    images: ["/images/whatisnats-og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
