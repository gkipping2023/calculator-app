'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  function openCookieSettings() {
    window.dispatchEvent(new Event('open-cookie-consent'));
  }

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <span className="text-xl font-bold text-white">Calculator Pro</span>
            <p className="mt-2 text-sm text-slate-400 max-w-xs">
              Fast, accurate, free online calculators for finance, health, math, and everyday life.
            </p>
          </div>

          {/* Finance */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Finance
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/calculators/mortgage-calculator" className="hover:text-secondary transition-colors">Mortgage Calculator</Link></li>
              <li><Link href="/calculators/loan-calculator" className="hover:text-secondary transition-colors">Loan Calculator</Link></li>
              <li><Link href="/calculators/compound-interest-calculator" className="hover:text-secondary transition-colors">Compound Interest</Link></li>
              <li><Link href="/calculators/investment-return-calculator" className="hover:text-secondary transition-colors">Investment Return</Link></li>
            </ul>
          </div>

          {/* Health & Utilities */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Health & Utilities
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/calculators/bmi-calculator" className="hover:text-secondary transition-colors">BMI Calculator</Link></li>
              <li><Link href="/calculators/calorie-calculator" className="hover:text-secondary transition-colors">Calorie Calculator</Link></li>
              <li><Link href="/calculators/age-calculator" className="hover:text-secondary transition-colors">Age Calculator</Link></li>
              <li><Link href="/calculators/unit-converter" className="hover:text-secondary transition-colors">Unit Converter</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-secondary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-secondary transition-colors">Contact</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-secondary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-secondary transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {currentYear} Calculator Pro. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 items-center">
            <p>All calculations are for informational purposes only.</p>
            <button
              onClick={openCookieSettings}
              className="hover:text-slate-300 transition-colors underline underline-offset-2 cursor-pointer"
            >
              Cookie Settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
