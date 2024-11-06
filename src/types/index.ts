export interface Resume {
  basics: {
    name: string;
    label: string;
    summary: string;
    email: string;
    phone?: string;
    location?: {
      city: string;
      region: string;
    };
    url?: string;
    profiles?: Array<{
      network: string;
      url: string;
    }>;
  };
  work?: Array<{
    name: string;
    position: string;
    location?: string;
    startDate: string;
    endDate?: string;
    summary?: string;
    highlights?: string[];
    url?: string;
  }>;
  skills?: Array<{
    name: string;
    level?: string;
    keywords?: string[];
  }>;
  projects?: Array<{
    name: string;
    description: string;
    highlights?: string[];
    keywords?: string[];
    startDate?: string;
    url?: string;
  }>;
  education?: Array<{
    institution: string;
    area: string;
    studyType: string;
    startDate: string;
    endDate: string;
    score?: string;
    url?: string;
  }>;
} 