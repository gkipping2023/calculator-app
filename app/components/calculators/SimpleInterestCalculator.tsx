'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '@/app/components/InputField';
import ResultsDisplay from '@/app/components/ResultsDisplay';
import RelatedCalculators from '@/app/components/RelatedCalculators';

interface Inputs {
  principal: number;
  rate: number;
  time: number;
}

export default function SimpleInterestCalculator() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ defaultValues: { principal: 5000, rate: 4.0, time: 3 } });

  const [results, setResults] = useState<Record<string, string> | null>(null);

  const onSubmit = (data: Inputs) => {
    const interest = (data.principal * data.rate * data.time) / 100;
    const total = data.principal + interest;

    setResults({
      'Interest Earned': `$${interest.toFixed(2)}`,
      'Total Balance': `$${total.toFixed(2)}`,
      'Principal': `$${Number(data.principal).toLocaleString()}`,
      'Rate × Time': `${data.rate}% × ${data.time} yr`,
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="Principal Amount ($)"
          type="number"
          placeholder="5000"
          error={errors.principal}
          {...register('principal', { required: 'Required', min: { value: 1, message: 'Must be > 0' } })}
        />
        <InputField
          label="Annual Interest Rate (%)"
          type="number"
          step="0.01"
          placeholder="4.0"
          error={errors.rate}
          {...register('rate', { required: 'Required', min: { value: 0, message: 'Must be ≥ 0' } })}
        />
        <InputField
          label="Time Period (years)"
          type="number"
          step="0.5"
          placeholder="3"
          error={errors.time}
          {...register('time', { required: 'Required', min: { value: 0.1, message: 'Must be > 0' } })}
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-secondary to-accent text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
        >
          Calculate Interest
        </button>
      </form>

      {results && <ResultsDisplay results={results} title="Simple Interest Results" />}
      <RelatedCalculators category="finance" currentSlug="simple-interest-calculator" />
    </div>
  );
}
