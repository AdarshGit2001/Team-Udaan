import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

interface HeroAnimationProps {
  onComplete: () => void;
}

export default function HeroAnimation({ onComplete }: HeroAnimationProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 1000),
      setTimeout(() => setStep(2), 2000),
      setTimeout(() => setStep(3), 3500),
      setTimeout(() => onComplete(), 5000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const expenses = [
    { name: 'Rent', amount: 25000, color: '#A855F7' },
    { name: 'Food', amount: 8000, color: '#06B6D4' },
    { name: 'Shopping', amount: 10000, color: '#EC4899' },
    { name: 'Entertainment', amount: 5000, color: '#F59E0B' },
    { name: 'Transport', amount: 5000, color: '#10B981' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="size-full flex flex-col items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-[#0F172A] to-cyan-900/20" />

      <div className="relative z-10 flex flex-col items-center gap-8">
        {step >= 0 && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="text-center"
          >
            <div className="text-6xl mb-4">💰</div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="text-7xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              ₹80,000
            </motion.div>
            <div className="text-slate-400 text-xl mt-2">Your Monthly Salary</div>
          </motion.div>
        )}

        {step >= 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-3 w-96"
          >
            {expenses.map((expense, index) => (
              <motion.div
                key={expense.name}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="flex items-center justify-between bg-white/5 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/10"
              >
                <span className="text-slate-300">{expense.name}</span>
                <span style={{ color: expense.color }} className="font-semibold">
                  -₹{expense.amount.toLocaleString('en-IN')}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}

        {step >= 2 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mt-8"
          >
            <div className="text-5xl font-bold text-red-400 mb-2">
              ₹27,000
            </div>
            <div className="text-slate-400 text-xl">Remaining</div>
          </motion.div>
        )}

        {step >= 3 && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12"
          >
            <h1 className="text-4xl font-bold text-white mb-4">
              Where did your money go?
            </h1>
            <p className="text-slate-400 text-lg mb-8">
              Let's help you take control of your finances
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg font-semibold shadow-lg shadow-purple-500/50"
              onClick={onComplete}
            >
              Start Your Financial Journey →
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
