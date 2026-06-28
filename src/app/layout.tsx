import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
  title: "Free Resume Builder | ATS Friendly Resume Builder - Cvolt",
  description: "Build an ATS friendly resume online for free. Download professional resume templates and bypass applicant tracking filters to land your next interview.",
  keywords: [
    "free resume builder",
    "ATS friendly resume builder",
    "build CV online free",
    "resume template download",
    "Cvolt resume builder",
    "resume maker",
    "ATS CV template"
  ],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Cvolt Resume Builder",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT && (
          <Script
            id="adsense-loader"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        <Script
          id="clear-sw"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
                navigator.serviceWorker.getRegistrations().then(function(registrations) {
                  var unregistered = false;
                  for (var i = 0; i < registrations.length; i++) {
                    registrations[i].unregister();
                    unregistered = true;
                  }
                  if (unregistered) {
                    console.log('Cleared local service worker to prevent reload loop.');
                    window.location.reload();
                  }
                });
              }
            `
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
