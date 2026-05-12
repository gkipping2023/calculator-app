# GITHUB COPILOT MASTER PROMPT: Modern Calculator App (SEO + AdSense Ready)

## INSTRUCTIONS FOR GITHUB COPILOT

Use this prompt with Claude Sonnet on GitHub Copilot to build a production-ready calculator web application. Copy-paste this entire section into Copilot and use it for code generation.

---

## PROJECT BRIEF

**Goal**: Build a modern, fast, SEO-optimized calculator application inspired by calculator.net, designed for monetization via Google AdSense. Target launch: Fully functional MVP in 2–4 weeks.

**Technology Stack**:
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS with custom design system
- **Forms**: React Hook Form
- **Database/Storage**: Local JSON (MVP), Supabase (scale)
- **Deployment**: Vercel (preferred)
- **Monetization**: Google AdSense, affiliate links, future premium tier

---

## CORE REQUIREMENTS

### 1. PROJECT STRUCTURE

Create a Next.js 14+ app with the following folder structure:

```
calculator-app/
├── app/
│   ├── layout.tsx              # Root layout with AdSense script
│   ├── page.tsx                # Homepage with calculator directory
│   ├── calculators/
│   │   ├── [slug]/
│   │   │   ├── page.tsx        # Individual calculator page
│   │   │   └── components/
│   │   │       ├── Calculator.tsx
│   │   │       ├── ResultsDisplay.tsx
│   │   │       └── RelatedCalculators.tsx
│   │   ├── page.tsx            # Calculators directory/listing
│   ├── api/
│   │   └── calculators/        # API routes for calculations
│   ├── components/
│   │   ├── Header.tsx          # Navigation + branding
│   │   ├── Footer.tsx          # Footer with links + SEO info
│   │   ├── AdSenseAd.tsx       # Reusable AdSense component
│   │   ├── CategoryCard.tsx    # Category card component
│   │   └── DarkModeToggle.tsx  # Dark mode switcher
│   ├── lib/
│   │   ├── calculators.ts      # Calculator logic + definitions
│   │   ├── seo.ts              # SEO metadata generation
│   │   ├── analytics.ts        # Google Analytics wrapper
│   │   └── ads.ts              # AdSense configuration
│   └── styles/
│       └── globals.css         # Tailwind + custom CSS
├── public/
│   ├── images/                 # Category images, icons
│   └── favicon.ico
├── data/
│   └── calculators.json        # Calculator metadata (SEO, descriptions)
├── next.config.js              # Next.js configuration (compression, SEO)
├── tailwind.config.js          # Tailwind theme (dark mode, colors)
├── tsconfig.json               # TypeScript configuration
└── package.json
```

---

### 2. INITIAL CALCULATOR SET (MVP PHASE)

Implement 15 high-value calculators for launch. Prioritize based on:
- High search volume
- High AdSense CPC/CPM
- Easy to implement
- Popular across regions

**Finance Calculators (40% of revenue)**:
1. Mortgage Calculator
2. Loan Calculator
3. Simple Interest Calculator
4. Compound Interest Calculator
5. Investment Return Calculator

**Health/Fitness Calculators (30% of revenue)**:
6. BMI Calculator
7. Calorie Calculator
8. Ideal Weight Calculator
9. Calories Burned Calculator
10. Daily Caloric Needs Calculator

**Utility Calculators (30% of revenue)**:
11. Age Calculator
12. Percentage Calculator
13. GPA Calculator
14. Tip Calculator
15. Unit Converter (length, weight, temperature)

**Pattern**: Each calculator should follow a consistent UX pattern (see section 4).

---

### 3. TECHNOLOGY SETUP INSTRUCTIONS

#### Install Dependencies
```bash
npx create-next-app@latest calculator-app --typescript --tailwind
cd calculator-app
npm install react-hook-form recharts @headlessui/react lucide-react
npm install -D @types/node typescript
```

