'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '@/app/components/InputField';
import ResultsDisplay from '@/app/components/ResultsDisplay';

interface PaceInputs {
  distance: number;
  distanceUnit: 'miles' | 'kilometers';
  minutes: number;
  seconds: number;
}

export default function PaceCalculator() {
  const { register, handleSubmit } = useForm<PaceInputs>({
    defaultValues: {
      distance: 5,
      distanceUnit: 'miles',
      minutes: 40,
      seconds: 0,
    },
  });

  const [results, setResults] = useState<Record<string, string> | null>(null);

  const onSubmit = (data: PaceInputs) => {
    // Convert distance to miles if in kilometers
    let distanceInMiles = data.distance;
    if (data.distanceUnit === 'kilometers') {
      distanceInMiles = data.distance / 1.60934;
    }

    // Total time in minutes
    const totalMinutes = data.minutes + data.seconds / 60;

    // Pace per mile in minutes
    const pacePerMile = totalMinutes / distanceInMiles;
    const paceMinutes = Math.floor(pacePerMile);
    const paceSeconds = Math.round((pacePerMile - paceMinutes) * 60);

    // Speed in mph
    const speedMph = (distanceInMiles / totalMinutes) * 60;
    const speedKmh = speedMph * 1.60934;

    setResults({
      'Distance': `${data.distance} ${data.distanceUnit}`,
      'Total Time': `${data.minutes}m ${data.seconds}s`,
      'Pace per Mile': `${paceMinutes}:${paceSeconds.toString().padStart(2, '0')} min/mile`,
      'Speed': `${speedMph.toFixed(2)} mph`,
      'Speed (km/h)': `${speedKmh.toFixed(2)} km/h`,
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="Distance"
          type="number"
          step="0.1"
          {...register('distance', { required: true, min: 0.1 })}
          placeholder="5"
        />
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Distance Unit
          </label>
          <select
            {...register('distanceUnit')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition dark:bg-slate-700 dark:border-slate-600"
          >
            <option value="miles">Miles</option>
            <option value="kilometers">Kilometers</option>
          </select>
        </div>
        <InputField
          label="Minutes"
          type="number"
          {...register('minutes', { required: true, min: 0, max: 999 })}
          placeholder="40"
        />
        <InputField
          label="Seconds"
          type="number"
          {...register('seconds', { required: true, min: 0, max: 59 })}
          placeholder="0"
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-secondary to-accent text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
        >
          Calculate Pace
        </button>
      </form>

      {results && <ResultsDisplay results={results} title="Running Pace" />}
    </div>
  );
}
