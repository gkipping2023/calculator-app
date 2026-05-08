import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl mb-4">🔢</p>
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">404</h1>
      <h2 className="text-xl text-slate-600 dark:text-slate-400 mb-6">
        Calculator Not Found
      </h2>
      <p className="text-slate-500 dark:text-slate-500 mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist. Try browsing our calculator directory.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="px-6 py-3 bg-secondary text-white rounded-lg font-semibold hover:bg-indigo-500 transition"
        >
          Go Home
        </Link>
        <Link
          href="/calculators"
          className="px-6 py-3 border border-slate-300 dark:border-slate-600 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition text-slate-700 dark:text-slate-300"
        >
          Browse Calculators
        </Link>
      </div>
    </div>
  );
}