#### Configuration Files to Create

**next.config.js** (SEO + Performance):
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      ],
    },
  ],
};
module.exports = nextConfig;
```

**tailwind.config.js** (Modern Design System):
```javascript
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0f172a',
        secondary: '#6366f1',
        accent: '#ec4899',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  darkMode: 'class',
  plugins: [require('@tailwindcss/forms')],
};
```

---

### 4. CORE COMPONENTS & PATTERNS

#### A. Calculator Component Pattern (All calculators inherit this)

Every calculator should follow this structure:

```typescript
// Example: app/calculators/mortgage/components/Calculator.tsx

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import ResultsDisplay from '@/components/ResultsDisplay';

interface MortgageInputs {
  principal: number;
  interestRate: number;
  loanTerm: number;
}

export default function MortgageCalculator() {
  const { register, handleSubmit, watch } = useForm<MortgageInputs>({
    defaultValues: { principal: 300000, interestRate: 6.5, loanTerm: 30 },
  });
  
  const [results, setResults] = useState<any>(null);

  const onSubmit = (data: MortgageInputs) => {
    // Perform calculation
    const monthlyRate = data.interestRate / 100 / 12;
    const numberOfPayments = data.loanTerm * 12;
    const monthlyPayment = 
      (data.principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const totalPaid = monthlyPayment * numberOfPayments;
    const totalInterest = totalPaid - data.principal;

    setResults({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPaid.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="Loan Amount ($)"
          type="number"
          {...register('principal', { required: true, min: 1000 })}
          placeholder="300000"
        />
        <InputField
          label="Interest Rate (%)"
          type="number"
          step="0.1"
          {...register('interestRate', { required: true, min: 0 })}
          placeholder="6.5"
        />
        <InputField
          label="Loan Term (years)"
          type="number"
          {...register('loanTerm', { required: true, min: 1 })}
          placeholder="30"
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-secondary to-accent text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
        >
          Calculate
        </button>
      </form>

      {results && <ResultsDisplay results={results} />}
      <RelatedCalculators category="finance" />
    </div>
  );
}
```

#### B. Input Component (Reusable)

```typescript
// app/components/InputField.tsx

import { forwardRef } from 'react';

const InputField = forwardRef<HTMLInputElement, any>(
  ({ label, error, ...props }, ref) => (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <input
        ref={ref}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition dark:bg-slate-700 dark:border-slate-600"
        {...props}
      />
      {error && <p className="text-red-500 text-xs">{error.message}</p>}
    </div>
  )
);

export default InputField;
```

#### C. Results Display Component

```typescript
// app/components/ResultsDisplay.tsx

import { Copy, Download, Share2 } from 'lucide-react';

interface ResultsDisplayProps {
  results: Record<string, string | number>;
  title?: string;
}

export default function ResultsDisplay({ results, title = 'Results' }: ResultsDisplayProps) {
  const handleCopy = () => {
    const text = Object.entries(results)
      .map(([key, val]) => `${key}: ${val}`)
      .join('\n');
    navigator.clipboard.writeText(text);
  };

  const handleDownloadPDF = () => {
    // Integrate with a PDF library (e.g., jsPDF)
    console.log('PDF download triggered');
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {Object.entries(results).map(([key, value]) => (
          <div key={key} className="bg-white dark:bg-slate-700 p-4 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{key}</p>
            <p className="text-2xl font-bold text-secondary">{value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition"
        >
          <Copy size={18} /> Copy
        </button>
        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition"
        >
          <Download size={18} /> PDF
        </button>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition">
          <Share2 size={18} /> Share
        </button>
      </div>
    </div>
  );
}
```

#### D. AdSense Ad Component (Reusable)

```typescript
// app/components/AdSenseAd.tsx

'use client';

import { useEffect } from 'react';

interface AdSenseAdProps {
  slot: string;
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  fullWidth?: boolean;
}

export default function AdSenseAd({ slot, format = 'auto', fullWidth = false }: AdSenseAdProps) {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.adsbygoogle) {
      window.adsbygoogle.push({});
    }
  }, []);

  return (
    <div className={`my-6 ${fullWidth ? 'w-full' : ''}`}>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          textAlign: 'center',
          minHeight: '100px',
        }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
```

#### E. AdSense Script (Root Layout)

```typescript
// app/layout.tsx

import type { Metadata } from 'next';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Free Online Calculators | Calculator Pro',
  description: 'Fast, accurate online calculators for finance, health, fitness, math, and more.',
  keywords: 'calculator, mortgage calculator, loan calculator, BMI calculator, finance calculator',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google AdSense Script */}
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
          strategy="beforeInteractive"
          crossOrigin="anonymous"
        />
        {/* Google Analytics */}
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="beforeInteractive"
        />
        <Script
          id="google-analytics"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `,
          }}
        />
      </head>
      <body className="bg-slate-50 dark:bg-slate-950 text-gray-900 dark:text-white">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

---

### 5. SEO CONFIGURATION

#### A. Dynamic Metadata Generation

```typescript
// lib/seo.ts

export const calculatorMetadata = {
  mortgage: {
    title: 'Free Mortgage Calculator | Calculate Monthly Payments',
    description: 'Calculate mortgage payments instantly. See monthly payment, total interest, and amortization schedule.',
    keywords: 'mortgage calculator, calculate mortgage, monthly payment',
    slug: 'mortgage-calculator',
  },
  bmi: {
    title: 'BMI Calculator | Free Body Mass Index Tool',
    description: 'Calculate your BMI instantly. Track your health with our accurate BMI calculator.',
    keywords: 'BMI calculator, body mass index, BMI tool',
    slug: 'bmi-calculator',
  },
  // ... add more calculators
};

export function generateMetadata(calculatorKey: string) {
  const calc = calculatorMetadata[calculatorKey as keyof typeof calculatorMetadata];
  return {
    title: calc.title,
    description: calc.description,
    keywords: calc.keywords,
    openGraph: {
      title: calc.title,
      description: calc.description,
      type: 'website',
    },
  };
}
```

#### B. Structured Data (Schema.org)

```typescript
// lib/schema.ts

export function calculatorSchema(calculatorName: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: calculatorName,
    description: description,
    url: `https://yourdomain.com/calculators/${calculatorName}`,
    applicationCategory: 'UtilityApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
}
```

#### C. XML Sitemap (Generated Dynamically)

```typescript
// app/sitemap.ts

import { calculatorMetadata } from '@/lib/seo';

export default function sitemap() {
  const baseUrl = 'https://yourdomain.com';
  
  const calculators = Object.values(calculatorMetadata).map((calc) => ({
    url: `${baseUrl}/calculators/${calc.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...calculators,
  ];
}
```

#### D. robots.txt

```text
# robots.txt

User-agent: *
Allow: /
Allow: /calculators/
Disallow: /api/
Disallow: /admin/
Disallow: /?*sort=
Disallow: /?*page=2

Sitemap: https://yourdomain.com/sitemap.xml
```

---

### 6. DARK MODE IMPLEMENTATION

#### A. Dark Mode Toggle Component

```typescript
// app/components/DarkModeToggle.tsx

'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setIsDark(savedTheme === 'dark');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
    if (newDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 transition"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
```

---

### 7. HOMEPAGE STRUCTURE

```typescript
// app/page.tsx

import Image from 'next/image';
import Link from 'next/link';
import AdSenseAd from '@/components/AdSenseAd';
import CategoryCard from '@/components/CategoryCard';

const categories = [
  {
    name: 'Financial Calculators',
    description: 'Mortgage, loan, investment, and more',
    image: '/images/finance.jpg',
    calculators: 5,
    link: '/calculators/finance',
  },
  {
    name: 'Health & Fitness',
    description: 'BMI, calorie, and health tracking',
    image: '/images/health.jpg',
    calculators: 5,
    link: '/calculators/health',
  },
  {
    name: 'Math Calculators',
    description: 'Scientific, percentage, and more',
    image: '/images/math.jpg',
    calculators: 3,
    link: '/calculators/math',
  },
  {
    name: 'Utilities',
    description: 'Age, date, GPA, and other tools',
    image: '/images/utilities.jpg',
    calculators: 2,
    link: '/calculators/utilities',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary to-accent py-12 px-4 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Free Online Calculators</h1>
          <p className="text-xl mb-8 opacity-90">
            Fast, accurate calculations for finance, health, math, and more.
          </p>
          <input
            type="search"
            placeholder="Search calculators..."
            className="w-full md:w-1/2 px-4 py-3 rounded-lg text-gray-900 focus:outline-none"
          />
        </div>
      </section>

      {/* Ad Section */}
      <AdSenseAd slot="calculator_top" fullWidth={true} />

      {/* Categories Grid */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Popular Calculator Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.name} {...category} />
          ))}
        </div>
      </section>

      {/* Ad Section */}
      <AdSenseAd slot="calculator_middle" fullWidth={true} />

      {/* Trust Section */}
      <section className="bg-slate-100 dark:bg-slate-800 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Trusted by Millions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatBox number="5M+" label="Monthly Visits" />
            <StatBox number="50+" label="Calculators" />
            <StatBox number="100%" label="Free & Ad-Supported" />
            <StatBox number="24/7" label="Always Available" />
          </div>
        </div>
      </section>
    </div>
  );
}

function StatBox({ number, label }: { number: string; label: string }) {
  return (
    <div className="bg-white dark:bg-slate-700 p-4 rounded-lg">
      <p className="text-3xl font-bold text-secondary">{number}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
    </div>
  );
}
```

---

### 8. MONETIZATION CONFIGURATION

#### Environment Variables (.env.local)

```env
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Optional: Affiliate APIs
AMAZON_AFFILIATE_ID=youraffiliateID
```

#### Ad Slot Strategy

```
Strategic placement:
1. Top Banner (728x90): Above fold, high visibility
2. Sidebar (300x250): Medium rectangle, high CPM
3. In-Content (336x280): Between calculator sections
4. Bottom Banner: Before footer, exit-intent value
5. Responsive Units: Mobile optimization
```

---

### 9. PERFORMANCE OPTIMIZATION

#### A. Image Optimization

```typescript
import Image from 'next/image';

// Always use Next.js Image component
<Image
  src="/images/calculator.png"
  alt="Calculator tool"
  width={400}
  height={300}
  priority={false}
/>
```

#### B. Code Splitting & Lazy Loading

```typescript
import dynamic from 'next/dynamic';

const MortgageCalculator = dynamic(() => import('./MortgageCalculator'), {
  loading: () => <p>Loading calculator...</p>,
});
```

#### C. Caching Strategy

```typescript
// Cache static pages for 1 year
export const revalidate = 31536000; // 1 year in seconds
```

---

### 10. DEPLOYMENT & LAUNCH CHECKLIST

**Pre-Launch**:
- [ ] Register domain (e.g., calculatorpro.com, calculatortool.com)
- [ ] Set up Google AdSense account (minimum requirements: 6 months old domain, 50+ pages)
- [ ] Create Google Analytics 4 property
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Vercel project and link to domain
- [ ] Optimize images (WebP format, proper sizing)
- [ ] Test mobile responsiveness (all calculators)
- [ ] Verify dark mode functionality
- [ ] Test all calculator functionality
- [ ] Set up 404 page and error handling

**Launch Day**:
- [ ] Deploy to production (Vercel)
- [ ] Verify Google AdSense is showing
- [ ] Test all analytics are firing
- [ ] Verify all pages are indexable (no robots.txt blocking)
- [ ] Submit to Google Search Console
- [ ] Create initial backlinks (Reddit, Quora, forums)

**First Month**:
- [ ] Monitor AdSense revenue
- [ ] Track ranking for target keywords
- [ ] Add 10-15 more calculators based on data
- [ ] Create blog posts linking to calculators
- [ ] Implement affiliate links in relevant calculators
- [ ] Set up email newsletter (for future monetization)

---

### 11. FUTURE MONETIZATION FEATURES

**Phase 2 (Month 3-4)**:
- Premium tier (ad-free): $2.99/month
- PDF downloads: $0.99 per download (Gumroad integration)
- API access: $19/month for developers
- White-label solution: Custom pricing

**Phase 3 (Month 6+)**:
- Mobile app (Flutter or React Native)
- Affiliate network expansion
- Sponsored calculators (finance companies, health brands)
- Programmatic advertising (DFP integration)

---

### 12. QUICK-START COMMAND SEQUENCE

```bash
# 1. Create project
npx create-next-app@latest calculator-app --typescript --tailwind

# 2. Install dependencies
npm install react-hook-form recharts @headlessui/react lucide-react

# 3. Create folder structure (as described above)
mkdir -p app/calculators/{mortgage,bmi,loan,interest}
mkdir -p app/components app/lib app/styles data public/images

# 4. Create .env.local with your AdSense and GA IDs
echo "NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-YOUR_ID" > .env.local

# 5. Start development
npm run dev

# 6. Build for production
npm run build
npm run start

# 7. Deploy to Vercel
vercel deploy
```

---

### 13. CODE GENERATION EXAMPLES FOR COPILOT

When using GitHub Copilot, use these specific prompts:

**Example 1**: Generate a Loan Calculator
```
Generate a React component for a Loan Calculator using React Hook Form with inputs for principal, interest rate, and loan term. Include result calculations and display. Style with Tailwind CSS for dark mode support.
```

**Example 2**: Generate SEO Metadata
```
Create a TypeScript metadata generation function for dynamic SEO on calculator pages. Include title, description, keywords, and schema.org structured data for a financial calculator.
```

**Example 3**: Generate Ad Components
```
Create a reusable React component that displays Google AdSense ads. It should handle multiple ad slots, responsive sizing, and client-side initialization of adsbygoogle.
```

---

### 14. REVENUE ESTIMATION (USE TO MOTIVATE)

```
Base Assumptions:
- Initial: 15 calculators
- Target 1st month: 5,000 visits
- Monthly growth: 30% (conservative)
- Average CPM: $2.50 (US-focused traffic)
- AdSense takes 68%, you get 32%

Month 1-2: Building + AdSense approval = $0
Month 3: 5K visits × 3 impressions = 15K × $2.50 CPM = $37.50 × 32% = ~$12
Month 4: 15K visits × 3 impressions = 45K × $2.50 CPM = $112.50 × 32% = ~$36
Month 5: 45K visits × 3 impressions = 135K × $2.50 CPM = $337.50 × 32% = ~$108
Month 6: 135K visits × 3 impressions = 405K × $2.50 CPM = $1,012.50 × 32% = ~$324

This is conservative. Real potential with good content marketing: $1,000-$5,000/month by month 6.
```

---

## FINAL NOTES

- **Start small**: Launch with 15 calculators, not 200. Quality > Quantity.
- **Focus on mobile**: 70%+ of calculator traffic is mobile. Test obsessively on mobile.
- **AdSense approval**: Typically takes 2-4 weeks. Build while waiting.
- **Content marketing**: Blog posts about "how to use mortgage calculator" → backlinks → SEO → revenue.
- **Community engagement**: Answer questions on Reddit, Quora → link back to your calculators.
- **A/B test**: Try different ad placements, colors, and layouts. Track what converts best.

---

**Ready to build?** Copy this prompt and start generating code with Copilot!

