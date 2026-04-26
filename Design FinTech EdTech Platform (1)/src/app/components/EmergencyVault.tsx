import { motion, AnimatePresence } from 'motion/react';
import { Lock, Eye, EyeOff, TrendingUp, Calendar } from 'lucide-react';
import { useState } from 'react';

export default function EmergencyVault() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pin, setPin] = useState('');
  const [showBalance, setShowBalance] = useState(false);
  const [balance] = useState(45000);
  const [goal] = useState(100000);
  const goalProgress = (balance / goal) * 100;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1234' || pin.length >= 4) {
      setIsUnlocked(true);
    }
  };

  const contributions = [
    { date: '15 Apr 2026', amount: 5000 },
    { date: '20 Mar 2026', amount: 5000 },
    { date: '1 Mar 2026', amount: 10000 },
    { date: '15 Feb 2026', amount: 5000 },
  ];

  if (!isUnlocked) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="flex items-center justify-center min-h-[600px]"
      >
        <div className="w-full max-w-md">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-[#1E293B] border border-white/10 rounded-2xl p-8 text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-20 h-20 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-6"
            >
              <Lock className="w-10 h-10 text-purple-400" />
            </motion.div>

            <h2 className="text-2xl font-bold text-white mb-2">Emergency Vault Locked</h2>
            <p className="text-slate-400 mb-8">Enter your PIN to access your secure funds</p>

            <form onSubmit={handlePinSubmit}>
              <div className="mb-6">
                <label className="text-white text-sm block mb-3">Enter PIN</label>
                <input
                  type="password"
                  maxLength={4}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full bg-white/5 border border-purple-500/50 rounded-xl px-6 py-4 text-white text-center text-2xl tracking-widest placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  placeholder="••••"
                  required
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2"
              >
                <Lock className="w-5 h-5" />
                Unlock Vault
              </motion.button>

              <p className="text-slate-500 text-sm mt-4">Demo PIN: 1234 or enter any 4-digit code</p>
            </form>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Emergency Vault</h1>
          <p className="text-slate-400">Your secure emergency fund</p>
        </div>
        <button
          onClick={() => setIsUnlocked(false)}
          className="px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400 hover:bg-red-500/30 transition-all flex items-center gap-2"
        >
          <Lock className="w-4 h-4" />
          Lock Vault
        </button>
      </div>

      <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/20 border border-green-500/30 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center">
              <Lock className="w-7 h-7 text-green-400" />
            </div>
            <div>
              <div className="text-slate-400 text-sm mb-1">Total Balance</div>
              <div className="flex items-center gap-3">
                {showBalance ? (
                  <span className="text-4xl font-bold text-white">
                    ₹{balance.toLocaleString('en-IN')}
                  </span>
                ) : (
                  <span className="text-4xl font-bold text-white">₹••,•••</span>
                )}
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  {showBalance ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-green-400 text-sm flex items-center gap-1 justify-end mb-1">
              <TrendingUp className="w-4 h-4" />
              +5% this month
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Goal Progress</span>
            <span className="text-white font-semibold">
              ₹{balance.toLocaleString('en-IN')} / ₹{goal.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${goalProgress}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
            />
          </div>
          <div className="text-right text-sm text-slate-400">{goalProgress.toFixed(0)}% Complete</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-[#1E293B] border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Add to Vault</h3>
          <form className="space-y-4">
            <div>
              <label className="text-slate-400 text-sm block mb-2">Amount (₹)</label>
              <input
                type="number"
                defaultValue="5000"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold shadow-lg shadow-green-500/30"
            >
              Deposit to Vault
            </motion.button>
          </form>
        </div>

        <div className="bg-[#1E293B] border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Vault Insights</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <span className="text-green-400">•</span>
              <p className="text-sm text-slate-300">Your emergency fund covers 3 months of expenses</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-cyan-400">•</span>
              <p className="text-sm text-slate-300">Average monthly contribution: ₹5,000</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-400">•</span>
              <p className="text-sm text-slate-300">On track to reach ₹1L goal in 11 months</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1E293B] border border-white/10 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Contribution History</h3>
        <div className="space-y-3">
          {contributions.map((contribution, index) => (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between bg-white/5 rounded-xl px-6 py-4 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <div className="text-white font-semibold">Deposit</div>
                  <div className="text-sm text-slate-400 flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    {contribution.date}
                  </div>
                </div>
              </div>
              <div className="text-green-400 font-bold text-lg">
                +₹{contribution.amount.toLocaleString('en-IN')}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
