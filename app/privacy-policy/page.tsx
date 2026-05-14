import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Calculator Pro — how we collect, use, and protect your data.',
  robots: { index: true, follow: true },
};

const SITE_NAME = 'Calculator Pro';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yourdomain.com';
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'privacy@yourdomain.com';
const LAST_UPDATED = 'May 12, 2026';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Privacy Policy</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">Last updated: {LAST_UPDATED}</p>

      <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-slate-700 dark:text-slate-300">

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">1. Introduction</h2>
          <p>
            Welcome to <strong>{SITE_NAME}</strong> (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). We are
            committed to protecting your personal information and your right to privacy. This Privacy
            Policy explains how we collect, use, disclose, and safeguard your information when you
            visit <a href={SITE_URL} className="text-secondary hover:underline">{SITE_URL}</a> (the &ldquo;Site&rdquo;).
          </p>
          <p>
            Please read this policy carefully. If you disagree with its terms, please discontinue use
            of the Site. By accessing or using the Site, you agree to this Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">2. Information We Collect</h2>
          <h3 className="text-lg font-medium mt-4 mb-2">Automatically Collected Information</h3>
          <p>
            When you visit our Site, certain information is automatically collected by our servers and
            third-party services, including:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Referring URLs</li>
            <li>Pages viewed and time spent</li>
            <li>IP address (anonymized where required by law)</li>
            <li>Device type and screen resolution</li>
          </ul>
          <h3 className="text-lg font-medium mt-4 mb-2">Cookies and Tracking Technologies</h3>
          <p>
            We use cookies and similar tracking technologies (pixels, web beacons) to operate and
            improve the Site, deliver personalised advertising, and analyse traffic. You can control
            cookie preferences through our Cookie Consent banner and your browser settings. See
            Section 6 for details.
          </p>
          <h3 className="text-lg font-medium mt-4 mb-2">Information You Provide</h3>
          <p>
            We do not require account registration. Any data you enter into our calculator tools
            (e.g. loan amounts, age, weight) is processed <strong>entirely in your browser</strong> and
            is never transmitted to or stored on our servers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">3. How We Use Your Information</h2>
          <p>We use automatically collected information to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Operate, maintain, and improve the Site</li>
            <li>Analyse usage patterns and Site performance</li>
            <li>Detect and prevent fraud, abuse, or security incidents</li>
            <li>Comply with legal obligations</li>
            <li>Serve relevant advertisements through Google AdSense</li>
          </ul>
          <p className="mt-3">
            We do <strong>not</strong> sell your personal data to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">4. Google Services</h2>
          <h3 className="text-lg font-medium mt-4 mb-2">Google AdSense</h3>
          <p>
            We use Google AdSense to display advertisements. Google may use cookies to show ads
            based on your prior visits to this Site and other websites. You can opt out of
            personalised advertising by visiting{' '}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:underline"
            >
              Google Ads Settings
            </a>{' '}
            or{' '}
            <a
              href="https://optout.aboutads.info/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:underline"
            >
              aboutads.info
            </a>
            .
          </p>
          <p className="mt-2">
            Google&rsquo;s use of advertising cookies enables it and its partners to serve ads based on
            your visit to our Site and/or other sites on the Internet. Google&rsquo;s Privacy Policy:{' '}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:underline"
            >
              policies.google.com/privacy
            </a>
            .
          </p>
          <h3 className="text-lg font-medium mt-4 mb-2">Google Analytics</h3>
          <p>
            We use Google Analytics to understand how visitors interact with the Site. Google
            Analytics collects data such as pages visited, time on page, and referring source. This
            data is anonymised and aggregated. You can opt out using the{' '}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:underline"
            >
              Google Analytics Opt-out Browser Add-on
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">5. Third-Party Disclosure</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personally identifiable information to
            outside parties except as described in this policy. This does not include trusted third
            parties who assist us in operating our Site, so long as those parties agree to keep this
            information confidential, including:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Google LLC (Analytics, AdSense)</li>
            <li>Hosting and CDN providers</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">6. Cookies</h2>
          <p>
            Cookies are small text files stored on your device. We use the following categories of
            cookies:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <strong>Strictly Necessary</strong> — Required for the Site to function (e.g. dark mode
              preference). These cannot be disabled.
            </li>
            <li>
              <strong>Analytics</strong> — Google Analytics cookies that help us understand usage
              patterns. Requires your consent.
            </li>
            <li>
              <strong>Advertising</strong> — Google AdSense cookies used to serve relevant
              advertisements. Requires your consent.
            </li>
          </ul>
          <p className="mt-3">
            You can update your cookie preferences at any time using the Cookie Settings link in the
            footer, or by adjusting your browser settings. Note that disabling cookies may affect Site
            functionality.
          </p>
          <p className="mt-2">
            For EU/EEA residents, we obtain your consent before placing non-essential cookies, in
            accordance with the ePrivacy Directive and GDPR. For California residents, we comply with
            the CCPA.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">7. Your Privacy Rights</h2>
          <h3 className="text-lg font-medium mt-4 mb-2">GDPR (EU/EEA Residents)</h3>
          <p>If you are located in the EU/EEA, you have the right to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Access the personal data we hold about you</li>
            <li>Request correction or deletion of your data</li>
            <li>Object to or restrict processing of your data</li>
            <li>Data portability</li>
            <li>Withdraw consent at any time</li>
            <li>Lodge a complaint with your local data protection authority</li>
          </ul>
          <h3 className="text-lg font-medium mt-4 mb-2">CCPA (California Residents)</h3>
          <p>California residents have the right to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Know what personal data is collected about you</li>
            <li>Know whether personal data is sold or disclosed and to whom</li>
            <li>Opt out of the sale of personal data</li>
            <li>Access your personal data</li>
            <li>Equal service and price, even if you exercise your privacy rights</li>
          </ul>
          <p className="mt-3">
            We do not sell personal data. To exercise any of these rights, contact us at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-secondary hover:underline">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">8. Children&rsquo;s Privacy</h2>
          <p>
            Our Site is not directed to children under the age of 13 (or 16 in the EU). We do not
            knowingly collect personal information from children. If you believe a child has provided
            personal data to us, please contact us and we will delete such information promptly.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">9. Data Retention</h2>
          <p>
            We retain automatically collected analytics data for a maximum of 26 months, after which
            it is automatically deleted. You may request deletion at any time by contacting us.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">10. Security</h2>
          <p>
            We implement reasonable technical and organisational measures to protect your information.
            However, no method of transmission over the Internet is 100% secure. We cannot guarantee
            absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">11. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of material
            changes by updating the &ldquo;Last updated&rdquo; date at the top of this page. Continued use of
            the Site after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">12. Contact Us</h2>
          <p>
            If you have questions or concerns about this Privacy Policy or our data practices, please
            contact us:
          </p>
          <div className="mt-3 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <p><strong>{SITE_NAME}</strong></p>
            <p>
              Email:{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-secondary hover:underline">
                {CONTACT_EMAIL}
              </a>
            </p>
            {/* TODO: Add physical address when available */}
          </div>
        </section>

      </div>
    </div>
  );
}
