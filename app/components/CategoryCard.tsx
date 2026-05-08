import Link from 'next/link';

interface CategoryCardProps {
  name: string;
  description: string;
  icon: string;
  calculators: number;
  link: string;
}

export default function CategoryCard({ name, description, icon, calculators, link }: CategoryCardProps) {
  return (
    <Link
      href={link}
      className="group block p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-secondary dark:hover:border-secondary hover:shadow-lg transition-all duration-200"
    >
      <div className="flex items-start gap-4">
        <div className="text-4xl">{icon}</div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-secondary transition-colors">
            {name}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{description}</p>
          <p className="text-xs text-secondary font-medium mt-2">{calculators} calculators →</p>
        </div>
      </div>
    </Link>
  );
}
