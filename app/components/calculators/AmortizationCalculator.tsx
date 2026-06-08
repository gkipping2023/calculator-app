'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '@/app/components/InputField';
import ResultsDisplay from '@/app/components/ResultsDisplay';

interface AmortizationInputs {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
}

export default function AmortizationCalculator() {
  const { register, handleSubmit } = useForm<AmortizationInputs>({
    defaultValues: {
      loanAmount: 300000,
      interestRate: 6.5,
      loanTerm: 30,
    },
  });

  const [results, setResults] = useState<Record<string, string> | null>(null);

  const onSubmit = (data: AmortizationInputs) => {
    const monthlyRate = data.interestRate / 100 / 12;
    const numPayments = data.loanTerm * 12;

    const monthlyPayment =
      (data.loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);

    const totalPaid = monthlyPayment * numPayments;
    const totalInterest = totalPaid - data.loanAmount;

    // First and last month breakdown
    const firstMonthInterest = data.loanAmount * monthlyRate;
    const firstMonthPrincipal = monthlyPayment - firstMonthInterest;

    let remainingBalance = data.loanAmount;
    for (let i = 0; i < numPayments - 1; i++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;
    }

    const lastMonthInterest = remainingBalance * monthlyRate;
    const lastMonthPrincipal = monthlyPayment - lastMonthInterest;

    setResults({
      'Loan Amount': `$${data.loanAmount.toFixed(2)}`,
      'Interest Rate': `${data.interestRate.toFixed(2)}%`,
      'Loan Term': `${data.loanTerm} years`,
      'Monthly Payment': `$${monthlyPayment.toFixed(2)}`,
      'Total Amount Paid': `$${totalPaid.toFixed(2)}`,
      'Total Interest': `$${totalInterest.toFixed(2)}`,
      'First Month Interest': `$${firstMonthInterest.toFixed(2)}`,
      'First Month Principal': `$${firstMonthPrincipal.toFixed(2)}`,
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="Loan Amount ($)"
          type="number"
          {...register('loanAmount', { required: true, min: 1000 })}
          placeholder="300000"
        />
        <InputField
          label="Annual Interest Rate (%)"
          type="number"
          step="0.01"
          {...register('interestRate', { required: true, min: 0, max: 25 })}
          placeholder="6.5"
        />
        <InputField
          label="Loan Term (years)"
          type="number"
          {...register('loanTerm', { required: true, min: 1, max: 50 })}
          placeholder="30"
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-secondary to-accent text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
        >
          Create Amortization Schedule
        </button>
      </form>

      {results && <ResultsDisplay results={results} title="Amortization Details" />}
    </div>
  );
}
