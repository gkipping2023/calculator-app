'use client';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

export function trackCalculatorUse(calculatorName: string) {
  trackEvent('calculator_use', { calculator: calculatorName });
}

export function trackAdClick(adSlot: string) {
  trackEvent('ad_click', { slot: adSlot });
}
