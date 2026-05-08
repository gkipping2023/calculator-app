'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '@/app/components/InputField';
import SelectField from '@/app/components/SelectField';
import ResultsDisplay from '@/app/components/ResultsDisplay';
import RelatedCalculators from '@/app/components/RelatedCalculators';

interface Inputs {
  principal: number;
  rate: number;
  time: number;
  frequency: string;
}

const FREQ_MAP: Record<string, number> = {
  annually: 1,
  semiannually: 2,
  quarterly: 4,
  monthly: 12,
  daily: 365,
};

export default function CompoundInterestCalculator() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { principal: 10000, rate: 7.0, time: 10, frequency: 'annually' },
  });

  const [results, setResults] = useState<Record<string, string> | null>(null);

  const onSubmit = (data: Inputs) => {
    const n = FREQ_MAP[data.frequency] ?? 1;
    const r = data.rate / 100;
    const total = data.principal * Math.pow(1 + r / n, n * data.time);
    const interest = total - data.principal;

    setResults({
      'Final Balance': `$${total.toFixed(2)}`,
      'Interest Earned': `$${interest.toFixed(2)}`,
      'Principal': `$${Number(data.principal).toLocaleString()}`,
      'Growth': `${((interest / data.principal) * 100).toFixed(1)}%`,
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="Principal Amount ($)"
          type="number"
          placeholder="10000"
          error={errors.principal}
          {...register('principal', { required: 'Required', min: { value: 1, message: 'Must be > 0' } })}
        />
        <InputField
          label="Annual Interest Rate (%)"
          type="number"
          step="0.01"
          placeholder="7.0"
          error={errors.rate}
          {...register('rate', { required: 'Required', min: { value: 0, message: 'Must be ≥ 0' } })}
        />
        <InputField
          label="Time Period (years)"
          type="number"
          placeholder="10"
          error={errors.time}
          {...register('time', { required: 'Required', min: { value: 1, message: 'Min 1 year' } })}
        />
        <SelectField
          label="Compounding Frequency"
          options={[
            { value: 'annually', label: 'Annually' },
            { value: 'semiannually', label: 'Semi-Annually' },
            { value: 'quarterly', label: 'Quarterly' },
            { value: 'monthly', label: 'Monthly' },
            { value: 'daily', label: 'Daily' },
          ]}
          {...register('frequency')}
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-secondary to-accent text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
        >
          Calculate Compound Interest
        </button>
      </form>

      {results && <ResultsDisplay results={results} title="Compound Interest Results" />}
      <RelatedCalculators category="finance" currentSlug="compound-interest-calculator" />
    </div>
  );
}
