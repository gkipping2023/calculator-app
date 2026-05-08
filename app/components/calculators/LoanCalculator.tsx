'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '@/app/components/InputField';
import SelectField from '@/app/components/SelectField';
import ResultsDisplay from '@/app/components/ResultsDisplay';
import RelatedCalculators from '@/app/components/RelatedCalculators';

interface Inputs {
  principal: number;
  interestRate: number;
  loanTerm: number;
  termUnit: 'years' | 'months';
}

export default function LoanCalculator() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ defaultValues: { principal: 10000, interestRate: 5.0, loanTerm: 5, termUnit: 'years' } });

  const [results, setResults] = useState<Record<string, string> | null>(null);

  const onSubmit = (data: Inputs) => {
    const months = data.termUnit === 'years' ? data.loanTerm * 12 : data.loanTerm;
    const monthlyRate = data.interestRate / 100 / 12;
    const monthly =
      monthlyRate === 0
        ? data.principal / months
        : (data.principal * (monthlyRate * Math.pow(1 + monthlyRate, months))) /
          (Math.pow(1 + monthlyRate, months) - 1);
    const totalPaid = monthly * months;
    const totalInterest = totalPaid - data.principal;

    setResults({
      'Monthly Payment': `$${monthly.toFixed(2)}`,
      'Total Payment': `$${totalPaid.toFixed(2)}`,
      'Total Interest': `$${totalInterest.toFixed(2)}`,
      'Loan Amount': `$${Number(data.principal).toLocaleString()}`,
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="Loan Amount ($)"
          type="number"
          placeholder="10000"
          error={errors.principal}
          {...register('principal', { required: 'Required', min: { value: 100, message: 'Min $100' } })}
        />
        <InputField
          label="Annual Interest Rate (%)"
          type="number"
          step="0.01"
          placeholder="5.0"
          error={errors.interestRate}
          {...register('interestRate', { required: 'Required', min: { value: 0, message: 'Must be ≥ 0' } })}
        />
        <div className="grid grid-cols-2 gap-3">
          <InputField
            label="Loan Term"
            type="number"
            placeholder="5"
            error={errors.loanTerm}
            {...register('loanTerm', { required: 'Required', min: { value: 1, message: 'Min 1' } })}
          />
          <SelectField
            label="Term Unit"
            options={[
              { value: 'years', label: 'Years' },
              { value: 'months', label: 'Months' },
            ]}
            {...register('termUnit')}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-secondary to-accent text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
        >
          Calculate Loan
        </button>
      </form>

      {results && <ResultsDisplay results={results} title="Loan Results" />}
      <RelatedCalculators category="finance" currentSlug="loan-calculator" />
    </div>
  );
}
