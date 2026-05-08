'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle?: { push: (obj: object) => void };
  }
}

interface AdSenseAdProps {
  slot: string;
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  fullWidth?: boolean;
}

export default function AdSenseAd({ slot, format = 'auto', fullWidth = false }: AdSenseAdProps) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch {
      // AdSense not loaded yet
    }
  }, []);

  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  if (!clientId || clientId === 'ca-pub-xxxxxxxxxxxxxxxx') {
    // Show placeholder in development
    return (
      <div
        className={`my-6 flex items-center justify-center bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg text-slate-400 text-sm ${fullWidth ? 'w-full' : ''}`}
        style={{ minHeight: '90px' }}
      >
        Ad Placeholder ({slot})
      </div>
    );
  }

  return (
    <div className={`my-6 ${fullWidth ? 'w-full' : ''}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center', minHeight: '90px' }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
