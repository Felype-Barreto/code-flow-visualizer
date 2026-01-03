import { useEffect, useMemo, useState } from 'react';
import { useRoute } from 'wouter';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/use-user';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

type PublicUser = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  usernameColor: string | null;
  avatar: string | null;
  xp: number;
  level: number;
  dailyStreak: number;
  isPro: boolean;
  equippedBadge: string | null;
  equippedFrame: string | null;
  frameAnimation: string | null;
  theme: string | null;
  activePet: string | null;
  featuredUntil: string | null;
  featuredActive: boolean;
};

function displayName(u: Pick<PublicUser, 'firstName' | 'lastName'>) {
  const first = (u.firstName || '').trim();
  const last = (u.lastName || '').trim();
  const full = `${first} ${last}`.trim();
  return full || 'User';
}

function getAvatarEmoji(avatar: string): string {
  const emojiMap: Record<string, string> = {
    default: '👤',
    ninja: '🥷',
    robot: '🤖',
    wizard: '🧙',
    alien: '👽',
    pirate: '🏴‍☠️',
    astronaut: '👨‍🚀',
    detective: '🕵️',
    knight: '🛡️',
    samurai: '⚔️',
    viking: '🪓',
    phantom: '👻',
    dragon: '🐉',
    phoenix: '🔥',
    tiger: '🐯',
    eagle: '🦅',
  };
  return emojiMap[avatar] || '👤';
}

function getPetDisplay(petId: string): { icon: string; label: string } {
  const id = String(petId || '').trim();
  if (!id) return { icon: '🐾', label: 'Pet' };

  const map: Record<string, { icon: string; label: string }> = {
    pet_dog: { icon: '🐶', label: 'Virtual Dog Pet' },
    pet_cat: { icon: '🐱', label: 'Virtual Cat Pet' },
  };

  if (map[id]) return map[id];
  if (id.startsWith('pet_')) {
    const suffix = id.replace(/^pet_/, '').trim();
    const label = suffix ? `Pet: ${suffix}` : 'Pet';
    return { icon: '🐾', label };
  }

  return { icon: '🐾', label: 'Pet' };
}

function getProfileBackgroundClass(theme?: string | null) {
  switch (String(theme || '')) {
    case 'theme_vip_gold':
      return 'bg-gradient-to-br from-amber-950 via-yellow-950 to-slate-950';
    case 'theme_rainbow':
      return 'bg-gradient-to-br from-fuchsia-950 via-slate-950 to-cyan-950';
    case 'theme_dark':
    case 'dark':
      return 'bg-gradient-to-br from-black via-slate-950 to-slate-900';
    case 'theme_love':
      return 'bg-gradient-to-br from-red-950 via-rose-950 to-slate-950';
    case 'theme_pink':
      return 'bg-gradient-to-br from-pink-950 via-fuchsia-950 to-slate-950';
    case 'theme_rose':
      return 'bg-gradient-to-br from-rose-950 via-slate-950 to-slate-950';
    case 'theme_sunset':
      return 'bg-gradient-to-br from-orange-950 via-amber-950 to-slate-950';
    case 'theme_aurora':
      return 'bg-gradient-to-br from-purple-950 via-slate-950 to-emerald-950';
    case 'theme_neon':
      return 'bg-gradient-to-br from-cyan-950 via-slate-950 to-indigo-950';
    case 'theme_ocean':
      return 'bg-gradient-to-br from-sky-950 via-slate-950 to-blue-950';
    case 'theme_forest':
      return 'bg-gradient-to-br from-emerald-950 via-slate-950 to-teal-950';
    case 'theme_cyberpunk':
      return 'bg-gradient-to-br from-violet-950 via-slate-950 to-pink-950';
    case 'theme_matrix':
      return 'bg-gradient-to-br from-emerald-950 via-slate-950 to-lime-950';
    case 'theme_obsidian':
      return 'bg-gradient-to-br from-slate-950 via-slate-950 to-black';
    default:
      return 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950';
  }
}

