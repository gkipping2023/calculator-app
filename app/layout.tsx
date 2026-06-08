import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import CookieConsent from '@/app/components/CookieConsent';
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
    'Fast, accurate free online calculators for finance, health, fitness, math, and more. Mortgage, BMI, loan, and 25+ calculators.',
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
        
        {/* Dark mode: runs synchronously before first paint to prevent FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var s=localStorage.getItem('theme');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}`,
          }}
        />
        {/* Google Consent Mode v2 — default all to denied until user grants consent */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6060276585627886"
     crossOrigin="anonymous"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                analytics_storage: 'denied',
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                wait_for_update: 500
              });
              // Restore previously saved consent without waiting for React
              try {
                var c = JSON.parse(localStorage.getItem('cookie_consent_v1') || 'null');
                if (c) gtag('consent', 'update', {
                  analytics_storage: c.analytics ? 'granted' : 'denied',
                  ad_storage: c.advertising ? 'granted' : 'denied',
                  ad_user_data: c.advertising ? 'granted' : 'denied',
                  ad_personalization: c.advertising ? 'granted' : 'denied'
                });
              } catch(e) {}
            `,
          }}
        />
        {/* Google AdSense */}
        {adsenseId && adsenseId !== 'ca-pub-xxxxxxxxxxxxxxxx' && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            strategy="afterInteractive"
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
        <CookieConsent />
      </body>
    </html>
  );
}
