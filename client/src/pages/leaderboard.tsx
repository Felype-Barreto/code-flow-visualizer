import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { useUser } from '@/hooks/use-user';
import { Trophy, Flame, Zap, Crown, Medal } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface LeaderboardEntry {
  id: string;
  firstName?: string;
  lastName?: string;
  xp?: number;
  dailyStreak?: number;
  level?: number;
  avatar?: string;
  isPro?: boolean;
}

export default function LeaderboardPage() {
  const { user } = useUser();
  const { t } = useLanguage();
  const [tab, setTab] = useState<'xp' | 'streak'>('xp');
  const [xpLeaderboard, setXpLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [streakLeaderboard, setStreakLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboards();
  }, []);

  const loadLeaderboards = async () => {
    try {
      const [xpRes, streakRes] = await Promise.all([
        fetch('/api/leaderboard/xp?limit=50'),
        fetch('/api/leaderboard/streak?limit=50'),
      ]);

      if (xpRes.ok) {
        const xpData = await xpRes.json();
        setXpLeaderboard(xpData.leaderboard || []);
      }

      if (streakRes.ok) {
        const streakData = await streakRes.json();
        setStreakLeaderboard(streakData.leaderboard || []);
      }
    } catch (error) {
      console.error('Failed to load leaderboards:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAvatarEmoji = (avatar?: string) => {
    const map: Record<string, string> = {
      default: '👤',
      ninja: '🥷',
      robot: '🤖',
      wizard: '🧙',
      alien: '👽',
      pirate: '🏴‍☠️',
      astronaut: '👨‍🚀',
    };
    return map[avatar || 'default'] || '👤';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-300" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />;
    return <span className="text-xl font-bold text-gray-500">#{rank}</span>;
  };

  const currentLeaderboard = tab === 'xp' ? xpLeaderboard : streakLeaderboard;

  const getUserRank = () => {
    if (!user) return null;
    const idx = currentLeaderboard.findIndex((u) => u.id === user.id);
    return idx >= 0 ? idx + 1 : null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent flex items-center justify-center gap-3">
            <Trophy className="w-12 h-12 text-yellow-400" />
            Leaderboard
          </h1>
          <p className="text-blue-300 text-lg">
            Compete with the best coders worldwide
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setTab('xp')}
            className={`px-6 py-3 rounded-lg font-bold text-lg transition-all flex items-center gap-2 ${
              tab === 'xp'
                ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white shadow-lg scale-105'
                : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
            }`}
          >
            <Zap className="w-5 h-5" />
            Top XP
          </button>
          <button
            onClick={() => setTab('streak')}
            className={`px-6 py-3 rounded-lg font-bold text-lg transition-all flex items-center gap-2 ${
              tab === 'streak'
                ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg scale-105'
                : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
            }`}
          >
            <Flame className="w-5 h-5" />
            Top Streak
          </button>
        </div>

        {/* User's rank card */}
        {user && getUserRank() && (
          <Card className="p-4 bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border-blue-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-3xl">{getAvatarEmoji(user.avatar || 'default')}</div>
                <div>
                  <p className="text-white font-bold">Your Rank: #{getUserRank()}</p>
                  <p className="text-blue-300 text-sm">
                    {tab === 'xp' ? `${user.xp || 0} XP` : `${user.dailyStreak || 0} day streak`}
                  </p>
                </div>
              </div>
              {user.isPro && (
                <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-amber-600 text-white text-xs font-bold rounded-full">
                  PRO
                </span>
              )}
            </div>
          </Card>
        )}

        {/* Leaderboard */}
        <div className="space-y-3">
          {loading ? (
            <div className="text-center text-gray-400 py-12">Loading leaderboard...</div>
          ) : currentLeaderboard.length === 0 ? (
            <div className="text-center text-gray-400 py-12">No data yet</div>
          ) : (
            currentLeaderboard.map((entry, idx) => {
              const rank = idx + 1;
              const isCurrentUser = user && entry.id === user.id;

              return (
                <Card
                  key={entry.id}
                  className={`p-4 transition-all ${
                    isCurrentUser
                      ? 'bg-gradient-to-r from-blue-900/60 to-indigo-900/60 border-blue-500 scale-105'
                      : rank <= 3
                        ? 'bg-gradient-to-r from-yellow-900/30 to-amber-900/30 border-yellow-700/50'
                        : 'bg-slate-900/80 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Rank */}
                      <div className="w-12 flex justify-center">{getRankIcon(rank)}</div>

                      {/* Avatar */}
                      <div className="text-4xl">{getAvatarEmoji(entry.avatar)}</div>

                      {/* Info */}
                      <div>
                        <p className="text-white font-bold flex items-center gap-2">
                          {entry.firstName || 'User'} {entry.lastName || ''}
                          {entry.isPro && (
                            <span className="px-2 py-0.5 bg-gradient-to-r from-yellow-500 to-amber-600 text-white text-xs font-bold rounded-full">
                              PRO
                            </span>
                          )}
                        </p>
                        <p className="text-gray-400 text-sm">Level {entry.level || 1}</p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="text-right">
                      {tab === 'xp' ? (
                        <div>
                          <p className="text-2xl font-bold text-yellow-400 flex items-center gap-2">
                            <Zap className="w-5 h-5" />
                            {entry.xp || 0}
                          </p>
                          <p className="text-gray-500 text-xs">XP</p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-2xl font-bold text-orange-400 flex items-center gap-2">
                            <Flame className="w-5 h-5" />
                            {entry.dailyStreak || 0}
                          </p>
                          <p className="text-gray-500 text-xs">days</p>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
