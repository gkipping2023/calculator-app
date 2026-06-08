import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import AdSenseAd from '@/app/components/AdSenseAd';
import { getAllCalculators, getCalculatorBySlug, generateCalculatorMetadata } from '@/app/lib/seo';
import { calculatorSchema } from '@/app/lib/schema';
import { adSlots } from '@/app/lib/ads';

// Calculator component registry — each chunk is lazy-loaded for performance
const CALCULATOR_COMPONENTS: Record<string, React.ComponentType> = {
  'mortgage-calculator': dynamic(() => import('@/app/components/calculators/MortgageCalculator')),
  'loan-calculator': dynamic(() => import('@/app/components/calculators/LoanCalculator')),
  'simple-interest-calculator': dynamic(() => import('@/app/components/calculators/SimpleInterestCalculator')),
  'compound-interest-calculator': dynamic(() => import('@/app/components/calculators/CompoundInterestCalculator')),
  'investment-return-calculator': dynamic(() => import('@/app/components/calculators/InvestmentReturnCalculator')),
  'bmi-calculator': dynamic(() => import('@/app/components/calculators/BMICalculator')),
  'calorie-calculator': dynamic(() => import('@/app/components/calculators/CalorieCalculator')),
  'ideal-weight-calculator': dynamic(() => import('@/app/components/calculators/IdealWeightCalculator')),
  'calories-burned-calculator': dynamic(() => import('@/app/components/calculators/CaloriesBurnedCalculator')),
  'daily-caloric-needs-calculator': dynamic(() => import('@/app/components/calculators/DailyCaloriesCalculator')),
  'age-calculator': dynamic(() => import('@/app/components/calculators/AgeCalculator')),
  'percentage-calculator': dynamic(() => import('@/app/components/calculators/PercentageCalculator')),
  'gpa-calculator': dynamic(() => import('@/app/components/calculators/GPACalculator')),
  'tip-calculator': dynamic(() => import('@/app/components/calculators/TipCalculator')),
  'unit-converter': dynamic(() => import('@/app/components/calculators/UnitConverter')),
  'retirement-calculator': dynamic(() => import('@/app/components/calculators/RetirementCalculator')),
  'salary-calculator': dynamic(() => import('@/app/components/calculators/SalaryCalculator')),
  'interest-rate-calculator': dynamic(() => import('@/app/components/calculators/InterestRateCalculator')),
  'sales-tax-calculator': dynamic(() => import('@/app/components/calculators/SalesTaxCalculator')),
  'amortization-calculator': dynamic(() => import('@/app/components/calculators/AmortizationCalculator')),
  'body-fat-calculator': dynamic(() => import('@/app/components/calculators/BodyFatCalculator')),
  'bmr-calculator': dynamic(() => import('@/app/components/calculators/BMRCalculator')),
  'pace-calculator': dynamic(() => import('@/app/components/calculators/PaceCalculator')),
  'date-calculator': dynamic(() => import('@/app/components/calculators/DateCalculator')),
  'hours-calculator': dynamic(() => import('@/app/components/calculators/HoursCalculator')),
};

// Generate all static routes at build time for SEO
export async function generateStaticParams() {
  return getAllCalculators().map((c) => ({ slug: c.slug }));
}

// Dynamic metadata per calculator
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return generateCalculatorMetadata(slug);
}

export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const calc = getCalculatorBySlug(slug);

  if (!calc) notFound();

  const CalculatorComponent = CALCULATOR_COMPONENTS[slug];
  const schema = calculatorSchema(calc.name, calc.description, calc.slug);

  const CATEGORY_LABELS: Record<string, string> = {
    finance: 'Finance',
    health: 'Health & Fitness',
    utility: 'Utilities',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-slate-500 dark:text-slate-400 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><a href="/" className="hover:text-secondary transition-colors">Home</a></li>
            <li>/</li>
            <li><a href="/calculators" className="hover:text-secondary transition-colors">Calculators</a></li>
            <li>/</li>
            <li className="text-slate-700 dark:text-slate-200">{calc.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Calculator */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">{calc.icon}</span>
                <div>
                  <span className="text-xs font-medium text-secondary uppercase tracking-wide">
                    {CATEGORY_LABELS[calc.category]}
                  </span>
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                    {calc.name}
                  </h1>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-400">{calc.description}</p>
            </div>

            {/* Calculator Card */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
              {CalculatorComponent ? (
                <CalculatorComponent />
              ) : (
                <p className="text-slate-500">Calculator coming soon.</p>
              )}
            </div>

            {/* In-content Ad */}
            <AdSenseAd slot={adSlots.inContent} fullWidth />

            {/* SEO Content Block */}
            <div className="prose prose-slate dark:prose-invert max-w-none mt-8">
              <h2>About the {calc.name}</h2>
              <p>{calc.description}</p>
              <p>
                Our free {calc.name.toLowerCase()} is designed to give you fast, accurate results.
                All calculations are performed locally in your browser — no data is sent to any server.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Sidebar Ad */}
            <AdSenseAd slot={adSlots.sidebarRectangle} format="rectangle" />

            {/* Quick Tips */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-3">How to Use</h3>
              <ol className="text-sm text-slate-600 dark:text-slate-400 space-y-2 list-decimal list-inside">
                <li>Enter your values in the fields</li>
                <li>Click the Calculate button</li>
                <li>View your results instantly</li>
                <li>Copy or share your results</li>
              </ol>
            </div>

            {/* Second Sidebar Ad */}
            <AdSenseAd slot={adSlots.mobileBanner} format="rectangle" />
          </aside>
        </div>
      </div>
    </>
  );
}
