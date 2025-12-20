import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { useUser } from '@/hooks/use-user';
import { useLanguage } from '@/contexts/LanguageContext';
import { Trophy, Lock, Zap, Target, Calendar, Flame, Brain, Star, Award, Medal } from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  xpReward: number;
  category: 'streak' | 'exercises' | 'speed' | 'accuracy' | 'learning' | 'special';
  requirement: string;
  unlocked: boolean;
  unlockedAt?: string;
  progress?: number;
  total?: number;
}

const ACHIEVEMENTS_CATALOG: Omit<Achievement, 'unlocked' | 'unlockedAt' | 'progress'>[] = [
  // Streak Achievements
  { id: 'streak_3', name: '3-Day Streak', description: 'Complete exercises for 3 days in a row', icon: 'flame', xpReward: 25, category: 'streak', requirement: 'daily_streak >= 3', total: 3 },
  { id: 'streak_7', name: 'Week Warrior', description: 'Complete exercises for 7 days in a row', icon: 'flame', xpReward: 50, category: 'streak', requirement: 'daily_streak >= 7', total: 7 },
  { id: 'streak_30', name: 'Monthly Champion', description: 'Complete exercises for 30 days in a row', icon: 'flame', xpReward: 200, category: 'streak', requirement: 'daily_streak >= 30', total: 30 },
  { id: 'streak_100', name: 'Century Master', description: 'Complete exercises for 100 days in a row', icon: 'flame', xpReward: 500, category: 'streak', requirement: 'daily_streak >= 100', total: 100 },

  // Exercise Achievements
  { id: 'exercises_10', name: 'Getting Started', description: 'Complete 10 exercises', icon: 'trophy', xpReward: 30, category: 'exercises', requirement: 'total_exercises >= 10', total: 10 },
  { id: 'exercises_50', name: 'Coder', description: 'Complete 50 exercises', icon: 'trophy', xpReward: 100, category: 'exercises', requirement: 'total_exercises >= 50', total: 50 },
  { id: 'exercises_100', name: 'Developer', description: 'Complete 100 exercises', icon: 'trophy', xpReward: 250, category: 'exercises', requirement: 'total_exercises >= 100', total: 100 },
  { id: 'exercises_500', name: 'Pro Coder', description: 'Complete 500 exercises', icon: 'trophy', xpReward: 1000, category: 'exercises', requirement: 'total_exercises >= 500', total: 500 },

  // Speed Achievements
  { id: 'speed_demon', name: 'Speed Demon', description: 'Complete an exercise in under 30 seconds', icon: 'zap', xpReward: 50, category: 'speed', requirement: 'fastest_time < 30', total: 1 },
  { id: 'lightning_fast', name: 'Lightning Fast', description: 'Complete 10 exercises in under 1 minute each', icon: 'zap', xpReward: 150, category: 'speed', requirement: 'fast_exercises >= 10', total: 10 },

  // Accuracy Achievements
  { id: 'perfectionist', name: 'Perfectionist', description: 'Get 100% on 10 exercises', icon: 'target', xpReward: 75, category: 'accuracy', requirement: 'perfect_scores >= 10', total: 10 },
  { id: 'flawless', name: 'Flawless', description: 'Get 100% on 50 exercises', icon: 'target', xpReward: 250, category: 'accuracy', requirement: 'perfect_scores >= 50', total: 50 },
  { id: 'master', name: 'Master', description: 'Maintain 95% average score over 100 exercises', icon: 'star', xpReward: 500, category: 'accuracy', requirement: 'avg_score >= 95 AND total_exercises >= 100', total: 100 },

  // Learning Achievements
  { id: 'algorithm_wizard', name: 'Algorithm Wizard', description: 'Complete all algorithm exercises', icon: 'brain', xpReward: 300, category: 'learning', requirement: 'algorithms_complete', total: 1 },
  { id: 'data_master', name: 'Data Structure Master', description: 'Complete all data structure exercises', icon: 'brain', xpReward: 300, category: 'learning', requirement: 'data_structures_complete', total: 1 },
  { id: 'async_pro', name: 'Async Pro', description: 'Complete all async/await exercises', icon: 'brain', xpReward: 200, category: 'learning', requirement: 'async_complete', total: 1 },

  // Special Achievements
  { id: 'pro_starter', name: 'Pro Starter', description: 'Complete your first week as Pro', icon: 'award', xpReward: 100, category: 'special', requirement: 'pro_duration >= 7', total: 7 },
  { id: 'early_bird', name: 'Early Bird', description: 'Complete 10 exercises before 8 AM', icon: 'calendar', xpReward: 100, category: 'special', requirement: 'early_exercises >= 10', total: 10 },
  { id: 'night_owl', name: 'Night Owl', description: 'Complete 10 exercises after 10 PM', icon: 'calendar', xpReward: 100, category: 'special', requirement: 'late_exercises >= 10', total: 10 },
  { id: 'comeback_kid', name: 'Comeback Kid', description: 'Return after a 30-day break and complete 5 exercises', icon: 'medal', xpReward: 150, category: 'special', requirement: 'comeback_exercises >= 5', total: 5 },
];

