import calculatorsData from '@/data/calculators.json';

export type CalculatorMeta = {
  slug: string;
  name: string;
  category: string;
  title: string;
  description: string;
  keywords: string;
  icon: string;
  popular: boolean;
};

export function getAllCalculators(): CalculatorMeta[] {
  return calculatorsData.calculators as CalculatorMeta[];
}

export function getCalculatorBySlug(slug: string): CalculatorMeta | undefined {
  return calculatorsData.calculators.find((c) => c.slug === slug) as CalculatorMeta | undefined;
}

export function getCalculatorsByCategory(category: string): CalculatorMeta[] {
  return calculatorsData.calculators.filter((c) => c.category === category) as CalculatorMeta[];
}

export function getPopularCalculators(): CalculatorMeta[] {
  return calculatorsData.calculators.filter((c) => c.popular) as CalculatorMeta[];
}

export function generateCalculatorMetadata(slug: string) {
  const calc = getCalculatorBySlug(slug);
  if (!calc) return {};
  return {
    title: calc.title,
    description: calc.description,
    keywords: calc.keywords,
    openGraph: {
      title: calc.title,
      description: calc.description,
      type: 'website' as const,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/calculators/${calc.slug}`,
    },
    twitter: {
      card: 'summary' as const,
      title: calc.title,
      description: calc.description,
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/calculators/${calc.slug}`,
    },
  };
}
