import { motion } from 'motion/react';
import { TrendingUp, AlertCircle, Target, Lightbulb } from 'lucide-react';

const insights = [
  { icon: Target, text: 'Goal: You are 60% towards your ₹50,000 savings target', color: 'text-purple-400' },
  { icon: TrendingUp, text: 'Growth: Your emergency fund grew by +5% this month!', color: 'text-green-400' },
  { icon: Lightbulb, text: 'Tip: Consider starting a SIP with just ₹500/month', color: 'text-cyan-400' },
  { icon: AlertCircle, text: 'Reminder: Review your budget allocation before month-end', color: 'text-orange-400' },
];

export default function LiveTicker() {
  return (
    <div className="bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border-b border-white/10 overflow-hidden py-3">
      <motion.div
        animate={{ x: [0, -2000] }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="flex gap-12 whitespace-nowrap"
      >
        {[...insights, ...insights, ...insights].map((insight, index) => {
          const Icon = insight.icon;
          return (
            <div key={index} className="flex items-center gap-2">
              <Icon className={`w-4 h-4 ${insight.color}`} />
              <span className="text-slate-300 text-sm">{insight.text}</span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