export default function PublicProfilePage() {
  const { user } = useUser();
  const { toast } = useToast();
  const { t } = useLanguage();

  const [match, params] = useRoute('/u/:id');
  const profileId = params?.id || '';

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<PublicUser | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);

  const isMe = useMemo(() => Boolean(user?.id && profileId && user.id === profileId), [user?.id, profileId]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!profileId) {
        setLoading(false);
        setProfile(null);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(`/api/users/${encodeURIComponent(profileId)}/public`);
        const j = await res.json().catch(() => ({} as any));
        if (!res.ok) throw new Error(j?.message || 'Failed to load profile');
        if (!cancelled) setProfile((j as any).user || null);
      } catch (e: any) {
        if (!cancelled) setProfile(null);
        toast({ title: t('common.error', 'Error'), description: e?.message || 'Unable to load profile', variant: 'destructive' });
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [profileId, toast, t]);

  useEffect(() => {
    let cancelled = false;

    async function loadFollowing() {
      const token = localStorage.getItem('token');
      if (!token || !profileId || isMe) {
        setIsFollowing(false);
        return;
      }

      try {
        const res = await fetch('/api/social/following', { headers: { Authorization: `Bearer ${token}` } });
        if (!res.ok) return;
        const j = await res.json().catch(() => ({} as any));
        const ids = Array.isArray((j as any).following) ? (j as any).following : [];
        if (!cancelled) setIsFollowing(ids.includes(profileId));
      } catch {
        // ignore
      }
    }

    loadFollowing();
    return () => {
      cancelled = true;
    };
  }, [profileId, isMe]);

  async function follow() {
    const token = localStorage.getItem('token');
    if (!token) {
      toast({ title: t('auth.signIn', 'Sign in'), description: t('publicProfile.toast.signInToFollow', 'Please sign in to follow users.') });
      return;
    }

    try {
      const res = await fetch('/api/social/follow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ userId: profileId }),
      });
      const j = await res.json().catch(() => ({} as any));
      if (!res.ok) throw new Error(j?.message || 'Follow failed');
      setIsFollowing(true);
      toast({ title: t('publicProfile.toast.followed.title', 'Following'), description: t('publicProfile.toast.followed.desc', 'You are now following this user.') });
    } catch (e: any) {
      toast({ title: t('common.error', 'Error'), description: e?.message || 'Unable to follow', variant: 'destructive' });
    }
  }

  async function unfollow() {
    const token = localStorage.getItem('token');
    if (!token) {
      toast({ title: t('auth.signIn', 'Sign in'), description: t('publicProfile.toast.signInToUnfollow', 'Please sign in to unfollow users.') });
      return;
    }

    try {
      const res = await fetch('/api/social/unfollow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ userId: profileId }),
      });
      const j = await res.json().catch(() => ({} as any));
      if (!res.ok) throw new Error(j?.message || 'Unfollow failed');
      setIsFollowing(false);
      toast({ title: t('publicProfile.toast.unfollowed.title', 'Unfollowed'), description: t('publicProfile.toast.unfollowed.desc', 'You are no longer following this user.') });
    } catch (e: any) {
      toast({ title: t('common.error', 'Error'), description: e?.message || 'Unable to unfollow', variant: 'destructive' });
    }
  }

  if (!match) return null;

  if (loading) {
    return (
      <div className={`min-h-screen relative overflow-hidden flex items-center justify-center ${getProfileBackgroundClass('dark')}`}>
        <div className="absolute inset-0 pointer-events-none opacity-55 bg-gradient-to-b from-white/5 via-transparent to-black/50" />
        <div className="relative z-10 text-white text-xl">{t('publicProfile.loading', 'Loading profile...')}</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className={`min-h-screen relative overflow-hidden flex items-center justify-center ${getProfileBackgroundClass('dark')}`}>
        <div className="absolute inset-0 pointer-events-none opacity-55 bg-gradient-to-b from-white/5 via-transparent to-black/50" />
        <div className="relative z-10 text-white text-xl">{t('publicProfile.notFound', 'Profile not found')}</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen relative overflow-hidden py-8 px-4 ${getProfileBackgroundClass(profile.theme)}`}>
      <div className="absolute inset-0 pointer-events-none opacity-55 bg-gradient-to-b from-white/5 via-transparent to-black/50" />

      <div className="max-w-4xl mx-auto space-y-6 relative z-10">
        <div className="flex items-center justify-between">
          <a href="/profile" className="text-amber-200 hover:text-amber-100 text-sm">← {t('publicProfile.backToProfile', 'Back to Profile')}</a>
          <a href="/leaderboard" className="text-blue-300 hover:text-blue-200 text-sm">{t('publicProfile.openLeaderboard', 'Leaderboard →')}</a>
        </div>

        <Card className="p-6 bg-slate-900/90 border-slate-700">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-24 h-24 rounded-full bg-black/30 border border-white/10 flex items-center justify-center text-5xl">
              {getAvatarEmoji(profile.avatar || 'default')}
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div
                className={profile.usernameColor ? 'text-3xl font-bold' : 'text-3xl font-bold text-white'}
                style={profile.usernameColor ? { color: profile.usernameColor } : undefined}
              >
                {displayName(profile)} {profile.isPro ? '👑' : ''}
              </div>
              <div className="text-sm text-slate-300 mt-1">Lvl {profile.level} • {profile.xp} XP • Streak {profile.dailyStreak}</div>
              {profile.activePet ? (
                <div className="mt-2 text-sm text-slate-200 flex items-center gap-2">
                  <span className="opacity-90">{t('publicProfile.activePet', 'Active pet')}:</span>
                  <span className="px-2 py-1 rounded bg-black/20 border border-white/10 flex items-center gap-2">
                    <span className="text-base leading-none">{getPetDisplay(profile.activePet).icon}</span>
                    <span>{getPetDisplay(profile.activePet).label}</span>
                  </span>
                </div>
              ) : null}
              {profile.featuredActive ? (
                <div className="mt-2 text-xs text-amber-200">{t('publicProfile.featured', 'Featured profile')}</div>
              ) : null}
            </div>

            <div className="flex gap-2">
              {isMe ? (
                <a href="/profile">
                  <Button variant="outline">{t('publicProfile.editMine', 'Edit')}</Button>
                </a>
              ) : isFollowing ? (
                <Button variant="outline" onClick={unfollow}>{t('publicProfile.unfollow', 'Unfollow')}</Button>
              ) : (
                <Button onClick={follow}>{t('publicProfile.follow', 'Follow')}</Button>
              )}
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-slate-900/90 border-slate-700">
          <div className="text-white font-semibold mb-2">{t('publicProfile.stats', 'Stats')}</div>
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded bg-black/20 border border-white/10 text-center">
              <div className="text-2xl font-bold text-white">{profile.level}</div>
              <div className="text-xs text-slate-300">{t('publicProfile.level', 'Level')}</div>
            </div>
            <div className="p-3 rounded bg-black/20 border border-white/10 text-center">
              <div className="text-2xl font-bold text-white">{profile.xp}</div>
              <div className="text-xs text-slate-300">{t('publicProfile.xp', 'XP')}</div>
            </div>
            <div className="p-3 rounded bg-black/20 border border-white/10 text-center">
              <div className="text-2xl font-bold text-white">{profile.dailyStreak}</div>
              <div className="text-xs text-slate-300">{t('publicProfile.streak', 'Streak')}</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
