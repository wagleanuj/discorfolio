'use client';

import { useState, useCallback, useEffect } from 'react';
import { FormData } from './types';
import { resumeSchema } from '@/lib/schema/resume.schema';
import FormSection from './FormSection';
import { Download, Upload } from 'lucide-react';
import { Resume } from '@/types/resume';
import { useResume } from '@/contexts/ResumeContext';

interface ResumeFormProps {
  initialData: FormData;
  onDataChange: (data: FormData) => void;
}

const ResumeForm = ({ initialData, onDataChange }: ResumeFormProps) => {
  const [localData, setLocalData] = useState<FormData>(initialData);

  // Update local data when initialData changes
  useEffect(() => {
    setLocalData(initialData);
  }, [initialData]);
  const {  setResume } = useResume()
  const handleChange = useCallback((path: string, value: any) => {
    const newData = { ...localData };
    const pathArray = path.split('.');
    let current = newData;

    for (let i = 0; i < pathArray.length - 1; i++) {
      if (!(pathArray[i] in current)) {
        current[pathArray[i]] = {};
      }
      current = current[pathArray[i]];
    }

    current[pathArray[pathArray.length - 1]] = value;
    setLocalData(newData);
    onDataChange(newData);
    setResume(newData as Resume)
  }, [localData, onDataChange]);


  return (
    <div className="w-full transition-all duration-300 ease-in-out">
      <form className="space-y-6">
        {Object.entries(resumeSchema.properties).map(([name, schema]) => (
          <FormSection
            key={name}
            name={name}
            schema={schema}
            value={localData[name]}
            onChange={handleChange}
          />
        ))}
      </form>
    </div>
  );
};

export default ResumeForm;