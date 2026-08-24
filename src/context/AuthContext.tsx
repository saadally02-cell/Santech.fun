import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  onSnapshot,
  addDoc,
  query,
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore';
import {
  auth,
  db,
  loginWithGoogle,
  logoutUser,
  testConnection,
  handleFirestoreError,
  OperationType,
} from '../firebase';
import { Article, CommentItem } from '../types';

interface ForumPost {
  id: string;
  author: string;
  role: string;
  topic: string;
  message: string;
  time: string;
  likes: number;
}

interface AuthContextType {
  currentUser: User | null;
  loadingAuth: boolean;
  loginWithGoogle: () => Promise<User>;
  logoutUser: () => Promise<void>;
  dbConnected: boolean;

  // Real-time Firestore sync states
  firestoreForumPosts: ForumPost[];
  addForumPost: (post: { author: string; role: string; topic: string; message: string }) => Promise<void>;

  firestoreComments: Record<string, CommentItem[]>;
  addArticleComment: (articleId: string, comment: { author: string; text: string }) => Promise<void>;

  aiAnnouncements: Article[];
  triggerNewAiAnnouncement: () => Promise<void>;
  isGeneratingAiAnnouncement: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const INITIAL_FALLBACK_ANNOUNCEMENTS: Article[] = [
  {
    id: 'ann-init-1',
    title: 'Mifumo ya Gemini 3.7 Flash Yazinduliwa: Kasi na Akili ya Hali ya Juu kwa Waswahili',
    excerpt: 'Google yazindua Gemini 3.7 Flash yenye uwezo wa kipekee wa kutoa hoja, uandishi wa kodi za kisasa na uelewa wa lugha za Kiafrika.',
    content: [
      'Katika mapinduzi makubwa ya teknolojia ya Akili Bandia ya mwaka 2026, Google imeachia rasmi modeli ya Gemini 3.7 Flash inayotoa uwezo wa kasi ya ajabu pamoja na thinking process ya kutatua masuala magumu ya kihandisi na kiuchumi.',
      'Wasanidi programu na wafanyabiashara nchini Tanzania watafaidika kwa kiasi kikubwa kutokana na gharama nafuu ya API na uwezo wa kuunganisha mawakala wa kiotomatiki kwenye tovuti na mifumo ya huduma.',
      'SANTECH TZ imekuwa mstari wa mbele kuunganisha modeli hii kutoa ushauri wa moja kwa moja wa Forex, Utalii na kazi za mbali kwa lugha ya Kiswahili.'
    ],
    category: 'ai',
    categoryName: 'Akili Bandia (AI)',
    author: 'Gemini 3.7 Pro Broadcaster',
    authorRole: 'Autonomous AI Engine',
    date: 'Saa Hizi • 2026',
    readTime: 'Dakika 3',
    views: 18450,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    tags: ['Gemini 3.7', 'Akili Bandia', 'Automation', 'Google', 'Tanzania'],
    isFeatured: true,
  },
  {
    id: 'ann-init-2',
    title: 'Forex Academy: Umuhimu wa Fibonacci 61.8% na Key Support Levels Katika Jozi za USD',
    excerpt: 'Uchambuzi wa kina wa kiufundi jinsi wafanyabiashara wanavyoweza kutumia Golden Ratio kubaini mabonde salama ya kuingilia.',
    content: [
      'Katika biashara ya soko la fedha za kigeni (Forex), kiwango cha Fibonacci Retracement cha 61.8% kinachukuliwa kuwa eneo lenye mvuto mkubwa zaidi kwa benki na wawekezaji wakubwa wa taasisi.',
      'Wakati wa soko lililopo kwenye mwenendo dhabiti (Strong Trend), kurudi kwa bei kwenye 61.8% kunatoa uwiano bora zaidi wa Faida kwa Hasara (Risk to Reward Ratio ya angalau 1:3).',
      'Kupitia Chuo cha Forex cha SANTECH, wafanyabiashara wanahimizwa daima kusubiri mshumaa wa uthibitisho (Bullish Pin Bar au Engulfing) kabla ya kufungua oda.'
    ],
    category: 'forex',
    categoryName: 'Forex Academy',
    author: 'SANTECH Market AI',
    authorRole: 'Market Structure Bot',
    date: 'Saa 1 Iliyopita',
    readTime: 'Dakika 4',
    views: 14200,
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    tags: ['Forex', 'Fibonacci', 'Price Action', 'Trading', 'Candlestick Bible'],
  },
  {
    id: 'ann-init-3',
    title: 'Fursa za Freelancing 2026: Mahitaji ya Watengenezaji wa React & AI Agents Tanzania Yaongezeka',
    excerpt: 'Ripoti ya soko la ajira mtandaoni inaonyesha kampuni za Marekani na Ulaya zikiongeza mikataba ya kazi za mbali kwa watengenezaji wa Afrika Mashariki.',
    content: [
      'Sekta ya ajira za kidijitali (Remote Tech Work) inaendelea kutoa fursa zisizo na kikomo kwa vijana wa Kitanzania wenye ujuzi thabiti wa React, TypeScript, Python na API Integrations.',
      'Wafanyakazi huru nchini sasa wanapokea wastani wa $25 hadi $55 kwa saa kupitia mifumo kama Upwork na majukwaa ya moja kwa moja ya mikataba ya kimataifa.',
      'Mwongozo wetu wa Kazi za Mbali unakufundisha jinsi ya kuweka wasifu wenye mvuto, kupata wateja na kupokea malipo kwa usalama kupitia benki au pochi za kidijitali.'
    ],
    category: 'kazi',
    categoryName: 'Kazi Mtandaoni',
    author: 'SANTECH Career Bot',
    authorRole: 'Freelance Economy AI',
    date: 'Saa 2 Zilizopita',
    readTime: 'Dakika 3',
    views: 11800,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    tags: ['Freelancing', 'Remote Work', 'Upwork', 'React', 'Ajira TZ'],
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState<boolean>(true);
  const [dbConnected, setDbConnected] = useState<boolean>(false);

  const [firestoreForumPosts, setFirestoreForumPosts] = useState<ForumPost[]>([]);
  const [firestoreComments, setFirestoreComments] = useState<Record<string, CommentItem[]>>({});
  const [aiAnnouncements, setAiAnnouncements] = useState<Article[]>(INITIAL_FALLBACK_ANNOUNCEMENTS);
  const [isGeneratingAiAnnouncement, setIsGeneratingAiAnnouncement] = useState<boolean>(false);

  // Check Firestore connection on boot (Mandatory constraint)
  useEffect(() => {
    testConnection().then((connected) => setDbConnected(connected));
  }, []);

  // Listen to Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  // Listen to Realtime Forum Posts from Firestore
  useEffect(() => {
    const path = 'forum_posts';
    try {
      const q = query(collection(db, path), orderBy('createdAt', 'desc'), limit(30));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const posts: ForumPost[] = snapshot.docs.map((docSnap) => {
            const data = docSnap.data();
            return {
              id: docSnap.id,
              author: data.author || 'Mtumiaji',
              role: data.role || 'Mwanachama',
              topic: data.topic || 'Mada ya Tech',
              message: data.message || '',
              time: data.time || 'Hivi Karibuni',
              likes: data.likes || 1,
            };
          });
          setFirestoreForumPosts(posts);
        },
        (error) => {
          handleFirestoreError(error, OperationType.GET, path);
        }
      );
      return () => unsubscribe();
    } catch (err) {
      console.warn('Firestore Forum Posts listener error:', err);
    }
  }, []);

