import type { Metadata } from 'next';
import { Suspense } from 'react';
import CalculatorsClient from './calculators-client';
import { getAllCalculators } from '@/app/lib/seo';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yourdomain.com';

export const metadata: Metadata = {
  title: 'All Calculators | Calculator Pro',
  description: 'Browse all 15+ free online calculators for finance, health, fitness, math, and utility calculations.',
  keywords: 'all calculators, calculator directory, finance calculators, health calculators, math calculators',
  alternates: {
    canonical: `${siteUrl}/calculators`,
  },
  openGraph: {
    title: 'All Calculators | Calculator Pro',
    description: 'Browse all 15+ free online calculators for finance, health, fitness, math, and utility calculations.',
    url: `${siteUrl}/calculators`,
    type: 'website',
  },
};

export default function CalculatorsPage() {
  const allCalcs = getAllCalculators();
  const calcCount = allCalcs.length;

  return (
    <Suspense>
      <CalculatorsClient initialCalcCount={calcCount} />
    </Suspense>
  );
}
