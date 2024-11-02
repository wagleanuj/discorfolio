import fs from 'fs';
import path from 'path';
import { Resume } from '@/types/resume';

const DATA_DIR = path.join(process.cwd(), '.data');

export async function loadResume(): Promise<Resume> {
  try {
    // Ensure .data directory exists
    if (!fs.existsSync(DATA_DIR)) {
      throw new Error('Data directory not found. Please create .data directory and add resume.json');
    }

    // Read resume.json from .data directory
    const resumePath = path.join(DATA_DIR, 'resume.json');
    const resumeData = await fs.promises.readFile(resumePath, 'utf-8');
    const resume: Resume = JSON.parse(resumeData);

    // Basic validation
    if (!resume.basics || !resume.basics.name) {
      throw new Error('Invalid resume format: missing required fields');
    }

    return resume;
  } catch (error) {
    console.error('Error loading resume:', error);
    throw error;
  }
} 