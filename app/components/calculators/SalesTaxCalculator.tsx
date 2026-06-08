'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '@/app/components/InputField';
import ResultsDisplay from '@/app/components/ResultsDisplay';

interface SalesTaxInputs {
  amount: number;
  taxRate: number;
}

export default function SalesTaxCalculator() {
  const { register, handleSubmit } = useForm<SalesTaxInputs>({
    defaultValues: {
      amount: 100,
      taxRate: 7.5,
    },
  });

  const [results, setResults] = useState<Record<string, string> | null>(null);

  const onSubmit = (data: SalesTaxInputs) => {
    const taxAmount = (data.amount * data.taxRate) / 100;
    const totalWithTax = data.amount + taxAmount;

    setResults({
      'Subtotal': `$${data.amount.toFixed(2)}`,
      'Sales Tax': `$${taxAmount.toFixed(2)}`,
      'Total with Tax': `$${totalWithTax.toFixed(2)}`,
      'Tax Rate': `${data.taxRate.toFixed(2)}%`,
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="Purchase Amount ($)"
          type="number"
          step="0.01"
          {...register('amount', { required: true, min: 0 })}
          placeholder="100"
        />
        <InputField
          label="Sales Tax Rate (%)"
          type="number"
          step="0.01"
          {...register('taxRate', { required: true, min: 0, max: 50 })}
          placeholder="7.5"
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-secondary to-accent text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
        >
          Calculate Sales Tax
        </button>
      </form>

      {results && <ResultsDisplay results={results} title="Sales Tax Breakdown" />}
    </div>
  );
}
