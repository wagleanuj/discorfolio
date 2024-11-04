'use client';

import { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FormSection } from './FormSection';

export const ResumeForm: FC = () => {
  return (
    <div className="w-1/2 h-full overflow-y-auto pr-6">
      <motion.div 
        className="space-y-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <FormSection
          title="Basic Information"
          description="Your personal and contact information"
          path="basics"
        />

        <FormSection
          title="Work Experience"
          description="Your professional history"
          path="work"
          isArray
        />

        <FormSection
          title="Education"
          description="Your academic background"
          path="education"
          isArray
        />

        <FormSection
          title="Skills"
          description="Your technical and professional skills"
          path="skills"
          isArray
        />

        <FormSection
          title="Projects"
          description="Your notable projects"
          path="projects"
          isArray
        />
      </motion.div>
    </div>
  );
}; 