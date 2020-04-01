type Type = 'default' | 'bi-column';
export type Color = 'red' | 'blue' | 'green' | 'purple';

export interface Experience {
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate: string;
  description: string;
  link?: string;
}

export type Organization = Omit<Experience, 'company' | 'role'> & { title: string };

/* eslint-disable-next-line max-len */
export type SocialServiceName = 'behance' | 'dribbble' | 'facebook' | 'github' | 'instagram' | 'linkedin' | 'pinterest' | 'tumblr' | 'twitter' | 'youtube';

export interface SocialMedia {
  type: SocialServiceName;
  id: string;
}

export interface Education {
  schoolName: string;
  schoolLocation: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  degree?: string;
}

export interface Certification {
  certificationName: string;
  date?: string;
}

export interface Skill {
  skillName: string;
  rate: number;
}

export interface Language {
  language: string;
  proficiency: string;
}

export interface ResumeBody {
  type: Type;
  color: Color;
  firstName: string;
  lastName: string;
  bio: string;
  profile?: string;
  city?: string;
  country?: string;
  phoneNumber?: string;
  email?: string;
  homepage?: string;
  experiences: Experience[];
  organizations: Organization[];
  socialMedias: SocialMedia[];
  educations: Education[];
  certifications: Certification[];
  skills: Skill[];
  languages: Language[];
}

interface ColorSet {
  normal: string;
  darken: string;
  lighten: string;
}

export type Theme = Record<Color, ColorSet>;

export type SocialMediaIcon = Record<SocialServiceName, string>;
export type SocialMediaLink = Record<SocialServiceName, string>;
