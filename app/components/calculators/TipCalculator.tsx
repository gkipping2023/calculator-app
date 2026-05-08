'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '@/app/components/InputField';
import SelectField from '@/app/components/SelectField';
import ResultsDisplay from '@/app/components/ResultsDisplay';
import RelatedCalculators from '@/app/components/RelatedCalculators';

interface Inputs {
  billAmount: number;
  tipPercent: number;
  splitCount: number;
}

export default function TipCalculator() {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
    defaultValues: { billAmount: 50, tipPercent: 18, splitCount: 1 },
  });
  const [results, setResults] = useState<Record<string, string> | null>(null);

  const onSubmit = (data: Inputs) => {
    const tip = (data.billAmount * data.tipPercent) / 100;
    const total = data.billAmount + tip;
    const perPerson = total / data.splitCount;
    const tipPerPerson = tip / data.splitCount;

    setResults({
      'Tip Amount': `$${tip.toFixed(2)}`,
      'Total Bill': `$${total.toFixed(2)}`,
      'Per Person': `$${perPerson.toFixed(2)}`,
      'Tip Per Person': `$${tipPerPerson.toFixed(2)}`,
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="Bill Amount ($)"
          type="number"
          step="0.01"
          placeholder="50.00"
          error={errors.billAmount}
          {...register('billAmount', { required: 'Required', min: { value: 0.01, message: 'Must be > 0' } })}
        />
        <SelectField
          label="Tip Percentage"
          options={[
            { value: '10', label: '10% (Poor)' },
            { value: '15', label: '15% (Fair)' },
            { value: '18', label: '18% (Good)' },
            { value: '20', label: '20% (Great)' },
            { value: '25', label: '25% (Excellent)' },
            { value: '30', label: '30% (Exceptional)' },
          ]}
          {...register('tipPercent')}
        />
        <InputField
          label="Split Between (people)"
          type="number"
          placeholder="1"
          error={errors.splitCount}
          {...register('splitCount', { required: 'Required', min: { value: 1, message: 'Min 1 person' } })}
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-secondary to-accent text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
        >
          Calculate Tip
        </button>
      </form>

      {results && <ResultsDisplay results={results} title="Tip Results" />}
      <RelatedCalculators category="utility" currentSlug="tip-calculator" />
    </div>
  );
}
