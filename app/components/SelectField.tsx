interface SelectFieldProps {
  label: string;
  options: { value: string; label: string }[];
  error?: { message?: string };
  hint?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name?: string;
  id?: string;
}

import { forwardRef } from 'react';

const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, options, error, hint, ...props }, ref) => (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </label>
      <select
        ref={ref}
        className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition"
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {hint && !error && <p className="text-xs text-slate-500 dark:text-slate-400">{hint}</p>}
      {error?.message && <p className="text-xs text-red-500">{error.message}</p>}
    </div>
  )
);

SelectField.displayName = 'SelectField';

export default SelectField;
