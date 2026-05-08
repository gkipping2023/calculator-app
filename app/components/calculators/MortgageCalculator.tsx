'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '@/app/components/InputField';
import ResultsDisplay from '@/app/components/ResultsDisplay';
import RelatedCalculators from '@/app/components/RelatedCalculators';

interface Inputs {
  principal: number;
  interestRate: number;
  loanTerm: number;
}

export default function MortgageCalculator() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ defaultValues: { principal: 300000, interestRate: 6.5, loanTerm: 30 } });

  const [results, setResults] = useState<Record<string, string> | null>(null);

  const onSubmit = (data: Inputs) => {
    const monthlyRate = data.interestRate / 100 / 12;
    const n = data.loanTerm * 12;
    const monthly =
      monthlyRate === 0
        ? data.principal / n
        : (data.principal * (monthlyRate * Math.pow(1 + monthlyRate, n))) /
          (Math.pow(1 + monthlyRate, n) - 1);
    const totalPaid = monthly * n;
    const totalInterest = totalPaid - data.principal;

    setResults({
      'Monthly Payment': `$${monthly.toFixed(2)}`,
      'Total Payment': `$${totalPaid.toFixed(2)}`,
      'Total Interest': `$${totalInterest.toFixed(2)}`,
      'Principal Amount': `$${Number(data.principal).toLocaleString()}`,
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="Loan Amount ($)"
          type="number"
          placeholder="300000"
          error={errors.principal}
          {...register('principal', { required: 'Required', min: { value: 1000, message: 'Min $1,000' } })}
        />
        <InputField
          label="Annual Interest Rate (%)"
          type="number"
          step="0.01"
          placeholder="6.5"
          error={errors.interestRate}
          {...register('interestRate', { required: 'Required', min: { value: 0, message: 'Must be ≥ 0' } })}
        />
        <InputField
          label="Loan Term (years)"
          type="number"
          placeholder="30"
          error={errors.loanTerm}
          {...register('loanTerm', { required: 'Required', min: { value: 1, message: 'Min 1 year' }, max: { value: 50, message: 'Max 50 years' } })}
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-secondary to-accent text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
        >
          Calculate Mortgage
        </button>
      </form>

      {results && <ResultsDisplay results={results} title="Mortgage Results" />}
      <RelatedCalculators category="finance" currentSlug="mortgage-calculator" />
    </div>
  );
}
