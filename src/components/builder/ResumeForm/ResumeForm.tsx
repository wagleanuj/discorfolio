'use client';

import { useState, useCallback } from 'react';
import { FormData } from './types';
import { resumeSchema } from '@/lib/schema/resume.schema';
import FormSection from './FormSection';
import { Download, Upload } from 'lucide-react';
import { useResume } from '@/contexts/ResumeContext';
import { Resume } from '@/types/resume';

interface ResumeFormProps {
  initialData: FormData;
  onDataChange: (data: FormData) => void;
}

const ResumeForm = ({ initialData, onDataChange }: ResumeFormProps) => {
  const [localData, setLocalData] = useState<FormData>(initialData);
  const {resume, setResume} = useResume();
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
    setResume(newData as Resume);
  }, [localData, onDataChange]);

  const handleDownload = () => {
    const jsonString = JSON.stringify(localData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'resume.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const json = JSON.parse(text);
      setLocalData(json);
      onDataChange(json);
    } catch (err) {
      console.error('Error parsing JSON:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#36393f] text-gray-100 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Resume Builder</h1>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 px-4 py-2 bg-[#5865f2] text-white rounded-md hover:bg-[#4752c4] transition-colors cursor-pointer">
            <Upload size={18} />
            <span>Upload JSON</span>
            <input
              type="file"
              accept="application/json"
              onChange={handleUpload}
              className="hidden"
            />
          </label>

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-[#5865f2] text-white rounded-md hover:bg-[#4752c4] transition-colors"
          >
            <Download size={18} />
            <span>Download JSON</span>
          </button>
        </div>
      </div>
      
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