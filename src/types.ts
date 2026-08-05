export type CategoryId = 'zote' | 'ai' | 'dev' | 'cloud' | 'cybersecurity' | 'gadgets' | 'kazi' | 'blockchain';

export interface CategoryOption {
  id: CategoryId;
  label: string;
  iconName: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  category: CategoryId;
  categoryName: string;
  badgeBg: string;
  badgeColor: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  views: number;
  image: string;
  tags: string[];
  isHeadline?: boolean;
  isTrending?: boolean;
  rankNumber?: number;
}

export interface TechShowcaseItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  specs: string[];
  image: string;
  description: string;
  impact: string;
  year: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export interface CommentItem {
  id: string;
  author: string;
  text: string;
  date: string;
  likes: number;
}
