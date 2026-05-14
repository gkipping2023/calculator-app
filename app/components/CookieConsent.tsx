'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type ConsentState = {
  analytics: boolean;
  advertising: boolean;
};

const CONSENT_KEY = 'cookie_consent_v1';

function loadConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw ? (JSON.parse(raw) as ConsentState) : null;
  } catch {
    return null;
  }
}

function saveConsent(consent: ConsentState) {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  } catch {
    // storage unavailable — fail silently
  }
}

/**
 * Update Google Consent Mode v2 signals.
 * Called after the user makes a choice so GA/AdSense respect their decision.
 */
function updateGoogleConsent(consent: ConsentState) {
  if (typeof window === 'undefined') return;
  if (typeof (window as Window & { gtag?: (...args: unknown[]) => void }).gtag !== 'function') return;
  const { gtag } = window as Window & { gtag: (...args: unknown[]) => void };
  gtag('consent', 'update', {
    analytics_storage: consent.analytics ? 'granted' : 'denied',
    ad_storage: consent.advertising ? 'granted' : 'denied',
    ad_user_data: consent.advertising ? 'granted' : 'denied',
    ad_personalization: consent.advertising ? 'granted' : 'denied',
  });
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [advertising, setAdvertising] = useState(false);

  useEffect(() => {
    const stored = loadConsent();
    if (stored) {
      // Already consented — update Google Consent Mode to reflect saved preferences
      updateGoogleConsent(stored);
    } else {
      // No decision yet — show banner
      setVisible(true);
    }
  }, []);

  function acceptAll() {
    const consent: ConsentState = { analytics: true, advertising: true };
    saveConsent(consent);
    updateGoogleConsent(consent);
    setVisible(false);
  }

  function rejectAll() {
    const consent: ConsentState = { analytics: false, advertising: false };
    saveConsent(consent);
    updateGoogleConsent(consent);
    setVisible(false);
  }

  function saveCustom() {
    const consent: ConsentState = { analytics, advertising };
    saveConsent(consent);
    updateGoogleConsent(consent);
    setVisible(false);
  }

  // Expose a way for users to re-open the banner (called from footer "Cookie Settings" link)
  useEffect(() => {
    function handleReopen() {
      const stored = loadConsent();
      if (stored) {
        setAnalytics(stored.analytics);
        setAdvertising(stored.advertising);
      }
      setShowDetails(true);
      setVisible(true);
    }
    window.addEventListener('open-cookie-consent', handleReopen);
    return () => window.removeEventListener('open-cookie-consent', handleReopen);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 shadow-2xl"
    >
      <div className="max-w-5xl mx-auto">
        {!showDetails ? (
          /* --- Simple banner --- */
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-sm text-slate-700 dark:text-slate-300 flex-1">
              We use cookies to analyse traffic and serve personalised ads. By clicking{' '}
              <strong>Accept All</strong> you consent to our use of cookies as described in our{' '}
              <Link href="/privacy-policy" className="text-secondary hover:underline">
                Privacy Policy
              </Link>
              . You can customise your choices or reject non-essential cookies.
            </p>
            <div className="flex flex-wrap gap-2 shrink-0">
              <button
                onClick={() => setShowDetails(true)}
                className="px-4 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Manage Preferences
              </button>
              <button
                onClick={rejectAll}
                className="px-4 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Reject All
              </button>
              <button
                onClick={acceptAll}
                className="px-4 py-2 text-sm rounded-lg bg-secondary text-white hover:bg-secondary/90 transition-colors font-medium"
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          /* --- Detailed preferences panel --- */
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Cookie Preferences</h2>

            {/* Strictly necessary — always on */}
            <div className="flex items-start gap-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Strictly Necessary</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Required for the Site to function (e.g. dark mode, cookie consent record). Cannot be disabled.
                </p>
              </div>
              <span className="text-xs text-slate-400 font-medium mt-1 shrink-0">Always on</span>
            </div>

            {/* Analytics */}
            <div className="flex items-start gap-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Analytics (Google Analytics)</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Helps us understand how visitors use the Site so we can improve it. Data is aggregated and anonymised.
                </p>
              </div>
              <button
                role="switch"
                aria-checked={analytics}
                onClick={() => setAnalytics(!analytics)}
                className={`relative mt-0.5 shrink-0 inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${
                  analytics ? 'bg-secondary' : 'bg-slate-300 dark:bg-slate-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
                    analytics ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Advertising */}
            <div className="flex items-start gap-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Advertising (Google AdSense)</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Allows Google to serve personalised ads based on your interests. Disabling this shows
                  contextual (non-personalised) ads instead.
                </p>
              </div>
              <button
                role="switch"
                aria-checked={advertising}
                onClick={() => setAdvertising(!advertising)}
                className={`relative mt-0.5 shrink-0 inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${
                  advertising ? 'bg-secondary' : 'bg-slate-300 dark:bg-slate-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
                    advertising ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={rejectAll}
                className="px-4 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Reject All
              </button>
              <button
                onClick={acceptAll}
                className="px-4 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Accept All
              </button>
              <button
                onClick={saveCustom}
                className="px-4 py-2 text-sm rounded-lg bg-secondary text-white hover:bg-secondary/90 transition-colors font-medium"
              >
                Save My Preferences
              </button>
            </div>

            <p className="text-xs text-slate-400">
              For more information, see our{' '}
              <Link href="/privacy-policy" className="text-secondary hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
