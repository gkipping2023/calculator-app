'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '@/app/components/InputField';
import SelectField from '@/app/components/SelectField';
import ResultsDisplay from '@/app/components/ResultsDisplay';
import RelatedCalculators from '@/app/components/RelatedCalculators';

interface Inputs {
  height: number;
  gender: 'male' | 'female';
  unit: 'metric' | 'imperial';
}

export default function IdealWeightCalculator() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({
    defaultValues: { height: 175, gender: 'male', unit: 'metric' },
  });

  const [results, setResults] = useState<Record<string, string> | null>(null);
  const unit = watch('unit');

  const onSubmit = (data: Inputs) => {
    let heightCm = data.height;
    if (data.unit === 'imperial') heightCm = data.height * 2.54;

    const heightIn = heightCm / 2.54;

    // Robinson Formula (kg)
    const robinson =
      data.gender === 'male'
        ? 52 + 1.9 * (heightIn - 60)
        : 49 + 1.7 * (heightIn - 60);

    // Miller Formula (kg)
    const miller =
      data.gender === 'male'
        ? 56.2 + 1.41 * (heightIn - 60)
        : 53.1 + 1.36 * (heightIn - 60);

    // Devine Formula (kg)
    const devine =
      data.gender === 'male'
        ? 50 + 2.3 * (heightIn - 60)
        : 45.5 + 2.3 * (heightIn - 60);

    const avg = (robinson + miller + devine) / 3;

    const fmt = (kg: number) =>
      data.unit === 'imperial'
        ? `${(kg * 2.205).toFixed(1)} lbs`
        : `${kg.toFixed(1)} kg`;

    setResults({
      'Ideal Weight (avg)': fmt(avg),
      'Robinson Formula': fmt(robinson),
      'Devine Formula': fmt(devine),
      'Miller Formula': fmt(miller),
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <SelectField
          label="Unit System"
          options={[
            { value: 'metric', label: 'Metric (cm)' },
            { value: 'imperial', label: 'Imperial (inches)' },
          ]}
          {...register('unit')}
        />
        <SelectField
          label="Gender"
          options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
          ]}
          {...register('gender')}
        />
        <InputField
          label={unit === 'imperial' ? 'Height (inches)' : 'Height (cm)'}
          type="number"
          step="0.1"
          placeholder={unit === 'imperial' ? '69' : '175'}
          error={errors.height}
          {...register('height', { required: 'Required', min: { value: 1, message: 'Must be > 0' } })}
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-secondary to-accent text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
        >
          Calculate Ideal Weight
        </button>
      </form>

      {results && <ResultsDisplay results={results} title="Ideal Weight Results" />}
      <RelatedCalculators category="health" currentSlug="ideal-weight-calculator" />
    </div>
  );
}
