import Link from 'next/link';
import DarkModeToggle from './DarkModeToggle';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              Calculator Pro
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/calculators"
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-secondary dark:hover:text-secondary transition-colors"
            >
              All Calculators
            </Link>
            <Link
              href="/calculators?category=finance"
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-secondary dark:hover:text-secondary transition-colors"
            >
              Finance
            </Link>
            <Link
              href="/calculators?category=health"
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-secondary dark:hover:text-secondary transition-colors"
            >
              Health
            </Link>
            <Link
              href="/calculators?category=utility"
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-secondary dark:hover:text-secondary transition-colors"
            >
              Utilities
            </Link>
          </nav>

          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}
