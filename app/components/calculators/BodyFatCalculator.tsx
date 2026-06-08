'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '@/app/components/InputField';
import ResultsDisplay from '@/app/components/ResultsDisplay';

interface BodyFatInputs {
  height: number;
  weight: number;
  neck: number;
  waist: number;
  hip?: number;
  gender: 'male' | 'female';
}

export default function BodyFatCalculator() {
  const { register, handleSubmit, watch } = useForm<BodyFatInputs>({
    defaultValues: {
      height: 70,
      weight: 180,
      neck: 15,
      waist: 35,
      hip: 38,
      gender: 'male',
    },
  });

  const [results, setResults] = useState<Record<string, string> | null>(null);
  const gender = watch('gender');

  const onSubmit = (data: BodyFatInputs) => {
    // Using NASM body fat percentage formula (US Navy method)
    let bodyFat: number;

    if (data.gender === 'male') {
      // Male: 86.010 × log₁₀(waist - neck) − 70.041 × log₁₀(height) + 36.76
      const waistNeck = data.waist - data.neck;
      bodyFat =
        86.01 * Math.log10(waistNeck) - 70.041 * Math.log10(data.height) + 36.76;
    } else {
      // Female: 163.205 × log₁₀(waist + hip - neck) − 97.684 × log₁₀(height) − 78.387
      const waistHipNeck = data.waist + (data.hip || 0) - data.neck;
      bodyFat =
        163.205 * Math.log10(waistHipNeck) - 97.684 * Math.log10(data.height) - 78.387;
    }

    bodyFat = Math.max(0, bodyFat); // Ensure non-negative

    const leanMass = data.weight * (1 - bodyFat / 100);
    const fatMass = data.weight - leanMass;

    // Body Fat Category
    let category = '';
    if (data.gender === 'male') {
      if (bodyFat < 6) category = 'Essential Fat';
      else if (bodyFat < 14) category = 'Athletes';
      else if (bodyFat < 18) category = 'Fitness';
      else if (bodyFat < 25) category = 'Average';
      else category = 'Obese';
    } else {
      if (bodyFat < 13) category = 'Essential Fat';
      else if (bodyFat < 21) category = 'Athletes';
      else if (bodyFat < 25) category = 'Fitness';
      else if (bodyFat < 32) category = 'Average';
      else category = 'Obese';
    }

    setResults({
      'Body Fat Percentage': `${bodyFat.toFixed(2)}%`,
      'Body Fat Category': category,
      'Fat Mass': `${fatMass.toFixed(2)} lbs`,
      'Lean Mass': `${leanMass.toFixed(2)} lbs`,
      'Body Weight': `${data.weight.toFixed(2)} lbs`,
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
          label="Height (inches)"
          type="number"
          {...register('height', { required: true, min: 24, max: 108 })}
          placeholder="70"
        />
        <InputField
          label="Weight (lbs)"
          type="number"
          {...register('weight', { required: true, min: 50, max: 500 })}
          placeholder="180"
        />
        <InputField
          label="Neck Circumference (inches)"
          type="number"
          step="0.1"
          {...register('neck', { required: true, min: 8, max: 25 })}
          placeholder="15"
        />
        <InputField
          label="Waist Circumference (inches)"
          type="number"
          step="0.1"
          {...register('waist', { required: true, min: 15, max: 80 })}
          placeholder="35"
        />
        {gender === 'female' && (
          <InputField
            label="Hip Circumference (inches)"
            type="number"
            step="0.1"
            {...register('hip', { required: gender === 'female', min: 25, max: 100 })}
            placeholder="38"
          />
        )}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-secondary to-accent text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
        >
          Calculate Body Fat
        </button>
      </form>

      {results && <ResultsDisplay results={results} title="Body Fat Analysis" />}
    </div>
  );
}
