'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '@/app/components/InputField';
import SelectField from '@/app/components/SelectField';
import ResultsDisplay from '@/app/components/ResultsDisplay';
import RelatedCalculators from '@/app/components/RelatedCalculators';

interface Inputs {
  age: number;
  weight: number;
  height: number;
  gender: 'male' | 'female';
  unit: 'metric' | 'imperial';
  activityLevel: string;
}

const ACTIVITY_MULTIPLIERS: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  veryActive: 1.9,
};

export default function CalorieCalculator() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({
    defaultValues: { age: 30, weight: 70, height: 175, gender: 'male', unit: 'metric', activityLevel: 'moderate' },
  });

  const [results, setResults] = useState<Record<string, string> | null>(null);
  const unit = watch('unit');

  const onSubmit = (data: Inputs) => {
    let weightKg = data.weight;
    let heightCm = data.height;

    if (data.unit === 'imperial') {
      weightKg = data.weight * 0.453592;
      heightCm = data.height * 2.54;
    }

    // Mifflin-St Jeor Equation
    let bmr =
      data.gender === 'male'
        ? 10 * weightKg + 6.25 * heightCm - 5 * data.age + 5
        : 10 * weightKg + 6.25 * heightCm - 5 * data.age - 161;

    const tdee = bmr * (ACTIVITY_MULTIPLIERS[data.activityLevel] ?? 1.55);

    setResults({
      'BMR (Base)': `${Math.round(bmr)} kcal/day`,
      'Maintenance (TDEE)': `${Math.round(tdee)} kcal/day`,
      'Weight Loss (–500)': `${Math.round(tdee - 500)} kcal/day`,
      'Weight Gain (+500)': `${Math.round(tdee + 500)} kcal/day`,
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <SelectField
          label="Unit System"
          options={[
            { value: 'metric', label: 'Metric (kg, cm)' },
            { value: 'imperial', label: 'Imperial (lbs, inches)' },
          ]}
          {...register('unit')}
        />
        <div className="grid grid-cols-2 gap-3">
          <SelectField
            label="Gender"
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
            ]}
            {...register('gender')}
          />
          <InputField
            label="Age (years)"
            type="number"
            placeholder="30"
            error={errors.age}
            {...register('age', { required: 'Required', min: { value: 10, message: 'Min 10' }, max: { value: 120, message: 'Max 120' } })}
          />
        </div>
        <InputField
          label={unit === 'imperial' ? 'Weight (lbs)' : 'Weight (kg)'}
          type="number"
          step="0.1"
          placeholder={unit === 'imperial' ? '154' : '70'}
          error={errors.weight}
          {...register('weight', { required: 'Required', min: { value: 1, message: 'Must be > 0' } })}
        />
        <InputField
          label={unit === 'imperial' ? 'Height (inches)' : 'Height (cm)'}
          type="number"
          step="0.1"
          placeholder={unit === 'imperial' ? '69' : '175'}
          error={errors.height}
          {...register('height', { required: 'Required', min: { value: 1, message: 'Must be > 0' } })}
        />
        <SelectField
          label="Activity Level"
          options={[
            { value: 'sedentary', label: 'Sedentary (little or no exercise)' },
            { value: 'light', label: 'Lightly Active (1–3 days/week)' },
            { value: 'moderate', label: 'Moderately Active (3–5 days/week)' },
            { value: 'active', label: 'Very Active (6–7 days/week)' },
            { value: 'veryActive', label: 'Extra Active (physical job)' },
          ]}
          {...register('activityLevel')}
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-secondary to-accent text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
        >
          Calculate Calories
        </button>
      </form>

      {results && <ResultsDisplay results={results} title="Calorie Results" />}
      <RelatedCalculators category="health" currentSlug="calorie-calculator" />
    </div>
  );
}
