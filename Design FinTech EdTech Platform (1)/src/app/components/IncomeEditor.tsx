import { motion } from 'motion/react';
import { X, DollarSign } from 'lucide-react';
import { useState } from 'react';

interface IncomeEditorProps {
  currentSalary: number;
  onSave: (newSalary: number) => void;
  onClose: () => void;
}

export default function IncomeEditor({ currentSalary, onSave, onClose }: IncomeEditorProps) {
  const [salary, setSalary] = useState(currentSalary.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSalary = parseInt(salary);
    if (newSalary > 0) {
      onSave(newSalary);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#1E293B] border border-white/10 rounded-2xl p-8 max-w-md w-full mx-4 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-white mb-2">Customize Your Income</h2>
        <p className="text-slate-400 mb-6">Update your monthly salary to get personalized insights</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-white text-sm block mb-2">Monthly Salary (₹)</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full bg-white/5 border border-purple-500/50 rounded-xl px-10 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                placeholder="Enter your monthly salary"
                required
                min="1"
              />
            </div>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div className="text-sm text-slate-300">
                <p className="font-semibold text-purple-300 mb-1">Auto-allocation will adjust:</p>
                <ul className="space-y-1 text-slate-400">
                  <li>• Emergency fund: ₹{Math.round(parseInt(salary || '0') * 0.125).toLocaleString('en-IN')}</li>
                  <li>• Available budget: ₹{Math.round(parseInt(salary || '0') * 0.875).toLocaleString('en-IN')}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg shadow-purple-500/30"
            >
              Save Changes
            </motion.button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
