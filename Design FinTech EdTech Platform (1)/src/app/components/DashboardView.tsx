import { motion } from 'motion/react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Wallet, PiggyBank, AlertTriangle, TrendingUp, Edit3 } from 'lucide-react';
import { useState } from 'react';

interface DashboardViewProps {
  salary: number;
  onEditIncome: () => void;
}

export default function DashboardView({ salary, onEditIncome }: DashboardViewProps) {
  const emergencyFund = 10000;
  const availableBudget = salary - emergencyFund;

  const [budget] = useState({
    rent: 25000,
    food: 8000,
    transport: 5000,
    shopping: 10000,
    entertainment: 5000,
    savings: 15000,
    investment: 12000,
  });

  const totalAllocated = Object.values(budget).reduce((a, b) => a + b, 0);
  const currentSpending = {
    rent: 25000,
    food: 6500,
    transport: 4500,
    shopping: 10000,
    entertainment: 6000,
    savings: 15000,
    investment: 10000,
  };

  const healthScore = 65;
  const isRiskZone = totalAllocated > availableBudget;

  const pieData = [
    { name: 'Rent', value: budget.rent, color: '#A855F7' },
    { name: 'Savings', value: budget.savings, color: '#10B981' },
    { name: 'Shopping', value: budget.shopping, color: '#EC4899' },
    { name: 'Investment', value: budget.investment, color: '#06B6D4' },
    { name: 'Food', value: budget.food, color: '#F59E0B' },
    { name: 'Transport', value: budget.transport, color: '#14B8A6' },
    { name: 'Entertainment', value: budget.entertainment, color: '#F97316' },
  ];

  const barData = Object.keys(budget).map((key) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    Current: currentSpending[key as keyof typeof currentSpending],
    Budget: budget[key as keyof typeof budget],
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-slate-400">Track your financial health and spending</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <motion.div
          whileHover={{ y: -4 }}
          className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 border border-purple-500/30 rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-2">
            <Wallet className="w-5 h-5 text-purple-400" />
            <button
              onClick={onEditIncome}
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
          <div className="text-slate-400 text-sm mb-1">Monthly Salary</div>
          <div className="text-2xl font-bold text-white">₹{salary.toLocaleString('en-IN')}</div>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className="bg-gradient-to-br from-green-900/30 to-green-800/20 border border-green-500/30 rounded-xl p-5"
        >
          <PiggyBank className="w-5 h-5 text-green-400 mb-2" />
          <div className="text-slate-400 text-sm mb-1">Emergency Fund (Locked)</div>
          <div className="text-2xl font-bold text-white">₹{emergencyFund.toLocaleString('en-IN')}</div>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className="bg-gradient-to-br from-cyan-900/30 to-cyan-800/20 border border-cyan-500/30 rounded-xl p-5"
        >
          <TrendingUp className="w-5 h-5 text-cyan-400 mb-2" />
          <div className="text-slate-400 text-sm mb-1">Available Budget</div>
          <div className="text-2xl font-bold text-white">₹{availableBudget.toLocaleString('en-IN')}</div>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className={`bg-gradient-to-br ${
            healthScore >= 70 ? 'from-green-900/30 to-green-800/20 border-green-500/30' :
            healthScore >= 40 ? 'from-yellow-900/30 to-yellow-800/20 border-yellow-500/30' :
            'from-red-900/30 to-red-800/20 border-red-500/30'
          } border rounded-xl p-5`}
        >
          <AlertTriangle className={`w-5 h-5 mb-2 ${
            healthScore >= 70 ? 'text-green-400' :
            healthScore >= 40 ? 'text-yellow-400' :
            'text-red-400'
          }`} />
          <div className="text-slate-400 text-sm mb-1">Health Score</div>
          <div className="text-2xl font-bold text-white">{healthScore}/100</div>
        </motion.div>
      </div>

      {isRiskZone && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-red-900/40 to-orange-900/40 border border-red-500/50 rounded-xl p-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">⚠️ Financial Risk Zone</h3>
              <p className="text-slate-300 mb-4">
                You are entering a financial risk zone. Your expenses exceed your available budget by ₹{(totalAllocated - availableBudget).toLocaleString('en-IN')}.
              </p>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors">
                  Reduce Entertainment by 20%
                </button>
                <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm transition-colors">
                  Cut Shopping by ₹3,000
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-[#1E293B] border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Budget Allocation</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1E293B',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#fff',
                }}
                formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm" style={{ color: item.color }}>{item.name} {Math.round((item.value / totalAllocated) * 100)}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1E293B] border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Budget vs Spending</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis
                dataKey="name"
                tick={{ fill: '#94A3B8', fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fill: '#94A3B8', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1E293B',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#fff',
                }}
                formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`}
              />
              <Bar dataKey="Current" fill="#A855F7" radius={[8, 8, 0, 0]} />
              <Bar dataKey="Budget" fill="#475569" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
