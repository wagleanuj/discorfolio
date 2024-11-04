'use client';

import { useState } from 'react';
import { FormData } from '../ResumeForm/types';

interface ResumeUploadProps {
  onUpload: (data: FormData) => void;
}

export default function ResumeUpload({ onUpload }: ResumeUploadProps) {
  const [error, setError] = useState<string>('');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError('');

    if (!file) return;

    try {
      const text = await file.text();
      const json = JSON.parse(text);
      onUpload(json);
    } catch (err) {
      setError('Invalid JSON file. Please upload a valid resume JSON file.');
      console.error('Error parsing JSON:', err);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 px-4 py-2 bg-[#5865f2] text-white rounded-md hover:bg-[#4752c4] transition-colors cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          Upload Resume JSON
          <input
            type="file"
            accept="application/json"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
        <button
          type="button"
          onClick={() => onUpload({})}
          className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
        >
          Clear Form
        </button>
      </div>
      {error && (
        <p className="mt-2 text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
} 