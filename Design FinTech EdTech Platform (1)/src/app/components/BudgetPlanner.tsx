import { motion } from 'motion/react';
import { Slider } from '@radix-ui/react-slider';
import { useState, useEffect } from 'react';
import { Lightbulb, TrendingUp, Target } from 'lucide-react';

interface BudgetPlannerProps {
  salary: number;
}

export default function BudgetPlanner({ salary }: BudgetPlannerProps) {
  const availableBudget = salary - 10000;

  const [budgets, setBudgets] = useState({
    rent: 25000,
    food: 8000,
    transport: 5000,
    shopping: 10000,
    entertainment: 5000,
    savings: 15000,
    investment: 12000,
  });

  const totalAllocated = Object.values(budgets).reduce((a, b) => a + b, 0);
  const remaining = availableBudget - totalAllocated;

  const handleBudgetChange = (category: keyof typeof budgets, value: number[]) => {
    setBudgets({ ...budgets, [category]: value[0] });
  };

  const insights = [
    {
      icon: TrendingUp,
      color: 'purple',
      text: 'Consider reducing your shopping budget by ₹2,000 to improve your health score',
    },
    {
      icon: Target,
      color: 'cyan',
      text: 'Increase savings by 5% to reach your emergency fund goal faster',
    },
    {
      icon: Lightbulb,
      color: 'pink',
      text: 'Your investment allocation is optimal for long-term wealth building',
    },
  ];

  const categories = [
    { key: 'rent', label: 'Rent', color: '#A855F7', max: 40000 },
    { key: 'food', label: 'Food', color: '#F59E0B', max: 20000 },
    { key: 'transport', label: 'Transport', color: '#14B8A6', max: 15000 },
    { key: 'shopping', label: 'Shopping', color: '#EC4899', max: 20000 },
    { key: 'entertainment', label: 'Entertainment', color: '#F97316', max: 15000 },
    { key: 'savings', label: 'Savings', color: '#10B981', max: 30000 },
    { key: 'investment', label: 'Investment', color: '#06B6D4', max: 30000 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Budget Planner</h1>
        <p className="text-slate-400">Adjust your budget allocation with smart insights</p>
      </div>

      <div className="bg-[#1E293B] border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-slate-400 text-sm">Total Allocated</div>
            <div className="text-3xl font-bold text-white">₹{totalAllocated.toLocaleString('en-IN')}</div>
          </div>
          <div className="text-right">
            <div className="text-slate-400 text-sm">Remaining</div>
            <div className={`text-3xl font-bold ${remaining >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ₹{Math.abs(remaining).toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        <div className="h-3 bg-white/5 rounded-full overflow-hidden mb-2">
          <div
            className={`h-full transition-all ${remaining >= 0 ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-red-500'}`}
            style={{ width: `${Math.min((totalAllocated / availableBudget) * 100, 100)}%` }}
          />
        </div>
        <div className="text-sm text-slate-400 text-center">
          {((totalAllocated / availableBudget) * 100).toFixed(1)}% of available budget
        </div>
      </div>

      <div className="bg-[#1E293B] border border-white/10 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Adjust Your Budget</h3>
        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category.key}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-white">{category.label}</span>
                <span className="font-semibold" style={{ color: category.color }}>
                  ₹{budgets[category.key as keyof typeof budgets].toLocaleString('en-IN')}
                </span>
              </div>
              <Slider
                value={[budgets[category.key as keyof typeof budgets]]}
                onValueChange={(value) => handleBudgetChange(category.key as keyof typeof budgets, value)}
                max={category.max}
                step={500}
                className="relative flex items-center select-none touch-none w-full h-5"
              >
                <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-white/10">
                  <div className="absolute h-full bg-white/20" />
                </div>
                <div
                  className="block h-5 w-5 rounded-full shadow-lg cursor-pointer transition-transform hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${category.color}, ${category.color}dd)`,
                    boxShadow: `0 0 12px ${category.color}80`,
                  }}
                />
              </Slider>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-500/30 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-purple-400" />
          Smart Insights
        </h3>
        <div className="space-y-3">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    insight.color === 'purple' ? 'bg-purple-500/20 text-purple-400' :
                    insight.color === 'cyan' ? 'bg-cyan-500/20 text-cyan-400' :
                    'bg-pink-500/20 text-pink-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <p className="text-slate-300 text-sm">{insight.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
