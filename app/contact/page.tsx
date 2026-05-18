import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yourdomain.com';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Calculator Pro team.',
  robots: { index: true, follow: true },
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
};

// TODO: Replace placeholder values with your actual contact details
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'contact@yourdomain.com';
const SITE_NAME = 'Calculator Pro';

// TODO: Add these when available:
// const PHYSICAL_ADDRESS = '123 Main Street, City, State, ZIP, Country';
// const PHONE_NUMBER = '+1 (555) 000-0000';
// const BUSINESS_HOURS = 'Monday–Friday, 9 AM – 5 PM EST';
// const SOCIAL_TWITTER = 'https://twitter.com/yourhandle';

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Contact Us</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-10">
        Have a question, found a bug, or want to suggest a new calculator? We&rsquo;d love to hear from you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Contact details card */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 space-y-5">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Get in Touch</h2>

          {/* Email */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Email</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-secondary hover:underline font-medium"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          {/* TODO: Uncomment and fill in when you have a physical address */}
          {/*
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Address</p>
            <p className="text-slate-700 dark:text-slate-300">{PHYSICAL_ADDRESS}</p>
          </div>
          */}

          {/* TODO: Uncomment and fill in when you have a phone number */}
          {/*
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Phone</p>
            <a href={`tel:${PHONE_NUMBER}`} className="text-secondary hover:underline font-medium">
              {PHONE_NUMBER}
            </a>
            <p className="text-xs text-slate-400 mt-1">{BUSINESS_HOURS}</p>
          </div>
          */}

          {/* TODO: Uncomment and fill in social links */}
          {/*
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Social</p>
            <a href={SOCIAL_TWITTER} target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">
              Twitter / X
            </a>
          </div>
          */}

          <div className="pt-2 border-t border-slate-100 dark:border-slate-700">
            <p className="text-xs text-slate-400">
              We typically respond within 1–3 business days.
            </p>
          </div>
        </div>

        {/* FAQ / quick links */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Helpful Links</h2>
          <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <li>
              <a href="/privacy-policy" className="text-secondary hover:underline">Privacy Policy</a>
              <p className="text-slate-500 text-xs mt-0.5">How we handle your data.</p>
            </li>
            <li>
              <a href="/terms" className="text-secondary hover:underline">Terms and Conditions</a>
              <p className="text-slate-500 text-xs mt-0.5">Rules for using {SITE_NAME}.</p>
            </li>
            <li>
              <a href="/calculators" className="text-secondary hover:underline">All Calculators</a>
              <p className="text-slate-500 text-xs mt-0.5">Browse all our free tools.</p>
            </li>
            <li>
              <a href="/about" className="text-secondary hover:underline">About Us</a>
              <p className="text-slate-500 text-xs mt-0.5">Learn more about {SITE_NAME}.</p>
            </li>
          </ul>
        </div>

      </div>

      {/* Google AdSense note required for transparency */}
      <p className="mt-12 text-xs text-slate-400">
        For advertising or partnership enquiries, please use the email address above.
      </p>
    </div>
  );
}
