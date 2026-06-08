'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '@/app/components/InputField';
import ResultsDisplay from '@/app/components/ResultsDisplay';

interface HoursInputs {
  startTime: string;
  endTime: string;
  includeBreak: boolean;
  breakMinutes: number;
}

export default function HoursCalculator() {
  const { register, handleSubmit, watch } = useForm<HoursInputs>({
    defaultValues: {
      startTime: '09:00',
      endTime: '17:00',
      includeBreak: true,
      breakMinutes: 30,
    },
  });

  const [results, setResults] = useState<Record<string, string> | null>(null);
  const includeBreak = watch('includeBreak');

  const onSubmit = (data: HoursInputs) => {
    const [startHour, startMin] = data.startTime.split(':').map(Number);
    const [endHour, endMin] = data.endTime.split(':').map(Number);

    let startTotalMin = startHour * 60 + startMin;
    let endTotalMin = endHour * 60 + endMin;

    // Handle overnight shifts
    if (endTotalMin <= startTotalMin) {
      endTotalMin += 24 * 60;
    }

    let workMinutes = endTotalMin - startTotalMin;

    if (data.includeBreak) {
      workMinutes -= data.breakMinutes;
    }

    const hours = Math.floor(workMinutes / 60);
    const minutes = workMinutes % 60;
    const totalHours = (workMinutes / 60).toFixed(2);

    setResults({
      'Start Time': data.startTime,
      'End Time': data.endTime,
      'Break Duration': data.includeBreak ? `${data.breakMinutes} minutes` : 'None',
      'Total Work Time': `${hours}h ${minutes}m`,
      'Total Hours (Decimal)': `${totalHours}`,
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="Start Time"
          type="time"
          {...register('startTime', { required: true })}
        />
        <InputField
          label="End Time"
          type="time"
          {...register('endTime', { required: true })}
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="includeBreak"
            {...register('includeBreak')}
            className="w-4 h-4 text-secondary rounded focus:ring-2 focus:ring-secondary"
          />
          <label
            htmlFor="includeBreak"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Include Break Time
          </label>
        </div>
        {includeBreak && (
          <InputField
            label="Break Duration (minutes)"
            type="number"
            {...register('breakMinutes', { required: includeBreak, min: 0, max: 480 })}
            placeholder="30"
          />
        )}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-secondary to-accent text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
        >
          Calculate Hours
        </button>
      </form>

      {results && <ResultsDisplay results={results} title="Hours Worked" />}
    </div>
  );
}
