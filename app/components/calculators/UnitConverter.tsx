'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '@/app/components/InputField';
import SelectField from '@/app/components/SelectField';
import ResultsDisplay from '@/app/components/ResultsDisplay';
import RelatedCalculators from '@/app/components/RelatedCalculators';

type Category = 'length' | 'weight' | 'temperature';

interface Inputs {
  value: number;
  fromUnit: string;
  toUnit: string;
  category: Category;
}

const UNITS: Record<Category, { value: string; label: string }[]> = {
  length: [
    { value: 'm', label: 'Meters' },
    { value: 'km', label: 'Kilometers' },
    { value: 'cm', label: 'Centimeters' },
    { value: 'mm', label: 'Millimeters' },
    { value: 'ft', label: 'Feet' },
    { value: 'in', label: 'Inches' },
    { value: 'yd', label: 'Yards' },
    { value: 'mi', label: 'Miles' },
  ],
  weight: [
    { value: 'kg', label: 'Kilograms' },
    { value: 'g', label: 'Grams' },
    { value: 'mg', label: 'Milligrams' },
    { value: 'lb', label: 'Pounds' },
    { value: 'oz', label: 'Ounces' },
    { value: 'ton', label: 'Metric Tons' },
  ],
  temperature: [
    { value: 'C', label: 'Celsius (°C)' },
    { value: 'F', label: 'Fahrenheit (°F)' },
    { value: 'K', label: 'Kelvin (K)' },
  ],
};

// Convert any unit to SI base, then to target
const LENGTH_TO_M: Record<string, number> = {
  m: 1, km: 1000, cm: 0.01, mm: 0.001,
  ft: 0.3048, in: 0.0254, yd: 0.9144, mi: 1609.344,
};
const WEIGHT_TO_KG: Record<string, number> = {
  kg: 1, g: 0.001, mg: 0.000001,
  lb: 0.453592, oz: 0.0283495, ton: 1000,
};

function convertValue(value: number, from: string, to: string, category: Category): number {
  if (category === 'temperature') {
    // To Celsius first
    let celsius =
      from === 'C' ? value
      : from === 'F' ? (value - 32) * (5 / 9)
      : value - 273.15;
    // From Celsius to target
    if (to === 'C') return celsius;
    if (to === 'F') return celsius * (9 / 5) + 32;
    return celsius + 273.15;
  }

  const table = category === 'length' ? LENGTH_TO_M : WEIGHT_TO_KG;
  const inSI = value * (table[from] ?? 1);
  return inSI / (table[to] ?? 1);
}

export default function UnitConverter() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({
    defaultValues: { value: 1, fromUnit: 'm', toUnit: 'ft', category: 'length' },
  });

  const [results, setResults] = useState<Record<string, string> | null>(null);
  const category = watch('category') as Category;

  const onSubmit = (data: Inputs) => {
    const converted = convertValue(data.value, data.fromUnit, data.toUnit, data.category);
    setResults({
      'Result': `${converted.toPrecision(6)} ${data.toUnit}`,
      'Input': `${data.value} ${data.fromUnit}`,
      'Category': data.category.charAt(0).toUpperCase() + data.category.slice(1),
      'Formula': `${data.value} ${data.fromUnit} = ${converted.toFixed(4)} ${data.toUnit}`,
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <SelectField
          label="Category"
          options={[
            { value: 'length', label: 'Length' },
            { value: 'weight', label: 'Weight / Mass' },
            { value: 'temperature', label: 'Temperature' },
          ]}
          {...register('category')}
        />
        <InputField
          label="Value to Convert"
          type="number"
          step="any"
          placeholder="1"
          error={errors.value}
          {...register('value', { required: 'Required' })}
        />
        <div className="grid grid-cols-2 gap-3">
          <SelectField
            label="From"
            options={UNITS[category] ?? UNITS.length}
            {...register('fromUnit')}
          />
          <SelectField
            label="To"
            options={UNITS[category] ?? UNITS.length}
            {...register('toUnit')}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-secondary to-accent text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
        >
          Convert
        </button>
      </form>

      {results && <ResultsDisplay results={results} title="Conversion Result" />}
      <RelatedCalculators category="utility" currentSlug="unit-converter" />
    </div>
  );
}
