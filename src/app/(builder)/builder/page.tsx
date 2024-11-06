'use client';

import { useState, useCallback } from 'react';
import ResumeForm from '@/components/builder/ResumeForm/ResumeForm';
import Preview from '@/components/builder/Preview/Preview';
import Toolbar from '@/components/builder/Toolbar/Toolbar';
import ResizableDivider from '@/components/common/ResizableDivider/ResizableDivider';
import { FormData } from '@/components/builder/ResumeForm/types';
import { Resume } from '@/types/resume';
import { useResume } from '@/contexts/ResumeContext';

export default function BuilderPage() {
  const [resumeData, setResumeData] = useState<FormData>({});
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [previewVisible, setPreviewVisible] = useState(true);
  const [formWidth, setFormWidth] = useState(50); // percentage
  const { resume, setResume } = useResume()
  const handleDataChange = useCallback((data: FormData) => {
    setResumeData(data);
    setResume(data as Resume)
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
      setResume(json as Resume)
    } catch (err) {
      console.error('Error parsing JSON:', err);
    }
  };

  return (
    <div className="h-screen bg-[#2f3136] flex flex-col">
      <Toolbar
        onDownload={handleDownload}
        onUpload={handleUpload}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        previewVisible={previewVisible}
        onPreviewToggle={() => setPreviewVisible(!previewVisible)}
      />

      <div className="flex-1 p-4 min-h-0">
        <div id="resizable-container" className="h-full max-w-[1800px] mx-auto relative flex">
          {/* Form Section */}
          <div
            className="h-full transition-all duration-300 ease-in-out"
            style={{ width: previewVisible ? `${formWidth}%` : '100%' }}
          >
            <div
              className={`
                h-full overflow-y-auto
                transition-all duration-300 ease-in-out
                ${previewVisible ? '' : 'max-w-4xl mx-auto'}
              `}
            >
              <ResumeForm
                initialData={resumeData}
                onDataChange={handleDataChange}
              />
            </div>
          </div>

          {/* Resizable Divider */}
          {previewVisible && (
            <ResizableDivider
              onResize={setFormWidth}
              isVisible={previewVisible}
            />
          )}

          {/* Preview Section */}
          <div
            className={`
              h-full
              transition-all duration-300 ease-in-out
              ${previewVisible
                ? 'opacity-100'
                : 'opacity-0 w-0'
              }
            `}
            style={{ width: previewVisible ? `${100 - formWidth}%` : 0 }}
          >
            <div className="h-full">
              <Preview
                data={resumeData}
                viewMode={viewMode}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 