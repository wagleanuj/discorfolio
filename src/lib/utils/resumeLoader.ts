import fs from 'fs';
import path from 'path';
import { Resume } from '@/types/resume';

const DATA_DIR = path.join(process.cwd(), '.data');
const basicValidation = (resume: Resume) => {
  if (!resume.basics || !resume.basics.name) {
    throw new Error('Invalid resume format: missing required fields');
  }
};

export async function loadLocalResume(): Promise<Resume> {
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
    basicValidation(resume);

    return resume;
  } catch (error) {
    console.error('Error loading resume:', error);
    throw error;
  }
} 

export async function loadRemoteResume(): Promise<Resume> {
  //fetch the latest resume from vercel blob
  const url = process.env.VERCEL_RESUME_BLOB_URL;
  if(!url) {
    throw new Error('Env variable VERCEL_RESUME_BLOB_URL is not set');
  }
  const resume = await fetch(url);
  const resumeData = await resume.json();
  basicValidation(resumeData);
  return resumeData;
}

export async function loadResume(): Promise<Resume> {
  if(process.env.NODE_ENV === 'development') {
    return loadLocalResume();
  }
  return loadRemoteResume();
}