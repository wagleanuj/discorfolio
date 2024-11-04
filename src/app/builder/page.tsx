'use client';

import { FC } from 'react';
import { BuilderLayout } from '@/components/builder/BuilderLayout';
import { ResumeForm } from '@/components/builder/ResumeForm';
import { LivePreview } from '@/components/builder/LivePreview';

const BuilderPage: FC = () => {
  return (
    <BuilderLayout>
      {/* Form Section */}
      <div className="w-[45%] h-full bg-gray-100 overflow-y-auto">
        <div className="max-w-2xl mx-auto py-8 px-6">
          <ResumeForm />
        </div>
      </div>

      {/* Preview Section */}
      <div className="flex-1 bg-gray-900 h-full overflow-hidden">
        <LivePreview />
      </div>
    </BuilderLayout>
  );
};

export default BuilderPage; 