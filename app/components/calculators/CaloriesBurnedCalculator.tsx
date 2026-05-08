'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '@/app/components/InputField';
import SelectField from '@/app/components/SelectField';
import ResultsDisplay from '@/app/components/ResultsDisplay';
import RelatedCalculators from '@/app/components/RelatedCalculators';

interface Inputs {
  weight: number;
  duration: number;
  activity: string;
  unit: 'metric' | 'imperial';
}

// MET values for common activities
const ACTIVITIES = [
  { value: '8.0', label: 'Running (6 mph)' },
  { value: '7.0', label: 'Cycling (12–14 mph)' },
  { value: '6.0', label: 'Swimming (moderate)' },
  { value: '5.0', label: 'Aerobics (high impact)' },
  { value: '4.5', label: 'Brisk Walking (4 mph)' },
  { value: '3.5', label: 'Walking (3.5 mph)' },
  { value: '8.5', label: 'Jump Rope' },
  { value: '3.8', label: 'Yoga' },
  { value: '6.0', label: 'Weight Training' },
  { value: '10.0', label: 'Basketball' },
];

export default function CaloriesBurnedCalculator() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({
    defaultValues: { weight: 70, duration: 30, activity: '6.0', unit: 'metric' },
  });

  const [results, setResults] = useState<Record<string, string> | null>(null);
  const unit = watch('unit');

  const onSubmit = (data: Inputs) => {
    const weightKg = data.unit === 'imperial' ? data.weight * 0.453592 : data.weight;
    const met = parseFloat(data.activity);
    const calories = met * weightKg * (data.duration / 60);

    setResults({
      'Calories Burned': `${Math.round(calories)} kcal`,
      'Duration': `${data.duration} min`,
      'Intensity (MET)': met.toFixed(1),
      'Per Minute': `${(calories / data.duration).toFixed(1)} kcal/min`,
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <SelectField
          label="Unit System"
          options={[
            { value: 'metric', label: 'Metric (kg)' },
            { value: 'imperial', label: 'Imperial (lbs)' },
          ]}
          {...register('unit')}
        />
        <InputField
          label={unit === 'imperial' ? 'Weight (lbs)' : 'Weight (kg)'}
          type="number"
          step="0.1"
          placeholder={unit === 'imperial' ? '154' : '70'}
          error={errors.weight}
          {...register('weight', { required: 'Required', min: { value: 1, message: 'Must be > 0' } })}
        />
        <SelectField
          label="Activity"
          options={ACTIVITIES}
          {...register('activity')}
        />
        <InputField
          label="Duration (minutes)"
          type="number"
          placeholder="30"
          error={errors.duration}
          {...register('duration', { required: 'Required', min: { value: 1, message: 'Min 1 min' } })}
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-secondary to-accent text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
        >
          Calculate Calories Burned
        </button>
      </form>

      {results && <ResultsDisplay results={results} title="Calories Burned" />}
      <RelatedCalculators category="health" currentSlug="calories-burned-calculator" />
    </div>
  );
}
