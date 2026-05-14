import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: 'Terms and Conditions for using Calculator Pro.',
  robots: { index: true, follow: true },
};

const SITE_NAME = 'Calculator Pro';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yourdomain.com';
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'legal@yourdomain.com';
const LAST_UPDATED = 'May 12, 2026';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Terms and Conditions</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">Last updated: {LAST_UPDATED}</p>

      <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-slate-700 dark:text-slate-300">

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">1. Agreement to Terms</h2>
          <p>
            By accessing or using <strong>{SITE_NAME}</strong> at{' '}
            <a href={SITE_URL} className="text-secondary hover:underline">{SITE_URL}</a> (the
            &ldquo;Site&rdquo;), you agree to be bound by these Terms and Conditions (&ldquo;Terms&rdquo;). If you do not
            agree, you must stop using the Site immediately.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">2. Use of the Site</h2>
          <p>You may use the Site for lawful, personal, non-commercial purposes only. You agree not to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Use the Site in any way that violates applicable laws or regulations</li>
            <li>Transmit any unsolicited or unauthorised advertising or spam</li>
            <li>Attempt to gain unauthorised access to any part of the Site</li>
            <li>Engage in data scraping, crawling, or automated querying without prior written permission</li>
            <li>Reproduce, duplicate, copy, or exploit the Site for commercial purposes without permission</li>
            <li>Interfere with or disrupt the integrity or performance of the Site</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">3. Disclaimer — Informational Purposes Only</h2>
          <p>
            <strong>
              All calculators, tools, and content provided on this Site are for informational and
              educational purposes only. They do not constitute financial, medical, legal, tax, or
              professional advice.
            </strong>
          </p>
          <p className="mt-3">
            Results produced by our calculators are estimates based on the inputs you provide and
            simplified mathematical models. They may not reflect your actual financial obligations,
            health outcomes, or other real-world results. Always consult a qualified professional
            before making any financial, health-related, or legal decisions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">4. Accuracy of Information</h2>
          <p>
            We strive to provide accurate and up-to-date information, but we make no representations
            or warranties of any kind, express or implied, about the completeness, accuracy,
            reliability, suitability, or availability of the Site, its content, or results generated
            by our tools. Any reliance you place on such information is strictly at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">5. Advertising</h2>
          <p>
            The Site displays advertisements served by Google AdSense and potentially other
            advertising networks. We are not responsible for the content of third-party advertisements
            or the products, services, or websites they promote. The presence of an advertisement does
            not constitute an endorsement by {SITE_NAME}.
          </p>
          <p className="mt-3">
            By using this Site, you acknowledge that advertisements may be displayed and that Google
            may use cookies to personalise ads based on your interests. You can manage ad preferences
            via{' '}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:underline"
            >
              Google Ads Settings
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">6. Intellectual Property</h2>
          <p>
            All content on this Site — including text, graphics, logos, design, code, and calculator
            functionality — is the property of {SITE_NAME} or its content suppliers and is protected
            by copyright, trademark, and other intellectual property laws.
          </p>
          <p className="mt-3">
            You may not reproduce, distribute, modify, or create derivative works of any content on
            this Site without express written permission, except for personal, non-commercial use
            consistent with these Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">7. Third-Party Links</h2>
          <p>
            The Site may contain links to third-party websites. These links are provided for your
            convenience only. We have no control over the content of those sites and accept no
            responsibility for them or for any loss or damage that may arise from your use of them.
            Visiting any linked website is at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">8. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, {SITE_NAME} shall not be liable for any indirect,
            incidental, special, consequential, or punitive damages, or any loss of profits, revenues,
            data, goodwill, or other intangible losses, resulting from:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Your access to or use of (or inability to access or use) the Site</li>
            <li>Any content or information obtained from the Site</li>
            <li>Reliance on calculator results or other tools provided on the Site</li>
            <li>Any unauthorised access to or use of our servers and/or personal information</li>
            <li>Any bugs, viruses, or other harmful code that may be transmitted through the Site</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">9. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless {SITE_NAME} and its operators from any claims,
            damages, losses, liabilities, costs, and expenses (including legal fees) arising out of
            your use of the Site or violation of these Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">10. Privacy</h2>
          <p>
            Your use of the Site is also governed by our{' '}
            <a href="/privacy-policy" className="text-secondary hover:underline">
              Privacy Policy
            </a>
            , which is incorporated into these Terms by reference.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">11. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Changes are effective immediately
            upon posting to the Site. We will indicate the date of the most recent revision at the top
            of this page. Continued use of the Site after any changes constitutes your acceptance of
            the new Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">12. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with applicable law. Any
            disputes arising under these Terms shall be subject to the exclusive jurisdiction of the
            competent courts in the applicable jurisdiction.
          </p>
          {/* TODO: Replace with your specific jurisdiction once known */}
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">13. Termination</h2>
          <p>
            We reserve the right to terminate or restrict your access to the Site at our sole
            discretion, without notice, for conduct that we believe violates these Terms or is harmful
            to other users, us, or third parties, or for any other reason.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">14. Contact Us</h2>
          <p>
            Questions about these Terms? Contact us:
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
