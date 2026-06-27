export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string; // e.g., "New York, NY"
  website: string; // personal website/portfolio
  linkedin: string;
  github: string;
  summary: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string; // e.g., "Oct 2023"
  endDate: string; // e.g., "Present" or "Dec 2024"
  current: boolean;
  description: string; // bullet points separated by newlines or markdown
}

export interface Education {
  id: string;
  institution: string;
  degree: string; // e.g., "Bachelor of Science"
  fieldOfStudy: string; // e.g., "Computer Science"
  location: string;
  graduationDate: string; // e.g., "May 2024"
  gpa: string; // optional, e.g., "3.8/4.0"
}

export interface SkillCategory {
  id: string;
  category: string; // e.g., "Languages"
  skills: string; // e.g., "JavaScript, TypeScript, Python"
}

export interface Project {
  id: string;
  name: string;
  role: string;
  url: string;
  technologies: string; // e.g., "Next.js, Tailwind, Node.js"
  description: string; // bullet points
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  description: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: SkillCategory[];
  projects: Project[];
  certifications: Certification[];
  others: CustomSectionItem[];
}
