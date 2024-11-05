'use client';

import { useState, useEffect } from 'react';
import ResumeForm from '@/components/builder/ResumeForm/ResumeForm';
import Preview from '@/components/builder/Preview/Preview';
import { FormData } from '@/components/builder/ResumeForm/types';
import { useResume } from '@/contexts/ResumeContext';
import { storageService } from '@/lib/services/storage';
import { debounce } from 'lodash';
import { Resume } from '@/types';

const STORAGE_KEY = 'resume_draft';

export default function BuilderPage() {
  const [resumeData, setResumeData] = useState<FormData>({});
  const { resume, setResume } = useResume();
  // Load saved data on mount
  useEffect(() => {
    const loadSavedData = async () => {
      const savedData = await storageService.load(STORAGE_KEY);
      if (savedData) {
        setResumeData(savedData);
      }
    };
    loadSavedData();
  }, []);

  // Debounced save function
  const saveData = debounce(async (data: FormData) => {
    await storageService.save(STORAGE_KEY, data);
  }, 1000); // Save after 1 second of no changes

  const handleDataChange = (data: FormData) => {
    setResumeData(data);
    saveData(data);
    setResume(data as Resume);
  };

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