export default function AchievementsPage() {
  const { user } = useUser();
  const { t } = useLanguage();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/achievements', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setAchievements(data.achievements || []);
      }
    } catch (error) {
      console.error('Failed to load achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Please sign in to view achievements</div>
      </div>
    );
  }

  const filteredAchievements = filter === 'all'
    ? achievements
    : achievements.filter(a => a.category === filter);

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  const completionPercent = totalCount > 0 ? (unlockedCount / totalCount) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-white flex items-center gap-3">
            <Trophy className="w-10 h-10 text-amber-400" />
            Achievements
          </h1>
          <a href="/profile" className="text-blue-400 hover:text-blue-300">
            ← Back to Profile
          </a>
        </div>

        {/* Progress Overview */}
        <Card className="p-6 bg-gradient-to-r from-amber-900/30 to-orange-900/30 border-amber-700">
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2">
                {unlockedCount} / {totalCount} Achievements Unlocked
              </h2>
              <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500"
                  style={{ width: `${completionPercent}%` }}
                />
              </div>
              <p className="text-sm text-amber-200 mt-2">
                {completionPercent.toFixed(1)}% Complete
              </p>
            </div>
            <div className="text-6xl">
              {completionPercent >= 100 ? '🏆' : completionPercent >= 75 ? '🥇' : completionPercent >= 50 ? '🥈' : completionPercent >= 25 ? '🥉' : '🎯'}
            </div>
          </div>
        </Card>

        {/* Filter Tabs */}
        <div className="flex gap-2 flex-wrap">
          {['all', 'streak', 'exercises', 'speed', 'accuracy', 'learning', 'special'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === f
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            <div className="col-span-full text-center text-gray-400 py-8">Loading achievements...</div>
          ) : filteredAchievements.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 py-8">
              No achievements in this category yet
            </div>
          ) : (
            filteredAchievements.map((achievement) => (
              <Card
                key={achievement.id}
                className={`p-6 transition-all ${
                  achievement.unlocked
                    ? 'bg-gradient-to-br from-slate-900 to-slate-800 border-amber-500/50 hover:scale-105'
                    : 'bg-slate-900/50 border-slate-700 opacity-60'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`text-5xl ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                    {achievement.unlocked ? getAchievementIcon(achievement.icon) : <Lock className="w-12 h-12 text-gray-600" />}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-bold text-white mb-1 flex items-center gap-2">
                      {achievement.name}
                      {achievement.unlocked && (
                        <span className="text-xs px-2 py-1 bg-amber-600/30 text-amber-400 rounded-full flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          +{achievement.xpReward}
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-400 mb-3">{achievement.description}</p>

                    {/* Progress Bar */}
                    {!achievement.unlocked && achievement.progress !== undefined && achievement.total !== undefined && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Progress</span>
                          <span>{achievement.progress} / {achievement.total}</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                            style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Unlocked Date */}
                    {achievement.unlocked && achievement.unlockedAt && (
                      <p className="text-xs text-amber-400 mt-2">
                        Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function getAchievementIcon(icon: string) {
  const iconMap: Record<string, string> = {
    flame: '🔥',
    trophy: '🏆',
    zap: '⚡',
    target: '🎯',
    brain: '🧠',
    star: '⭐',
    award: '🏅',
    calendar: '📅',
    medal: '🥇',
  };
  return iconMap[icon] || '🏆';
}
