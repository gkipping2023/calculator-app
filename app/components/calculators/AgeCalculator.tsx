'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '@/app/components/InputField';
import ResultsDisplay from '@/app/components/ResultsDisplay';
import RelatedCalculators from '@/app/components/RelatedCalculators';

interface Inputs {
  birthDate: string;
}

export default function AgeCalculator() {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const [results, setResults] = useState<Record<string, string> | null>(null);

  const onSubmit = (data: Inputs) => {
    const birth = new Date(data.birthDate);
    const today = new Date();

    if (birth > today) {
      setResults({ Error: 'Birth date cannot be in the future' });
      return;
    }

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday <= today) nextBirthday.setFullYear(today.getFullYear() + 1);
    const daysToNext = Math.floor((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    setResults({
      'Age': `${years} years, ${months} months, ${days} days`,
      'Total Days': totalDays.toLocaleString(),
      'Total Weeks': totalWeeks.toLocaleString(),
      'Next Birthday In': `${daysToNext} days`,
    });
  };

  const maxDate = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="Date of Birth"
          type="date"
          max={maxDate}
          error={errors.birthDate}
          {...register('birthDate', { required: 'Please enter your birth date' })}
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-secondary to-accent text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
        >
          Calculate Age
        </button>
      </form>

      {results && <ResultsDisplay results={results} title="Age Results" />}
      <RelatedCalculators category="utility" currentSlug="age-calculator" />
    </div>
  );
}
