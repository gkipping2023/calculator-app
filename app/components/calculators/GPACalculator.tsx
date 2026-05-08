'use client';

import { useState } from 'react';
import InputField from '@/app/components/InputField';
import SelectField from '@/app/components/SelectField';
import ResultsDisplay from '@/app/components/ResultsDisplay';
import RelatedCalculators from '@/app/components/RelatedCalculators';

interface Course {
  name: string;
  grade: string;
  credits: number;
}

const GRADE_POINTS: Record<string, number> = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0, 'D-': 0.7,
  'F': 0.0,
};

const GRADE_OPTIONS = Object.keys(GRADE_POINTS).map((g) => ({ value: g, label: g }));

export default function GPACalculator() {
  const [courses, setCourses] = useState<Course[]>([
    { name: 'Course 1', grade: 'A', credits: 3 },
    { name: 'Course 2', grade: 'B+', credits: 3 },
    { name: 'Course 3', grade: 'A-', credits: 4 },
  ]);
  const [results, setResults] = useState<Record<string, string> | null>(null);

  const addCourse = () =>
    setCourses((prev) => [...prev, { name: `Course ${prev.length + 1}`, grade: 'B', credits: 3 }]);

  const removeCourse = (index: number) =>
    setCourses((prev) => prev.filter((_, i) => i !== index));

  const updateCourse = (index: number, field: keyof Course, value: string | number) =>
    setCourses((prev) => prev.map((c, i) => (i === index ? { ...c, [field]: value } : c)));

  const calculate = () => {
    const totalCredits = courses.reduce((sum, c) => sum + Number(c.credits), 0);
    const totalPoints = courses.reduce(
      (sum, c) => sum + (GRADE_POINTS[c.grade] ?? 0) * Number(c.credits),
      0
    );
    const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;

    setResults({
      'GPA': gpa.toFixed(2),
      'Total Credits': totalCredits.toString(),
      'Quality Points': totalPoints.toFixed(1),
      'Courses': courses.length.toString(),
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {courses.map((course, i) => (
          <div key={i} className="grid grid-cols-12 gap-2 items-end">
            <div className="col-span-5">
              <InputField
                label={i === 0 ? 'Course Name' : ''}
                type="text"
                value={course.name}
                onChange={(e) => updateCourse(i, 'name', e.target.value)}
              />
            </div>
            <div className="col-span-3">
              <SelectField
                label={i === 0 ? 'Grade' : ''}
                options={GRADE_OPTIONS}
                value={course.grade}
                onChange={(e) => updateCourse(i, 'grade', e.target.value)}
              />
            </div>
            <div className="col-span-3">
              <InputField
                label={i === 0 ? 'Credits' : ''}
                type="number"
                min={1}
                max={6}
                value={course.credits}
                onChange={(e) => updateCourse(i, 'credits', Number(e.target.value))}
              />
            </div>
            <div className="col-span-1 pb-0.5">
              <button
                onClick={() => removeCourse(i)}
                className="w-full py-2.5 text-red-400 hover:text-red-500 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-red-50 dark:hover:bg-red-900/20 transition text-sm"
                aria-label="Remove course"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={addCourse}
          className="flex-1 py-2 border-2 border-dashed border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 rounded-lg hover:border-secondary hover:text-secondary transition text-sm"
        >
          + Add Course
        </button>
        <button
          onClick={calculate}
          className="flex-1 bg-gradient-to-r from-secondary to-accent text-white py-2 rounded-lg font-semibold hover:shadow-lg transition"
        >
          Calculate GPA
        </button>
      </div>

      {results && <ResultsDisplay results={results} title="GPA Results" />}
      <RelatedCalculators category="utility" currentSlug="gpa-calculator" />
    </div>
  );
}
