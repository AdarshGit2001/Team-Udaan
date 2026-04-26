import { motion } from 'motion/react';
import { Trophy, Lock, TrendingUp, Target, Brain, Shield, Zap, Star } from 'lucide-react';

interface AchievementsProps {
  userLevel: number;
  xp: number;
}

export default function Achievements({ userLevel, xp }: AchievementsProps) {
  const achievements = [
    {
      id: 1,
      icon: Target,
      title: 'First Budget',
      description: 'Create your first budget plan',
      unlocked: true,
      xp: 50,
      color: 'purple',
    },
    {
      id: 2,
      icon: Shield,
      title: 'Emergency Ready',
      description: 'Build a 3-month emergency fund',
      unlocked: true,
      xp: 100,
      color: 'green',
    },
    {
      id: 3,
      icon: Brain,
      title: 'Knowledge Seeker',
      description: 'Complete 5 financial quizzes',
      unlocked: true,
      xp: 75,
      color: 'cyan',
    },
    {
      id: 4,
      icon: TrendingUp,
      title: 'Investment Beginner',
      description: 'Start your first SIP investment',
      unlocked: false,
      xp: 150,
      color: 'blue',
    },
    {
      id: 5,
      icon: Zap,
      title: 'Savings Streak',
      description: 'Save for 30 consecutive days',
      unlocked: false,
      xp: 200,
      color: 'yellow',
    },
    {
      id: 6,
      icon: Star,
      title: 'Tax Savvy',
      description: 'Optimize tax savings using calculator',
      unlocked: true,
      xp: 100,
      color: 'pink',
    },
  ];

  const getColorClasses = (color: string, unlocked: boolean) => {
    if (!unlocked) {
      return {
        bg: 'bg-white/5',
        border: 'border-white/10',
        icon: 'text-slate-600',
      };
    }

    const colors = {
      purple: { bg: 'bg-purple-500/20', border: 'border-purple-500/50', icon: 'text-purple-400' },
      green: { bg: 'bg-green-500/20', border: 'border-green-500/50', icon: 'text-green-400' },
      cyan: { bg: 'bg-cyan-500/20', border: 'border-cyan-500/50', icon: 'text-cyan-400' },
      blue: { bg: 'bg-blue-500/20', border: 'border-blue-500/50', icon: 'text-blue-400' },
      yellow: { bg: 'bg-yellow-500/20', border: 'border-yellow-500/50', icon: 'text-yellow-400' },
      pink: { bg: 'bg-pink-500/20', border: 'border-pink-500/50', icon: 'text-pink-400' },
    };

    return colors[color as keyof typeof colors];
  };

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalXp = achievements.filter((a) => a.unlocked).reduce((sum, a) => sum + a.xp, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Achievements & Rewards</h1>
        <p className="text-slate-400">Track your progress and unlock badges</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 border border-purple-500/30 rounded-xl p-6">
          <Trophy className="w-8 h-8 text-purple-400 mb-3" />
          <div className="text-3xl font-bold text-white mb-1">{unlockedCount}/{achievements.length}</div>
          <div className="text-slate-400 text-sm">Achievements Unlocked</div>
        </div>

        <div className="bg-gradient-to-br from-cyan-900/30 to-cyan-800/20 border border-cyan-500/30 rounded-xl p-6">
          <Star className="w-8 h-8 text-cyan-400 mb-3" />
          <div className="text-3xl font-bold text-white mb-1">Level {userLevel}</div>
          <div className="text-slate-400 text-sm">Current Level</div>
        </div>

        <div className="bg-gradient-to-br from-pink-900/30 to-pink-800/20 border border-pink-500/30 rounded-xl p-6">
          <Zap className="w-8 h-8 text-pink-400 mb-3" />
          <div className="text-3xl font-bold text-white mb-1">{totalXp} XP</div>
          <div className="text-slate-400 text-sm">Total Earned</div>
        </div>
      </div>

      <div className="bg-[#1E293B] border border-white/10 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Trophy Cabinet</h3>
        <div className="grid grid-cols-3 gap-6">
          {achievements.map((achievement, index) => {
            const Icon = achievement.unlocked ? achievement.icon : Lock;
            const colors = getColorClasses(achievement.color, achievement.unlocked);

            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={achievement.unlocked ? { y: -8, scale: 1.05 } : {}}
                className={`${colors.bg} border-2 ${colors.border} rounded-xl p-6 text-center transition-all ${
                  achievement.unlocked ? 'cursor-pointer' : 'opacity-50'
                }`}
              >
                <div className={`w-16 h-16 rounded-full ${
                  achievement.unlocked
                    ? `bg-gradient-to-br from-${achievement.color}-500 to-${achievement.color}-600`
                    : 'bg-white/5'
                  } flex items-center justify-center mx-auto mb-4 relative`}
                >
                  <Icon className={`w-8 h-8 ${colors.icon}`} />
                  {achievement.unlocked && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                    >
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  )}
                </div>
                <h4 className={`font-semibold mb-2 ${achievement.unlocked ? 'text-white' : 'text-slate-500'}`}>
                  {achievement.title}
                </h4>
                <p className={`text-sm mb-3 ${achievement.unlocked ? 'text-slate-400' : 'text-slate-600'}`}>
                  {achievement.description}
                </p>
                <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs ${
                  achievement.unlocked
                    ? 'bg-white/10 text-slate-300'
                    : 'bg-white/5 text-slate-600'
                }`}>
                  <Zap className="w-3 h-3" />
                  +{achievement.xp} XP
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-500/30 rounded-xl p-8">
        <h3 className="text-xl font-semibold text-white mb-6">Progress to Next Level</h3>
        <div className="flex items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
              <span>Level {userLevel}</span>
              <span>Level {userLevel + 1}</span>
            </div>
            <div className="h-4 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(xp / 1000) * 100}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
              />
            </div>
            <div className="text-sm text-slate-400 mt-2 text-right">{xp} / 1000 XP</div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-white mb-1">{1000 - xp}</div>
            <div className="text-slate-400 text-sm">XP to go</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
