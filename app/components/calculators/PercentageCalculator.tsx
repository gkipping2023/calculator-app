'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '@/app/components/InputField';
import ResultsDisplay from '@/app/components/ResultsDisplay';
import RelatedCalculators from '@/app/components/RelatedCalculators';

interface PercentInputs {
  value: number;
  percent: number;
}

interface ChangeInputs {
  from: number;
  to: number;
}

export default function PercentageCalculator() {
  const form1 = useForm<PercentInputs>({ defaultValues: { value: 200, percent: 15 } });
  const form2 = useForm<ChangeInputs>({ defaultValues: { from: 80, to: 100 } });

  const [result1, setResult1] = useState<Record<string, string> | null>(null);
  const [result2, setResult2] = useState<Record<string, string> | null>(null);

  const onSubmit1 = (data: PercentInputs) => {
    const amount = (data.value * data.percent) / 100;
    setResult1({
      'Result': `${amount.toFixed(2)}`,
      'Calculation': `${data.percent}% of ${data.value}`,
      'Remaining': `${(data.value - amount).toFixed(2)}`,
      'Total + Percent': `${(data.value + amount).toFixed(2)}`,
    });
  };

  const onSubmit2 = (data: ChangeInputs) => {
    const change = ((data.to - data.from) / Math.abs(data.from)) * 100;
    const diff = data.to - data.from;
    setResult2({
      'Percentage Change': `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`,
      'Absolute Change': `${diff >= 0 ? '+' : ''}${diff.toFixed(2)}`,
      'From': data.from.toString(),
      'To': data.to.toString(),
    });
  };

  return (
    <div className="space-y-8">
      {/* What is X% of Y */}
      <div className="space-y-4">
        <h3 className="font-semibold text-slate-700 dark:text-slate-300">
          What is X% of Y?
        </h3>
        <form onSubmit={form1.handleSubmit(onSubmit1)} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="Percentage (%)"
              type="number"
              step="0.01"
              placeholder="15"
              {...form1.register('percent', { required: 'Required' })}
            />
            <InputField
              label="Of Value"
              type="number"
              step="0.01"
              placeholder="200"
              {...form1.register('value', { required: 'Required' })}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-secondary to-accent text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
          >
            Calculate
          </button>
        </form>
        {result1 && <ResultsDisplay results={result1} title="Percentage Result" />}
      </div>

      <div className="border-t border-slate-200 dark:border-slate-700 pt-6 space-y-4">
        <h3 className="font-semibold text-slate-700 dark:text-slate-300">
          Percentage Change (from → to)
        </h3>
        <form onSubmit={form2.handleSubmit(onSubmit2)} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="From"
              type="number"
              step="0.01"
              placeholder="80"
              {...form2.register('from', { required: 'Required' })}
            />
            <InputField
              label="To"
              type="number"
              step="0.01"
              placeholder="100"
              {...form2.register('to', { required: 'Required' })}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-secondary to-accent text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
          >
            Calculate Change
          </button>
        </form>
        {result2 && <ResultsDisplay results={result2} title="Percentage Change" />}
      </div>

      <RelatedCalculators category="utility" currentSlug="percentage-calculator" />
    </div>
  );
}
