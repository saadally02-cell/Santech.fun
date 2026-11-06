import { MARINE_MAIN_ENGINES_SUBPAGES } from './marineMainEngines';
import { MARINE_AUXILIARY_SUBPAGES } from './marineAuxiliary';
import { MARINE_ELECTRICAL_SUBPAGES } from './marineElectrical';
import { MARINE_REGULATIONS_SUBPAGES } from './marineRegulations';
import { MARINE_CALCULATIONS_SUBPAGES } from './marineCalculations';

export interface SubpageArticle {
  id: string;
  category: 'injini-kuu' | 'mitambo-msaidizi' | 'umeme-na-otomesheni' | 'sheria-na-usalama' | 'vipimo-na-miongozo' | string;
  categoryLabel: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  views: number;
  imageUrl: string;
  tags: string[];
  excerpt: string;
  keySpecs?: { label: string; value: string }[];
  contentParagraphs: string[];
  internalLinks: { title: string; category: string; slug: string }[];
  affiliateCallout?: {
    title: string;
    description: string;
    buttonText: string;
    url: string;
  };
}

export interface SubpageCategory {
  id: 'injini-kuu' | 'mitambo-msaidizi' | 'umeme-na-otomesheni' | 'sheria-na-usalama' | 'vipimo-na-miongozo' | string;
  label: string;
  description: string;
  iconName: string;
}

export const SUBPAGE_CATEGORIES: SubpageCategory[] = [
  {
    id: 'injini-kuu',
    label: 'Injini Kuu & Propulsion',
    description: 'MAN B&W, Wärtsilä Sulzer, Turbochargers, Indicator Cards na Propeller Shafting',
    iconName: 'Ship',
  },
  {
    id: 'mitambo-msaidizi',
    label: 'Mitambo Msaidizi',
    description: 'Auxiliary Boilers, Centrifugal Purifiers, 15 PPM OWS, FWG na Steering Gear',
    iconName: 'Wrench',
  },
  {
    id: 'umeme-na-otomesheni',
    label: 'Umeme & Otomesheni',
    description: 'High Voltage 6.6kV, Alternator Synchronization, PMS, ESB na Blackout Recovery',
    iconName: 'Zap',
  },
  {
    id: 'sheria-na-usalama',
    label: 'Sheria & Usalama (IMO)',
    description: 'SOLAS Fire Fighting, MARPOL Annex I-VI, STCW 2010, PSC Checklists na MLC 2006',
    iconName: 'ShieldAlert',
  },
  {
    id: 'vipimo-na-miongozo',
    label: 'Vipimo & MEO Exams',
    description: 'SFOC Calculator, Propeller Slip, Planimeter, Scavenge Fire na Class 1/2 Oral Viva',
    iconName: 'Calculator',
  },
];

export const ALL_SUBPAGES: SubpageArticle[] = [
  ...MARINE_MAIN_ENGINES_SUBPAGES,
  ...MARINE_AUXILIARY_SUBPAGES,
  ...MARINE_ELECTRICAL_SUBPAGES,
  ...MARINE_REGULATIONS_SUBPAGES,
  ...MARINE_CALCULATIONS_SUBPAGES,
];

// Helper to normalize category (maps legacy tech slugs to marine categories)
export function normalizeCategory(category: string): string {
  const clean = category.toLowerCase().trim();
  switch (clean) {
    case 'simu':
      return 'injini-kuu';
    case 'apps':
      return 'mitambo-msaidizi';
    case 'internet':
      return 'umeme-na-otomesheni';
    case 'jinsi-ya':
      return 'sheria-na-usalama';
    case 'bei':
      return 'vipimo-na-miongozo';
    default:
      return clean;
  }
}

// Helper to look up an article by category and slug
export function getSubpageBySlug(category: string, slug: string): SubpageArticle | undefined {
  const cleanCat = normalizeCategory(category);
  const cleanSlug = slug.toLowerCase().trim();
  return (
    ALL_SUBPAGES.find((a) => a.category === cleanCat && a.slug === cleanSlug) ||
    ALL_SUBPAGES.find((a) => a.slug === cleanSlug)
  );
}

// Helper to get latest subpages by category
export function getSubpagesByCategory(category: string, limit?: number): SubpageArticle[] {
  const cleanCat = normalizeCategory(category);
  const list = ALL_SUBPAGES.filter((a) => a.category === cleanCat);
  return limit ? list.slice(0, limit) : list;
}

// Helper to get related subpages (excluding current)
export function getRelatedSubpages(current: SubpageArticle, limit: number = 4): SubpageArticle[] {
  const sameCat = ALL_SUBPAGES.filter((a) => a.id !== current.id && a.category === current.category);
  if (sameCat.length >= limit) {
    return sameCat.slice(0, limit);
  }
  const others = ALL_SUBPAGES.filter((a) => a.id !== current.id && a.category !== current.category);
  return [...sameCat, ...others].slice(0, limit);
}
