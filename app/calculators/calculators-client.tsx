'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { getAllCalculators } from '@/app/lib/seo';

const CATEGORY_LABELS: Record<string, string> = {
  finance: 'Finance',
  health: 'Health & Fitness',
  utility: 'Utilities',
};

interface CalculatorsClientProps {
  initialCalcCount: number;
}

export default function CalculatorsClient({ initialCalcCount }: CalculatorsClientProps) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams?.get('category') ?? undefined;

  const allCalcs = getAllCalculators();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(initialCategory ?? 'all');

  const filtered = useMemo(() => {
    return allCalcs.filter((c) => {
      const matchesCategory = activeCategory === 'all' || c.category === activeCategory;
      const matchesSearch =
        !search ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allCalcs, activeCategory, search]);

  const categories = ['all', 'finance', 'health', 'utility'];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
        All Calculators
      </h1>
      <p className="text-slate-500 dark:text-slate-400 mb-8">
        {allCalcs.length} free calculators available
      </p>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="search"
          placeholder="Search calculators..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 flex-wrap mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeCategory === cat
                ? 'bg-secondary text-white'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-secondary'
            }`}
          >
            {cat === 'all' ? 'All' : CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Calculator Grid */}
      {filtered.length === 0 ? (
        <p className="text-slate-500 dark:text-slate-400 text-center py-12">
          No calculators found for &quot;{search}&quot;
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((calc) => (
            <Link
              key={calc.slug}
              href={`/calculators/${calc.slug}`}
              className="group flex items-start gap-4 p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-secondary dark:hover:border-secondary hover:shadow-md transition"
            >
              <span className="text-3xl">{calc.icon}</span>
              <div>
                <h2 className="font-semibold text-slate-900 dark:text-white group-hover:text-secondary transition-colors">
                  {calc.name}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {calc.description}
                </p>
                <span className="inline-block mt-2 text-xs font-medium text-secondary capitalize">
                  {CATEGORY_LABELS[calc.category]}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
