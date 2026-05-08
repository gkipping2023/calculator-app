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
  goal: string;
}

const ACTIVITY_MULTIPLIERS: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  veryActive: 1.9,
};

const GOAL_ADJUSTMENTS: Record<string, number> = {
  lose2: -1000,
  lose1: -500,
  maintain: 0,
  gain1: 500,
  gain2: 1000,
};

export default function DailyCaloriesCalculator() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({
    defaultValues: {
      age: 30, weight: 70, height: 175, gender: 'male',
      unit: 'metric', activityLevel: 'moderate', goal: 'maintain',
    },
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

    const bmr =
      data.gender === 'male'
        ? 10 * weightKg + 6.25 * heightCm - 5 * data.age + 5
        : 10 * weightKg + 6.25 * heightCm - 5 * data.age - 161;

    const tdee = bmr * (ACTIVITY_MULTIPLIERS[data.activityLevel] ?? 1.55);
    const target = tdee + (GOAL_ADJUSTMENTS[data.goal] ?? 0);

    setResults({
      'Daily Calorie Target': `${Math.round(target)} kcal`,
      'TDEE (Maintenance)': `${Math.round(tdee)} kcal`,
      'Protein Goal': `${Math.round((target * 0.3) / 4)}g`,
      'Carbs Goal': `${Math.round((target * 0.4) / 4)}g`,
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
            {...register('age', { required: 'Required', min: { value: 10, message: 'Min 10' } })}
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
        <SelectField
          label="Goal"
          options={[
            { value: 'lose2', label: 'Lose 2 lbs/week (aggressive)' },
            { value: 'lose1', label: 'Lose 1 lb/week' },
            { value: 'maintain', label: 'Maintain Weight' },
            { value: 'gain1', label: 'Gain 1 lb/week' },
            { value: 'gain2', label: 'Gain 2 lbs/week' },
          ]}
          {...register('goal')}
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-secondary to-accent text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
        >
          Calculate Daily Calories
        </button>
      </form>

      {results && <ResultsDisplay results={results} title="Daily Caloric Needs" />}
      <RelatedCalculators category="health" currentSlug="daily-caloric-needs-calculator" />
    </div>
  );
}
