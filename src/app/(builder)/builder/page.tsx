'use client';

import { useState, useCallback } from 'react';
import ResumeForm from '@/components/builder/ResumeForm/ResumeForm';
import Preview from '@/components/builder/Preview/Preview';
import { FormData } from '@/components/builder/ResumeForm/types';

export default function BuilderPage() {
  const [resumeData, setResumeData] = useState<FormData>({});

  const handleDataChange = useCallback((data: FormData) => {
    setResumeData(data);
  }, []);

  return (
    <main className="min-h-screen bg-[#2f3136] p-4">
      <div className="max-w-[1800px] mx-auto h-[calc(100vh-2rem)] flex gap-4">
        {/* Form Section */}
        <div className="w-1/2 overflow-y-auto">
          <ResumeForm 
            initialData={resumeData}
            onDataChange={handleDataChange} 
          />
        </div>

        {/* Preview Section */}
        <div className="w-1/2 overflow-hidden">
          <Preview data={resumeData} />
        </div>
      </div>
    </main>
  );
} 