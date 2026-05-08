import Link from 'next/link';
import { getCalculatorsByCategory, getPopularCalculators } from '@/app/lib/seo';

interface RelatedCalculatorsProps {
  category?: string;
  currentSlug?: string;
}

export default function RelatedCalculators({ category, currentSlug }: RelatedCalculatorsProps) {
  const pool = category
    ? getCalculatorsByCategory(category)
    : getPopularCalculators();

  const related = pool.filter((c) => c.slug !== currentSlug).slice(0, 4);

  if (related.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
        Related Calculators
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {related.map((calc) => (
          <Link
            key={calc.slug}
            href={`/calculators/${calc.slug}`}
            className="flex items-center gap-2 p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-secondary dark:hover:border-secondary transition text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-secondary"
          >
            <span>{calc.icon}</span>
            <span>{calc.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
