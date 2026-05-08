import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yourdomain.com';
const gaId = process.env.NEXT_PUBLIC_GA_ID ?? '';
const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ?? '';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Free Online Calculators | Calculator Pro',
    template: '%s | Calculator Pro',
  },
  description:
    'Fast, accurate free online calculators for finance, health, fitness, math, and more. Mortgage, BMI, loan, and 15+ calculators.',
  keywords:
    'calculator, mortgage calculator, loan calculator, BMI calculator, finance calculator, free online calculator',
  authors: [{ name: 'Calculator Pro' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Calculator Pro',
    title: 'Free Online Calculators | Calculator Pro',
    description:
      'Fast, accurate free online calculators for finance, health, fitness, math, and more.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Calculators | Calculator Pro',
    description:
      'Fast, accurate free online calculators for finance, health, fitness, math, and more.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.className}>
      <head>
        {/* Google AdSense */}
        {adsenseId && adsenseId !== 'ca-pub-xxxxxxxxxxxxxxxx' && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            strategy="beforeInteractive"
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white flex flex-col min-h-screen">
        {/* Google Analytics */}
        {gaId && gaId !== 'G-XXXXXXXXXX' && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        )}
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
