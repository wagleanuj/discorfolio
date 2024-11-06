'use client';

import { useState, useCallback } from 'react';
import ResumeForm from '@/components/builder/ResumeForm/ResumeForm';
import Preview from '@/components/builder/Preview/Preview';
import Toolbar from '@/components/builder/Toolbar/Toolbar';
import { FormData } from '@/components/builder/ResumeForm/types';

export default function BuilderPage() {
  const [resumeData, setResumeData] = useState<FormData>({});
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [previewVisible, setPreviewVisible] = useState(true);

  const handleDataChange = useCallback((data: FormData) => {
    setResumeData(data);
  }, []);

  const handleDownload = () => {
    const jsonString = JSON.stringify(resumeData, null, 2);
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

  const handleUpload = async (file: File) => {
    try {
      const text = await file.text();
      const json = JSON.parse(text);
      setResumeData(json);
    } catch (err) {
      console.error('Error parsing JSON:', err);
    }
  };

  return (
    <>
      <Toolbar
        onDownload={handleDownload}
        onUpload={handleUpload}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        previewVisible={previewVisible}
        onPreviewToggle={() => setPreviewVisible(!previewVisible)}
      />
      
      <div className="flex-1 p-4 overflow-hidden">
        <div className="max-w-[1800px] mx-auto h-full flex gap-4">
          {/* Form Section */}
          <div className={`${previewVisible ? 'w-1/2' : 'w-full'} overflow-y-auto`}>
            <ResumeForm 
              initialData={resumeData}
              onDataChange={handleDataChange} 
            />
          </div>

          {/* Preview Section */}
          {previewVisible && (
            <div className="w-1/2 overflow-hidden">
              <Preview 
                data={resumeData}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
} 