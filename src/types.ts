export interface CategoryItem {
  id: string;
  label: string;
  desc?: string;
}

export interface PlaygroundItem {
  id: string;
  title: string;
  type: 'image' | 'video';
  url: string;
  aspectRatio?: 'tall' | 'vertical' | 'wide' | 'square' | 'normal';
  tag?: string;
  description?: string;
}

export type CategoryType = string;

export interface ProcessStep {
  stepNumber: string;
  title: string;
  koreanTitle: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  category: CategoryType;
  subtitle: string;
  thumbnail: string;
  videoUrl: string;
  period: string;
  roles: string[];
  tools: string[];
  overview: string;
  process: {
    title: string;
    description: string;
  }[];
  featured?: boolean;
}

export interface SkillItem {
  id: string;
  name: string;
  category: string;
  rating: number; // 1-5 stars
  percentage: number; // 0-100%
  description: string;
}

export interface KeywordItem {
  key: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface ProfileInfo {
  name: string;
  englishName: string;
  title: string;
  tagline: string;
  bioParagraphs: string[];
  email: string;
  phone: string;
  showreelVideoUrl: string;
  profileImageUrl?: string;
}
