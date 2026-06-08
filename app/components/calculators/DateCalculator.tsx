'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '@/app/components/InputField';
import ResultsDisplay from '@/app/components/ResultsDisplay';

interface DateInputs {
  startDate: string;
  endDate: string;
}

export default function DateCalculator() {
  const { register, handleSubmit } = useForm<DateInputs>({
    defaultValues: {
      startDate: '2024-01-01',
      endDate: '2024-12-31',
    },
  });

  const [results, setResults] = useState<Record<string, string> | null>(null);

  const onSubmit = (data: DateInputs) => {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);

    if (start > end) {
      alert('Start date must be before end date');
      return;
    }

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30.44);
    const diffYears = Math.floor(diffDays / 365.25);

    const remainingDays = diffDays - diffWeeks * 7;

    setResults({
      'Start Date': start.toLocaleDateString(),
      'End Date': end.toLocaleDateString(),
      'Total Days': `${diffDays}`,
      'Total Weeks': `${diffWeeks}`,
      'Total Months': `${diffMonths}`,
      'Total Years': `${diffYears}`,
      'Weeks & Days': `${diffWeeks}w ${remainingDays}d`,
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="Start Date"
          type="date"
          {...register('startDate', { required: true })}
        />
        <InputField
          label="End Date"
          type="date"
          {...register('endDate', { required: true })}
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-secondary to-accent text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
        >
          Calculate Date Difference
        </button>
      </form>

      {results && <ResultsDisplay results={results} title="Date Difference" />}
    </div>
  );
}
