'use client';

import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus } from 'lucide-react';

interface FormSectionProps {
  title: string;
  description: string;
  path: string;
  isArray?: boolean;
}

export const FormSection: FC<FormSectionProps> = ({
  title,
  description,
  path,
  isArray = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
      layout
    >
      {/* Section Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </button>

      {/* Section Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-gray-200"
          >
            <div className="p-6">
              {/* Form fields will be rendered here */}
              {isArray && (
                <button className="flex items-center gap-2 text-sm text-discord-brand hover:text-discord-brand/80 transition-colors">
                  <Plus className="w-4 h-4" />
                  Add {title.toLowerCase()}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}; 