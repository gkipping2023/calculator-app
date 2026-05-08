'use client';

import { useState } from 'react';
import { Copy, Download, Share2, Check } from 'lucide-react';

interface ResultsDisplayProps {
  results: Record<string, string | number>;
  title?: string;
  labels?: Record<string, string>;
}

export default function ResultsDisplay({
  results,
  title = 'Results',
  labels = {},
}: ResultsDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = Object.entries(results)
      .map(([key, val]) => `${labels[key] ?? key}: ${val}`)
      .join('\n');
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'Calculator Pro Results',
        text: Object.entries(results)
          .map(([key, val]) => `${labels[key] ?? key}: ${val}`)
          .join('\n'),
        url: window.location.href,
      });
    } else {
      await handleCopy();
    }
  };

  const handleDownloadPDF = () => {
    // PDF generation would integrate jsPDF in a future iteration
    window.print();
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
      <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">{title}</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        {Object.entries(results).map(([key, value]) => (
          <div key={key} className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow-sm">
            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
              {labels[key] ?? key}
            </p>
            <p className="text-2xl font-bold text-secondary">{value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-indigo-500 transition text-sm font-medium"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-pink-500 transition text-sm font-medium"
        >
          <Download size={16} /> Print / PDF
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          <Share2 size={16} /> Share
        </button>
      </div>
    </div>
  );
}
