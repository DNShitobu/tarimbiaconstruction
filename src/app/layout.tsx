import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Tarimbia Construction Company Limited | Building & Civil Engineering Ghana",
  description: "Tarimbia Construction Company Limited is a leading Ghanaian construction company offering building construction, road construction, civil engineering, and more.",
  keywords: "construction, building, civil engineering, Ghana, contractor, road construction",
  metadataBase: new URL("https://www.tarimbiaconstruction.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GH",
    url: "https://www.tarimbiaconstruction.com",
    siteName: "Tarimbia Construction",
    title: "Tarimbia Construction Company Limited",
    description: "Leading Ghanaian construction company offering building, road construction, and civil engineering services.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tarimbia Construction Company Limited",
    description: "Leading Ghanaian construction company offering building, road construction, and civil engineering services.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#1e3a5f" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
