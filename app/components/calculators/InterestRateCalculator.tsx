'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '@/app/components/InputField';
import ResultsDisplay from '@/app/components/ResultsDisplay';

interface InterestRateInputs {
  principal: number;
  totalInterest: number;
  loanTerm: number;
}

export default function InterestRateCalculator() {
  const { register, handleSubmit } = useForm<InterestRateInputs>({
    defaultValues: {
      principal: 100000,
      totalInterest: 25000,
      loanTerm: 5,
    },
  });

  const [results, setResults] = useState<Record<string, string> | null>(null);

  const onSubmit = (data: InterestRateInputs) => {
    // Calculate annual interest rate
    // Total Interest = Principal * Rate * Time
    // Rate = Total Interest / (Principal * Time)
    const annualRate = (data.totalInterest / (data.principal * data.loanTerm)) * 100;
    const monthlyRate = annualRate / 12;

    const totalAmount = data.principal + data.totalInterest;
    const monthlyPayment = totalAmount / (data.loanTerm * 12);

    setResults({
      'Principal': `$${data.principal.toFixed(2)}`,
      'Total Interest': `$${data.totalInterest.toFixed(2)}`,
      'Total Amount': `$${totalAmount.toFixed(2)}`,
      'Annual Interest Rate': `${annualRate.toFixed(2)}%`,
      'Monthly Interest Rate': `${monthlyRate.toFixed(3)}%`,
      'Monthly Payment': `$${monthlyPayment.toFixed(2)}`,
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="Principal/Loan Amount ($)"
          type="number"
          {...register('principal', { required: true, min: 100 })}
          placeholder="100000"
        />
        <InputField
          label="Total Interest Paid ($)"
          type="number"
          {...register('totalInterest', { required: true, min: 0 })}
          placeholder="25000"
        />
        <InputField
          label="Loan Term (years)"
          type="number"
          {...register('loanTerm', { required: true, min: 1, max: 50 })}
          placeholder="5"
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-secondary to-accent text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
        >
          Calculate Interest Rate
        </button>
      </form>

      {results && <ResultsDisplay results={results} title="Interest Rate" />}
    </div>
  );
}
