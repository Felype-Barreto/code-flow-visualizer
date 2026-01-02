import { useState, useEffect, useCallback } from 'react';

interface User {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  isAdmin?: boolean;
  isPro?: boolean;
  proExpiresAt?: string | null;
  emailVerified?: boolean;
  // Gamification fields
  xp?: number;
  level?: number;
  coins?: number;
  avatar?: string;
  bio?: string;
  theme?: string;
  language?: string;
  dailyStreak?: number;
  lastActivityDate?: string;
  dailyGoal?: number;
  totalExercises?: number;
  totalTime?: number;
  country?: string;
  dateOfBirth?: string;
  // Monetization fields
  freeUsageCount?: number;
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/me', { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) {
        const data = await res.json();
        const u = (data && (data as any).user) ? (data as any).user : data;
        if (u && (u as any).id) {
          setUser(u as any);
        } else {
          setUser(null);
        }
      } else if (res.status === 401) {
        // Only clear token on explicit unauthorized
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
      } else {
        // Keep current session on transient errors
        console.warn('refreshUser: non-401 response', res.status);
      }
    } catch (err) {
      // Network / transient error: do not drop session; just log and continue
      console.warn('refreshUser: fetch failed', err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    refreshUser();
  }, [token, refreshUser]);

  return { user, token, loading, refreshUser };
}
