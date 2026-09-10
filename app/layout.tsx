import clsx from "clsx";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import UserProvider from "@/components/user-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://app.apex.dashboard.io"),
  title: "Apex",
  description: "Apex.io is worlds best and reliable Web3  Organization",
  keywords: ["Apex", "Apex.io", "login", "sign up", "join us"],
  authors: [{ name: "Apex.io" }],
  openGraph: {
    title: "Apex.io",
    siteName: "app.Apex.io",
    url: "https://app.Apex.io",
    description: "Apex.io is worlds best and reliable Web3  Organization",
    images: [
      {
        url: "/images/logo.png",
        width: "420",
        height: "420",
      },
    ],
  },
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicons/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicons/favicon-16x16.png",
    },
    {
      rel: "apple-touch-icon",
      type: "image/png",
      sizes: "180x180",
      url: "/favicons/apple-touch-icon.png",
    },
    {
      rel: "shortcut icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicons/favicon.ico",
    },
  ],
  robots: {
    follow: true,
  },
  twitter: {
    title: "Apex.io",
    description: "Apex.io is worlds best and reliable Web3  Organization",
    images: [
      {
        url: "/images/logo.png",
        width: "420",
        height: "420",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body
        suppressHydrationWarning={true}
        className={clsx(inter.variable, "font-inter")}
      >
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
          }}
        />
        <UserProvider />
        {children}
      </body>
    </html>
  );
}
