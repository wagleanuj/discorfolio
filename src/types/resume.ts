// ISO8601 date type from schema
type ISO8601 = string; // Format: YYYY-MM-DD or YYYY-MM

// Basic location interface
interface Location {
  address?: string;
  postalCode?: string;
  city?: string;
  countryCode?: string;  // ISO-3166-1 ALPHA-2
  region?: string;
}

// Profile interface for social networks
interface Profile {
  network: string;
  username: string;
  url: string;
}

// Basics section
interface Basics {
  name: string;
  label: string;
  image: string;
  email: string;
  phone: string;
  summary: string;
  url?: string;
  location: {
    address: string;
    postalCode: string;
    city: string;
    countryCode: string;
    region: string;
    country: string;
    province: string;
    state: string;
  };
  profiles: Array<{
    network: string;
    username: string;
    url: string;
  }>;
}

// Work experience
interface Work {
  name: string;
  location: string;
  position: string;
  url?: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
  company: string;
  website?: string;
}

// Education
interface Education {
  institution: string;
  url: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
  score: string;
  location: string;
  address: string;
  field: string;
  major: string;
}

// Award
//@eslint-disable-next-line
interface Award {
  title: string;
  date?: ISO8601;
  awarder?: string;
  summary?: string;
}

// Certificate
//@eslint-disable-next-line
interface Certificate {
  name: string;
  date?: ISO8601;
  url?: string;
  issuer?: string;
}

// Publication
//@eslint-disable-next-line
interface Publication {
  name: string;
  publisher?: string;
  releaseDate?: ISO8601;
  url?: string;
  summary?: string;
}

// Skill 
interface Skill {
  name: string;
  level?: string;
  keywords: string[];
}

// Language
//@eslint-disable-next-line
interface Language {
  language: string;
  fluency?: string;
}

// Interest
interface Interest {
  name: string;
  keywords?: string[];
}

// Reference
interface Reference {
  name: string;
  reference?: string;
}

// Project
interface Project {
  name: string;
  description: string;
  highlights: string[];
  keywords: string[];
  startDate?: string;
  endDate?: string;
  url?: string;
  roles?: string[];
  entity?: string;
  type?: string;
}

// Meta information
interface Meta {
  canonical?: string;
  version?: string;
  lastModified?: string;
}

// Main Resume interface
export interface Resume {
  basics: Basics;
  work: Work[];
  education: Education[];
  skills: Skill[];
  projects: Project[];

}

export type {
  Basics,
  Work,
  Education,
  Skill,
  Project,
  Profile,
  Location,
  Meta
}; 