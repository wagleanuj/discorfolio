'use client';

import { useState, useEffect } from 'react';
import { FormData } from './types';
import { resumeSchema } from '@/lib/schema/resume.schema';
import FormSection from './FormSection';
import ResumeUpload from '../ResumeUpload/ResumeUpload';

interface ResumeFormProps {
  initialData?: FormData;
  onDataChange?: (data: FormData) => void;
}

const ResumeForm = ({ initialData, onDataChange }: ResumeFormProps) => {
  const [formData, setFormData] = useState<FormData>(initialData || {});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (path: string, value: any) => {
    setFormData(prevData => {
      const newData = { ...prevData };
      const pathArray = path.split('.');
      let current = newData;
      
      for (let i = 0; i < pathArray.length - 1; i++) {
        if (!(pathArray[i] in current)) {
          current[pathArray[i]] = {};
        }
        current = current[pathArray[i]];
      }
      
      current[pathArray[pathArray.length - 1]] = value;
      onDataChange?.(newData);
      return newData;
    });
  };

  const handleUpload = (data: FormData) => {
    setFormData(data);
    onDataChange?.(data);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Download the JSON file
    const blob = new Blob([JSON.stringify(formData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#36393f] text-gray-100 rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Resume Builder</h1>
      <ResumeUpload onUpload={handleUpload} />
      <form onSubmit={handleSubmit} className="space-y-6">
        {Object.entries(resumeSchema.properties).map(([name, schema]) => (
          <FormSection
            key={name}
            name={name}
            schema={schema as any} // TODO: Fix type
            value={formData[name]}
            onChange={handleChange}
          />
        ))}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#5865f2] text-white px-6 py-2 rounded-md hover:bg-[#4752c4] transition-colors"
          >
            Download Resume JSON
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResumeForm; 