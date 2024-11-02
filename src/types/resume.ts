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
  label?: string;
  image?: string;
  email?: string;
  phone?: string;
  url?: string;
  summary?: string;
  location?: Location;
  profiles?: Profile[];
}

// Work experience
interface Work {
  name: string;
  location?: string;
  description?: string;
  position?: string;
  url?: string;
  startDate?: ISO8601;
  endDate?: ISO8601;
  summary?: string;
  highlights?: string[];
  company?: string;
  website?: string;
}

// Education
interface Education {
  institution: string;
  url?: string;
  area?: string;
  studyType?: string;
  startDate?: ISO8601;
  endDate?: ISO8601;
  score?: string;
  courses?: string[];
  location?: string;
  address?: string;
  field?: string;
  major?: string;
}

// Award
interface Award {
  title: string;
  date?: ISO8601;
  awarder?: string;
  summary?: string;
}

// Certificate
interface Certificate {
  name: string;
  date?: ISO8601;
  url?: string;
  issuer?: string;
}

// Publication
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
  keywords?: string[];
}

// Language
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
  description?: string;
  highlights?: string[];
  keywords?: string[];
  startDate?: ISO8601;
  endDate?: ISO8601;
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
  basics: {
    name: string;
    label: string;
    image: string;
    email: string;
    phone: string;
    summary: string;
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
  };
  work: Array<{
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
  }>;
  education: Array<{
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
  }>;
  skills: Array<{
    name: string;
    level?: string;
    keywords: string[];
  }>;
  projects: Array<{
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
  }>;
  meta: {
    lastModified: string;
  };
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