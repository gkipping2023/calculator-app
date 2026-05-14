import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Calculator Pro — free, fast, and accurate online calculators.',
  robots: { index: true, follow: true },
};

const SITE_NAME = 'Calculator Pro';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">About {SITE_NAME}</h1>

      <div className="space-y-8 text-slate-700 dark:text-slate-300">

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Our Mission</h2>
          <p>
            {SITE_NAME} provides free, fast, and accurate online calculators for everyday needs —
            from mortgage and loan calculations to BMI, calories, GPA, and more. We believe
            everyone should have access to clear, easy-to-use financial and health tools without
            needing to download an app or pay a subscription.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">What We Offer</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Finance calculators</strong> — Mortgage, loan, compound interest, investment return, and more.</li>
            <li><strong>Health calculators</strong> — BMI, calorie needs, ideal weight, calories burned, and more.</li>
            <li><strong>Utility tools</strong> — Unit converter, percentage calculator, age calculator, GPA calculator, and more.</li>
          </ul>
          <p className="mt-3">
            All calculations run entirely in your browser. We never store the data you enter into
            our calculators.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Disclaimer</h2>
          <p>
            Results from our tools are estimates for informational purposes only and do not
            constitute professional financial, medical, or legal advice. Always consult a qualified
            professional before making important decisions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Get in Touch</h2>
          <p>
            Have a question, suggestion, or want to report an issue? Visit our{' '}
            <a href="/contact" className="text-secondary hover:underline">
              Contact page
            </a>
            .
          </p>
        </section>

      </div>
    </div>
  );
}
