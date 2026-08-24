export type CategoryId = 'zote' | 'ai' | 'dev' | 'forex' | 'cloud' | 'cybersecurity' | 'gadgets' | 'kazi' | 'blockchain';

export interface CategoryOption {
  id: CategoryId;
  label: string;
  iconName: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug?: string;
  summary?: string;
  excerpt?: string;
  content: string | string[];
  category: CategoryId;
  categoryLabel?: string;
  categoryName?: string;
  author: string;
  authorRole?: string;
  authorAvatar?: string;
  publishedAt?: string;
  date?: string;
  readTime: string;
  likesCount?: number;
  commentsCount?: number;
  sharesCount?: number;
  views?: number;
  imageUrl?: string;
  image?: string;
  badgeBg?: string;
  badgeColor?: string;
  isFeatured?: boolean;
  isHeadline?: boolean;
  isTrending?: boolean;
  rankNumber?: number;
  audioDuration?: string;
  tags: string[];
}

export type Article = NewsArticle;

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface CommentItem {
  id: string;
  articleId?: string;
  authorName?: string;
  userName?: string;
  author?: string;
  userAvatar?: string;
  authorAvatar?: string;
  avatarBg?: string;
  content?: string;
  text?: string;
  createdAt?: string;
  date?: string;
  timestamp?: string;
  likes?: number;
}

export type Comment = CommentItem;

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'ai';
  text: string;
  timestamp: string;
  quickActions?: { label: string; action: string }[];
}

export interface TechShowcaseItem {
  id: string;
  title: string;
  subtitle?: string;
  creatorName?: string;
  creatorLocation?: string;
  category?: string;
  description: string;
  image?: string;
  year?: string;
  specs?: string[];
  impact?: string;
  link?: string;
  starsCount?: number;
  badge?: string;
}
