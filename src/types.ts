export type CategoryId =
  | 'zote'
  | 'injini-kuu'
  | 'mitambo-msaidizi'
  | 'umeme-na-otomesheni'
  | 'sheria-na-usalama'
  | 'vipimo-na-miongozo'
  | 'calculator'
  | 'checklist'
  | 'quiz'
  | 'naval-architecture'
  | 'hydrodynamics'
  | 'ship-stability'
  | 'ship-design'
  | 'diagrams'
  | 'kuhusu'
  | 'privacy'
  | 'terms'
  // Backward compatibility aliases
  | 'simu'
  | 'apps'
  | 'internet'
  | 'jinsi-ya'
  | 'bei'
  | 'forex'
  | 'candlestick'
  | 'smc'
  | 'ai'
  | 'dev'
  | 'utalii'
  | 'kazi'
  | 'cloud'
  | 'cybersecurity'
  | 'gadgets'
  | 'blockchain'
  | 'tools'
  | 'audio'
  | 'forum'
  | 'showcase';

export interface CategoryOption {
  id: CategoryId;
  label: string;
  iconName: string;
  description?: string;
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
  tags: string[];
}

export type Article = NewsArticle;

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export interface CommentItem {
  id: string;
  articleId?: string;
  author: string;
  text: string;
  date: string;
  likes: number;
}

export interface TechShowcaseItem {
  id: string;
  title: string;
  description: string;
  subtitle?: string;
  year?: string;
  impact?: string;
  category?: string;
  specs: { label: string; value: string }[];
  tag: string;
  image: string;
  priceEstimate?: string;
}

export interface CurrencyRate {
  pair: string;
  rate: number;
  change24h: number;
  flag: string;
}