  // Listen to Realtime Article Comments
  useEffect(() => {
    const path = 'article_comments';
    try {
      const q = query(collection(db, path), orderBy('createdAt', 'desc'), limit(50));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const grouped: Record<string, CommentItem[]> = {};
          snapshot.docs.forEach((docSnap) => {
            const data = docSnap.data();
            const artId = data.articleId || 'default';
            if (!grouped[artId]) grouped[artId] = [];
            grouped[artId].push({
              id: docSnap.id,
              author: data.author || 'Wasomaji',
              text: data.text || '',
              date: data.date || 'Sasa hivi',
              likes: data.likes || 1,
            });
          });
          setFirestoreComments(grouped);
        },
        (error) => {
          handleFirestoreError(error, OperationType.GET, path);
        }
      );
      return () => unsubscribe();
    } catch (err) {
      console.warn('Firestore Comments listener error:', err);
    }
  }, []);

  // Fetch / Sync AI Announcements from Backend Gemini API
  const fetchAiAnnouncements = async () => {
    try {
      const res = await fetch('/api/announcements');
      if (res.ok) {
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await res.json();
          if (data.announcements && Array.isArray(data.announcements) && data.announcements.length > 0) {
            setAiAnnouncements(data.announcements);
          }
        }
      }
    } catch (err) {
      console.warn('Notice: Using local AI announcements:', err);
    }
  };

  useEffect(() => {
    fetchAiAnnouncements();
    const interval = setInterval(fetchAiAnnouncements, 60000); // Poll every minute for live updates
    return () => clearInterval(interval);
  }, []);

  const triggerNewAiAnnouncement = async () => {
    setIsGeneratingAiAnnouncement(true);
    try {
      const res = await fetch('/api/generate-announcement', { method: 'POST' });
      if (res.ok) {
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await res.json();
          if (data.announcements && Array.isArray(data.announcements)) {
            setAiAnnouncements(data.announcements);
          } else {
            await fetchAiAnnouncements();
          }
        }
      }
    } catch (err) {
      console.error('Error triggering AI announcement:', err);
    } finally {
      setIsGeneratingAiAnnouncement(false);
    }
  };

  // Add Forum Post to Firestore
  const addForumPost = async (post: { author: string; role: string; topic: string; message: string }) => {
    const path = 'forum_posts';
    try {
      await addDoc(collection(db, path), {
        ...post,
        time: 'Sasa Hivi',
        likes: 1,
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  };

  // Add Article Comment to Firestore
  const addArticleComment = async (articleId: string, comment: { author: string; text: string }) => {
    const path = 'article_comments';
    try {
      await addDoc(collection(db, path), {
        articleId,
        ...comment,
        date: 'Sasa Hivi',
        likes: 1,
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loadingAuth,
        loginWithGoogle,
        logoutUser,
        dbConnected,
        firestoreForumPosts,
        addForumPost,
        firestoreComments,
        addArticleComment,
        aiAnnouncements,
        triggerNewAiAnnouncement,
        isGeneratingAiAnnouncement,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
