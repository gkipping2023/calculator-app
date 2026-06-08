'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '@/app/components/InputField';
import ResultsDisplay from '@/app/components/ResultsDisplay';

interface SalaryInputs {
  annualSalary: number;
  payPeriod: 'weekly' | 'biweekly' | 'semimonthly' | 'monthly';
  taxRate: number;
}

export default function SalaryCalculator() {
  const { register, handleSubmit } = useForm<SalaryInputs>({
    defaultValues: {
      annualSalary: 60000,
      payPeriod: 'biweekly',
      taxRate: 20,
    },
  });

  const [results, setResults] = useState<Record<string, string> | null>(null);

  const onSubmit = (data: SalaryInputs) => {
    let periods = 52;
    let periodLabel = 'Weekly';

    switch (data.payPeriod) {
      case 'biweekly':
        periods = 26;
        periodLabel = 'Biweekly';
        break;
      case 'semimonthly':
        periods = 24;
        periodLabel = 'Semi-Monthly';
        break;
      case 'monthly':
        periods = 12;
        periodLabel = 'Monthly';
        break;
    }

    const grossPerPeriod = data.annualSalary / periods;
    const taxesPerPeriod = (grossPerPeriod * data.taxRate) / 100;
    const netPerPeriod = grossPerPeriod - taxesPerPeriod;
    const annualTaxes = taxesPerPeriod * periods;
    const annualNet = data.annualSalary - annualTaxes;

    setResults({
      'Gross Annual': `$${data.annualSalary.toFixed(2)}`,
      'Annual Taxes': `$${annualTaxes.toFixed(2)}`,
      'Annual Net': `$${annualNet.toFixed(2)}`,
      [`Gross ${periodLabel}`]: `$${grossPerPeriod.toFixed(2)}`,
      [`Net ${periodLabel}`]: `$${netPerPeriod.toFixed(2)}`,
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="Annual Salary ($)"
          type="number"
          {...register('annualSalary', { required: true, min: 0 })}
          placeholder="60000"
        />
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Pay Period
          </label>
          <select
            {...register('payPeriod')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition dark:bg-slate-700 dark:border-slate-600"
          >
            <option value="weekly">Weekly</option>
            <option value="biweekly">Biweekly</option>
            <option value="semimonthly">Semi-Monthly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <InputField
          label="Tax Rate (%)"
          type="number"
          step="0.1"
          {...register('taxRate', { required: true, min: 0, max: 100 })}
          placeholder="20"
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-secondary to-accent text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
        >
          Calculate Salary
        </button>
      </form>

      {results && <ResultsDisplay results={results} title="Salary Breakdown" />}
    </div>
  );
}
