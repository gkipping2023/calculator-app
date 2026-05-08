'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '@/app/components/InputField';
import SelectField from '@/app/components/SelectField';
import ResultsDisplay from '@/app/components/ResultsDisplay';
import RelatedCalculators from '@/app/components/RelatedCalculators';

interface Inputs {
  weight: number;
  height: number;
  unit: 'metric' | 'imperial';
}

function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal Weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}

export default function BMICalculator() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({
    defaultValues: { weight: 70, height: 175, unit: 'metric' },
  });

  const [results, setResults] = useState<Record<string, string> | null>(null);
  const unit = watch('unit');

  const onSubmit = (data: Inputs) => {
    let weightKg = data.weight;
    let heightM = data.height / 100;

    if (data.unit === 'imperial') {
      weightKg = data.weight * 0.453592; // lbs → kg
      heightM = data.height * 0.0254;    // inches → m
    }

    const bmi = weightKg / (heightM * heightM);
    const category = getBMICategory(bmi);

    setResults({
      'BMI': bmi.toFixed(1),
      'Category': category,
      'Healthy Range': `18.5 – 24.9`,
      'Your Weight': data.unit === 'metric' ? `${data.weight} kg` : `${data.weight} lbs`,
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
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-secondary to-accent text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
        >
          Calculate BMI
        </button>
      </form>

      {results && <ResultsDisplay results={results} title="BMI Results" />}

      {/* BMI Scale Info */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
        <h3 className="font-semibold text-sm text-slate-700 dark:text-slate-300 mb-2">BMI Scale</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {[
            { range: '< 18.5', label: 'Underweight', color: 'text-blue-500' },
            { range: '18.5 – 24.9', label: 'Normal', color: 'text-green-500' },
            { range: '25 – 29.9', label: 'Overweight', color: 'text-yellow-500' },
            { range: '≥ 30', label: 'Obese', color: 'text-red-500' },
          ].map((item) => (
            <div key={item.label} className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">{item.range}</span>
              <span className={item.color + ' font-medium'}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <RelatedCalculators category="health" currentSlug="bmi-calculator" />
    </div>
  );
}
