'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '@/app/components/InputField';
import ResultsDisplay from '@/app/components/ResultsDisplay';

interface BMRInputs {
  age: number;
  weight: number;
  height: number;
  gender: 'male' | 'female';
}

export default function BMRCalculator() {
  const { register, handleSubmit } = useForm<BMRInputs>({
    defaultValues: {
      age: 30,
      weight: 180,
      height: 70,
      gender: 'male',
    },
  });

  const [results, setResults] = useState<Record<string, string> | null>(null);

  const onSubmit = (data: BMRInputs) => {
    // Using Mifflin-St Jeor Formula (more accurate than Harris-Benedict)
    let bmr: number;

    if (data.gender === 'male') {
      // For men: (10 × weight in kg) + (6.25 × height in cm) − (5 × age in years) + 5
      const weightKg = data.weight * 0.453592;
      const heightCm = data.height * 2.54;
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * data.age + 5;
    } else {
      // For women: (10 × weight in kg) + (6.25 × height in cm) − (5 × age in years) − 161
      const weightKg = data.weight * 0.453592;
      const heightCm = data.height * 2.54;
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * data.age - 161;
    }

    // TDEE calculations with different activity levels
    const sedentary = bmr * 1.2;
    const lightActive = bmr * 1.375;
    const modActive = bmr * 1.55;
    const veryActive = bmr * 1.725;
    const extraActive = bmr * 1.9;

    setResults({
      'BMR (Basal Metabolic Rate)': `${bmr.toFixed(0)} cal/day`,
      'Sedentary (little exercise)': `${sedentary.toFixed(0)} cal/day`,
      'Light Activity (1-3 days/week)': `${lightActive.toFixed(0)} cal/day`,
      'Moderate Activity (3-5 days/week)': `${modActive.toFixed(0)} cal/day`,
      'Very Active (6-7 days/week)': `${veryActive.toFixed(0)} cal/day`,
      'Extra Active (2x per day)': `${extraActive.toFixed(0)} cal/day`,
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Gender
          </label>
          <select
            {...register('gender')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition dark:bg-slate-700 dark:border-slate-600"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <InputField
          label="Age (years)"
          type="number"
          {...register('age', { required: true, min: 15, max: 120 })}
          placeholder="30"
        />
        <InputField
          label="Weight (lbs)"
          type="number"
          {...register('weight', { required: true, min: 50, max: 500 })}
          placeholder="180"
        />
        <InputField
          label="Height (inches)"
          type="number"
          {...register('height', { required: true, min: 24, max: 108 })}
          placeholder="70"
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-secondary to-accent text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
        >
          Calculate BMR
        </button>
      </form>

      {results && <ResultsDisplay results={results} title="Basal Metabolic Rate (BMR)" />}
    </div>
  );
}
