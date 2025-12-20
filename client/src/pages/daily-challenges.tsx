import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/use-user';
import { CheckCircle2, Circle, Flame, Target, Trophy, Lock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';

interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  type: 'exercise' | 'streak' | 'time';
  target: number;
  progress: number;
}

export default function DailyChallengesPage() {
  const { user, refreshUser } = useUser();
  const { t } = useLanguage();
  const [challenges, setChallenges] = useState<DailyChallenge[]>([
    {
      id: 'daily-1',
      title: 'Complete 3 Exercises',
      description: 'Solve any 3 coding exercises today',
      xpReward: 50,
      difficulty: 'easy',
      completed: false,
      type: 'exercise',
      target: 3,
      progress: 0,
    },
    {
      id: 'daily-2',
      title: 'Maintain Your Streak',
      description: 'Keep your daily streak alive',
      xpReward: 25,
      difficulty: 'easy',
      completed: false,
      type: 'streak',
      target: 1,
      progress: 0,
    },
    {
      id: 'daily-3',
      title: 'Study for 30 Minutes',
      description: 'Spend at least 30 minutes learning',
      xpReward: 40,
      difficulty: 'medium',
      completed: false,
      type: 'time',
      target: 1800,
      progress: 0,
    },
    {
      id: 'daily-4',
      title: 'Perfect Score',
      description: 'Get 100% on any exercise',
      xpReward: 75,
      difficulty: 'medium',
      completed: false,
      type: 'exercise',
      target: 1,
      progress: 0,
    },
    {
      id: 'daily-5',
      title: 'Speed Demon',
      description: 'Complete an exercise in under 60 seconds',
      xpReward: 100,
      difficulty: 'hard',
      completed: false,
      type: 'exercise',
      target: 1,
      progress: 0,
    },
  ]);

  const [dailyGoal, setDailyGoal] = useState(3);

  useEffect(() => {
    if (user) {
      setDailyGoal(user.dailyGoal || 3);
      // In a real app, load actual progress from backend
      loadProgress();
    }
  }, [user]);

  const loadProgress = async () => {
    // Simulate loading progress
    // In production, fetch from /api/daily-challenges
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      // For now, set progress based on user stats
      if (user) {
        setChallenges((prev) =>
          prev.map((ch) => {
            if (ch.id === 'daily-2') {
              return {
                ...ch,
                progress: user.dailyStreak || 0,
                completed: (user.dailyStreak || 0) >= 1,
              };
            }
            return ch;
          })
        );
      }
    } catch (error) {
      console.error('Failed to load daily challenges:', error);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-400 bg-green-900/30 border-green-700';
      case 'medium':
        return 'text-yellow-400 bg-yellow-900/30 border-yellow-700';
      case 'hard':
        return 'text-red-400 bg-red-900/30 border-red-700';
      default:
        return 'text-gray-400 bg-gray-900/30 border-gray-700';
    }
  };

  const completedCount = challenges.filter((ch) => ch.completed).length;
  const totalXP = challenges.filter((ch) => ch.completed).reduce((sum, ch) => sum + ch.xpReward, 0);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Please sign in to view daily challenges</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent flex items-center justify-center gap-3">
            <Target className="w-12 h-12 text-yellow-400" />
            Daily Challenges
          </h1>
          <p className="text-blue-300 text-lg">
            Complete challenges to earn bonus XP and FlowCoins
          </p>
        </div>

        {/* Progress Summary */}
        <Card className="p-6 bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border-blue-600">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Today's Progress</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <span className="text-white font-bold">{completedCount} / {challenges.length}</span>
                  <span className="text-gray-400 text-sm">completed</span>
                </div>
                <div className="h-6 w-px bg-gray-600"></div>
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-400" />
                  <span className="text-white font-bold">{totalXP} XP</span>
                  <span className="text-gray-400 text-sm">earned</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Streak</p>
              <p className="text-3xl font-bold text-orange-400 flex items-center gap-2">
                <Flame className="w-8 h-8" />
                {user.dailyStreak || 0}
              </p>
            </div>
          </div>
        </Card>

        {/* Challenges Grid */}
        <div className="space-y-4">
          {challenges.map((challenge) => {
            const progressPercent = Math.min(100, Math.round((challenge.progress / challenge.target) * 100));

            return (
              <Card
                key={challenge.id}
                className={`p-6 transition-all ${
                  challenge.completed
                    ? 'bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-green-600'
                    : 'bg-slate-900/90 border-slate-700 hover:border-slate-600'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    {/* Icon */}
                    <div className="mt-1">
                      {challenge.completed ? (
                        <CheckCircle2 className="w-8 h-8 text-green-400" />
                      ) : (
                        <Circle className="w-8 h-8 text-gray-500" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">{challenge.title}</h3>
                        <span
                          className={`px-3 py-1 text-xs font-bold rounded-full ${getDifficultyColor(
                            challenge.difficulty
                          )}`}
                        >
                          {challenge.difficulty.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-400 mb-3">{challenge.description}</p>

                      {/* Progress bar */}
                      {!challenge.completed && (
                        <div className="mb-2">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-400">
                              Progress: {challenge.progress} / {challenge.target}
                            </span>
                            <span className="text-sm text-gray-400">{progressPercent}%</span>
                          </div>
                          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full transition-all duration-300"
                              style={{ width: `${progressPercent}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {challenge.completed && (
                        <div className="text-green-400 font-semibold text-sm">
                          ✓ Completed! +{challenge.xpReward} XP earned
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Reward */}
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-lg">
                      <Trophy className="w-5 h-5" />
                      +{challenge.xpReward}
                    </div>
                    <p className="text-gray-500 text-xs">XP</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Info Card */}
        <Card className="p-6 bg-slate-900/90 border-slate-700">
          <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-400" />
            About Daily Challenges
          </h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>• Challenges reset every day at midnight UTC</li>
            <li>• Complete challenges to earn bonus XP and FlowCoins</li>
            <li>• Higher difficulty challenges give more rewards</li>
            <li>• Keep your streak alive to unlock special achievements</li>
            <li className="text-yellow-400 font-semibold">• Pro members get exclusive challenges with 2x rewards</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
