'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '@/app/components/InputField';
import ResultsDisplay from '@/app/components/ResultsDisplay';
import RelatedCalculators from '@/app/components/RelatedCalculators';

interface Inputs {
  initialAmount: number;
  annualReturn: number;
  years: number;
  monthlyContribution: number;
}

export default function InvestmentReturnCalculator() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { initialAmount: 10000, annualReturn: 8.0, years: 20, monthlyContribution: 200 },
  });

  const [results, setResults] = useState<Record<string, string> | null>(null);

  const onSubmit = (data: Inputs) => {
    const r = data.annualReturn / 100 / 12;
    const n = data.years * 12;

    // Future value of lump sum
    const fvLump = data.initialAmount * Math.pow(1 + r, n);

    // Future value of periodic contributions
    const fvContrib = r === 0
      ? data.monthlyContribution * n
      : data.monthlyContribution * ((Math.pow(1 + r, n) - 1) / r);

    const finalValue = fvLump + fvContrib;
    const totalContributed = data.initialAmount + data.monthlyContribution * n;
    const totalReturn = finalValue - totalContributed;
    const roi = (totalReturn / totalContributed) * 100;

    setResults({
      'Final Value': `$${finalValue.toFixed(2)}`,
      'Total Return': `$${totalReturn.toFixed(2)}`,
      'Total Contributed': `$${totalContributed.toFixed(2)}`,
      'ROI': `${roi.toFixed(1)}%`,
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="Initial Investment ($)"
          type="number"
          placeholder="10000"
          error={errors.initialAmount}
          {...register('initialAmount', { required: 'Required', min: { value: 0, message: 'Must be ≥ 0' } })}
        />
        <InputField
          label="Annual Return Rate (%)"
          type="number"
          step="0.1"
          placeholder="8.0"
          error={errors.annualReturn}
          {...register('annualReturn', { required: 'Required', min: { value: 0, message: 'Must be ≥ 0' } })}
        />
        <InputField
          label="Investment Period (years)"
          type="number"
          placeholder="20"
          error={errors.years}
          {...register('years', { required: 'Required', min: { value: 1, message: 'Min 1 year' } })}
        />
        <InputField
          label="Monthly Contribution ($)"
          type="number"
          placeholder="200"
          hint="Set to 0 for lump sum only"
          error={errors.monthlyContribution}
          {...register('monthlyContribution', { required: 'Required', min: { value: 0, message: 'Must be ≥ 0' } })}
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-secondary to-accent text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
        >
          Calculate Returns
        </button>
      </form>

      {results && <ResultsDisplay results={results} title="Investment Return Results" />}
      <RelatedCalculators category="finance" currentSlug="investment-return-calculator" />
    </div>
  );
}
