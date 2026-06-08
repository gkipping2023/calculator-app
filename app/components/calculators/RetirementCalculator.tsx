'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '@/app/components/InputField';
import ResultsDisplay from '@/app/components/ResultsDisplay';

interface RetirementInputs {
  currentAge: number;
  retirementAge: number;
  currentSavings: number;
  monthlyContribution: number;
  annualReturn: number;
  yearsInRetirement: number;
}

export default function RetirementCalculator() {
  const { register, handleSubmit, watch } = useForm<RetirementInputs>({
    defaultValues: {
      currentAge: 35,
      retirementAge: 65,
      currentSavings: 100000,
      monthlyContribution: 500,
      annualReturn: 7,
      yearsInRetirement: 25,
    },
  });

  const [results, setResults] = useState<Record<string, string> | null>(null);

  const onSubmit = (data: RetirementInputs) => {
    const yearsToRetirement = data.retirementAge - data.currentAge;
    const monthsToRetirement = yearsToRetirement * 12;
    const monthlyRate = data.annualReturn / 100 / 12;

    // Future value of current savings
    const fvCurrentSavings = data.currentSavings * Math.pow(1 + monthlyRate, monthsToRetirement);

    // Future value of monthly contributions
    const fvContributions =
      data.monthlyContribution * (Math.pow(1 + monthlyRate, monthsToRetirement) - 1) / monthlyRate;

    const totalAtRetirement = fvCurrentSavings + fvContributions;

    // Annual needs in retirement (assuming 4% withdrawal rate)
    const annualWithdrawal = totalAtRetirement / data.yearsInRetirement;

    const monthlyInRetirement = annualWithdrawal / 12;

    setResults({
      'Savings at Retirement': `$${totalAtRetirement.toFixed(2)}`,
      'Annual Retirement Income': `$${annualWithdrawal.toFixed(2)}`,
      'Monthly Retirement Income': `$${monthlyInRetirement.toFixed(2)}`,
      'Years in Retirement': `${data.yearsInRetirement}`,
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="Current Age"
          type="number"
          {...register('currentAge', { required: true, min: 18, max: 100 })}
          placeholder="35"
        />
        <InputField
          label="Retirement Age"
          type="number"
          {...register('retirementAge', { required: true, min: 50, max: 100 })}
          placeholder="65"
        />
        <InputField
          label="Current Savings ($)"
          type="number"
          {...register('currentSavings', { required: true, min: 0 })}
          placeholder="100000"
        />
        <InputField
          label="Monthly Contribution ($)"
          type="number"
          {...register('monthlyContribution', { required: true, min: 0 })}
          placeholder="500"
        />
        <InputField
          label="Annual Return (%)"
          type="number"
          step="0.1"
          {...register('annualReturn', { required: true, min: 0, max: 50 })}
          placeholder="7"
        />
        <InputField
          label="Years in Retirement"
          type="number"
          {...register('yearsInRetirement', { required: true, min: 1, max: 60 })}
          placeholder="25"
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-secondary to-accent text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
        >
          Calculate Retirement Savings
        </button>
      </form>

      {results && <ResultsDisplay results={results} title="Retirement Plan" />}
    </div>
  );
}
