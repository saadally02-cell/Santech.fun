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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState<boolean>(true);
  const [dbConnected, setDbConnected] = useState<boolean>(false);

  const [firestoreForumPosts, setFirestoreForumPosts] = useState<ForumPost[]>([]);
  const [firestoreComments, setFirestoreComments] = useState<Record<string, CommentItem[]>>({});
  const [aiAnnouncements, setAiAnnouncements] = useState<Article[]>([]);
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
        const data = await res.json();
        if (data.announcements && Array.isArray(data.announcements)) {
          setAiAnnouncements(data.announcements);
        }
      }
    } catch (err) {
      console.error('Failed to fetch Gemini AI announcements:', err);
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
        await fetchAiAnnouncements();
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
