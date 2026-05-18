import type { Metadata } from 'next';
import Link from 'next/link';
import AdSenseAd from '@/app/components/AdSenseAd';
import CategoryCard from '@/app/components/CategoryCard';
import { getPopularCalculators } from '@/app/lib/seo';
import { adSlots } from '@/app/lib/ads';
import { websiteSchema } from '@/app/lib/schema';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yourdomain.com';

export const metadata: Metadata = {
  alternates: {
    canonical: siteUrl,
  },
};

const categories = [
  {
    name: 'Financial Calculators',
    description: 'Mortgage, loan, investment, compound interest, and more',
    icon: '💰',
    calculators: 5,
    link: '/calculators?category=finance',
  },
  {
    name: 'Health & Fitness',
    description: 'BMI, calorie, ideal weight, and health tracking tools',
    icon: '🏃',
    calculators: 5,
    link: '/calculators?category=health',
  },
  {
    name: 'Utility Calculators',
    description: 'Age, percentage, GPA, tip, and unit conversion tools',
    icon: '🔧',
    calculators: 5,
    link: '/calculators?category=utility',
  },
];

export default function Home() {
  const popular = getPopularCalculators().slice(0, 8);
  const schemaData = websiteSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-r from-secondary to-accent py-16 px-4 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Free Online Calculators
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Fast, accurate calculations for finance, health, math, and more.
          </p>
          <Link
            href="/calculators"
            className="inline-block bg-white text-secondary font-semibold px-8 py-3 rounded-lg hover:bg-slate-50 transition shadow-lg"
          >
            Browse All Calculators →
          </Link>
        </div>
      </section>

      {/* Top Ad */}
      <div className="max-w-7xl mx-auto px-4">
        <AdSenseAd slot={adSlots.topBanner} fullWidth />
      </div>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-2 text-center text-slate-900 dark:text-white">
          Calculator Categories
        </h2>
        <p className="text-center text-slate-500 dark:text-slate-400 mb-8">
          Choose from {15}+ free calculators across 3 categories
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <CategoryCard key={cat.name} {...cat} />
          ))}
        </div>
      </section>

      {/* Popular Calculators */}
      <section className="bg-white dark:bg-slate-900 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
            Most Popular Calculators
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {popular.map((calc) => (
              <Link
                key={calc.slug}
                href={`/calculators/${calc.slug}`}
                className="flex flex-col items-center gap-2 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 hover:border-secondary transition group text-center"
              >
                <span className="text-3xl">{calc.icon}</span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-secondary transition-colors">
                  {calc.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Middle Ad */}
      <div className="max-w-7xl mx-auto px-4">
        <AdSenseAd slot={adSlots.inContent} fullWidth />
      </div>

      {/* Trust Section */}
      <section className="bg-slate-100 dark:bg-slate-800 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">
            Why Calculator Pro?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { number: '15+', label: 'Free Calculators' },
              { number: '100%', label: 'Free & Fast' },
              { number: '3', label: 'Categories' },
              { number: '24/7', label: 'Always Available' },
            ].map(({ number, label }) => (
              <div key={label} className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow-sm">
                <p className="text-3xl font-bold text-secondary">{number}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
          About Our Calculators
        </h2>
        <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 space-y-3">
          <p>
            Calculator Pro offers a comprehensive suite of free online calculators designed for
            everyday use. Whether you&apos;re planning a mortgage, tracking your fitness goals, or
            converting units, our tools provide instant, accurate results.
          </p>
          <p>
            Our <Link href="/calculators/mortgage-calculator" className="text-secondary hover:underline">mortgage calculator</Link> helps
            homebuyers estimate monthly payments, while the{' '}
            <Link href="/calculators/bmi-calculator" className="text-secondary hover:underline">BMI calculator</Link> provides
            quick health assessments. All calculations happen in your browser — no data is stored.
          </p>
        </div>
      </section>
    </>
  );
}
