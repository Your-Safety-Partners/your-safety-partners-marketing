import type { Metadata } from "next";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";
import { Toaster } from "sonner";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/global/header";
import { Footer } from "@/components/global/footer";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import { SITE_URL } from "@/lib/seo-metadata";
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
  metadataBase: new URL(SITE_URL),
  title: "Your Safety Portal",
  description:
    "Manage policies, training, forms, inspections, hazards & contractors in one platform. Built by safety professionals. WHS-aligned. 100+ Australian businesses.",
  verification: {
    google: "H7qjLJ7jmSCyH1HSFPS1Ow30nIAS8xvX8b2Nto2U8SY",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-MXSLXDFH" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MXSLXDFH"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Header />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
        <Toaster />
        <PrismicPreview repositoryName={repositoryName} />

        {/* Google Analytics Setup */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer ||[];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </body>
    </html>
  );
}
