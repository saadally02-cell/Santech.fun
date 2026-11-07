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
    title: 'NIT Marine Engineering & Naval Architecture Repository Online by Saad Ally Nassor',
    excerpt: 'Digital access to National Institute of Transport (NIT) official courseware, lecture series, and Dr. C.B. Barrass reference textbooks for Tanzanian & global seafarers.',
    content: [
      'SAN25 Marine Engineering Hub has launched the direct digital academic library founded by Saad Ally Nassor in collaboration with National Institute of Transport (NIT) syllabus standards.',
      'Seafarers, cadets, and naval architecture students can now read and download 10 complete modules covering Drydocking (SRT 04105), Ship Maneuvering (Ch. 6), Ship Design Methodology (SRT 06107), Lines Plans, and Intact Stability.',
      'This marks a historic milestone in making high-level marine qualification courseware open and freely accessible across Dar es Salaam, Mombasa, and international maritime corridors.'
    ],
    category: 'sheria-na-usalama',
    categoryName: 'NIT Academic Archives',
    author: 'Saad Ally Nassor',
    authorRole: 'Founder & Chief Marine Technologist',
    date: 'Latest Dispatch • 2026',
    readTime: '3 min read',
    views: 18450,
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    tags: ['NIT Courseware', 'Saad Ally Nassor', 'Naval Architecture', 'MEO Prep', 'Drydocking'],
    isFeatured: true,
  },
  {
    id: 'ann-init-2',
    title: 'IMO MEPC 82 Decarbonization: CII & EEXI Compliance for Two-Stroke Dual-Fuel Vessels',
    excerpt: 'Detailed operational strategies for compliance with the 2026 Carbon Intensity Indicator and Energy Efficiency Existing Ship Index on LNG and Methanol propulsion.',
    content: [
      'The International Maritime Organization (IMO) Marine Environment Protection Committee has enforced stricter reduction factors for annual Carbon Intensity Indicator (CII) ratings.',
      'Vessel chief engineers must implement continuous torque meter monitoring, main engine derating, shaft generator power take-off (PTO/PTI), and voyage speed optimization.',
      'Our interactive SFOC calculator and propulsion resistance module enable shipboard officers to evaluate fuel consumption penalties and verify emission thresholds under MARPOL Annex VI.'
    ],
    category: 'injini-kuu',
    categoryName: 'Main Engines & Decarbonization',
    author: 'Saad Ally Nassor',
    authorRole: 'Founder & Chief Marine Technologist',
    date: '1 hour ago',
    readTime: '4 min read',
    views: 14200,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    tags: ['IMO MEPC 82', 'CII', 'EEXI', 'MAN ME-GI', 'Decarbonization'],
  },
  {
    id: 'ann-init-3',
    title: 'High Voltage Marine Electrical Systems: 6.6kV Safety & Emergency Power Restoration',
    excerpt: 'STCW 2010 High Voltage safety procedures, vacuum circuit breaker maintenance, and interlocking key protocols during emergency blackout recovery.',
    content: [
      'Modern container vessels, cruise liners, and LNG carriers rely heavily on 6.6kV or 11kV distribution architectures to power bow thrusters, reefer loads, and cargo compressors.',
      'Engineers must observe strict permit-to-work protocols, Castell key interlocks, potential testers, and earthing trucks before racking out vacuum circuit breakers.',
      'This guide provides step-by-step procedures for synchronizing emergency diesel generators onto the emergency switchboard within 45 seconds of main power failure.'
    ],
    category: 'umeme-na-otomesheni',
    categoryName: 'Marine Electrical Systems',
    author: 'Saad Ally Nassor',
    authorRole: 'Founder & Chief Marine Technologist',
    date: '2 hours ago',
    readTime: '3 min read',
    views: 11800,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    tags: ['High Voltage 6.6kV', 'STCW ETO', 'Blackout Recovery', 'Switchboards'],
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
