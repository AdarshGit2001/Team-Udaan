import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Calculator, Info, TrendingDown } from 'lucide-react';
import { useState } from 'react';

interface TaxCalculatorProps {
  salary: number;
}

export default function TaxCalculator({ salary: initialSalary }: TaxCalculatorProps) {
  const [salary, setSalary] = useState((initialSalary * 12).toString());
  const [regime, setRegime] = useState<'new' | 'old'>('new');

  const annualSalary = parseInt(salary) || 0;

  const calculateTax = (income: number, regimeType: 'new' | 'old') => {
    let tax = 0;

    if (regimeType === 'new') {
      if (income <= 300000) tax = 0;
      else if (income <= 600000) tax = (income - 300000) * 0.05;
      else if (income <= 900000) tax = 15000 + (income - 600000) * 0.1;
      else if (income <= 1200000) tax = 45000 + (income - 900000) * 0.15;
      else if (income <= 1500000) tax = 90000 + (income - 1200000) * 0.2;
      else tax = 150000 + (income - 1500000) * 0.3;
    } else {
      const standardDeduction = 50000;
      const taxableIncome = income - standardDeduction;

      if (taxableIncome <= 250000) tax = 0;
      else if (taxableIncome <= 500000) tax = (taxableIncome - 250000) * 0.05;
      else if (taxableIncome <= 1000000) tax = 12500 + (taxableIncome - 500000) * 0.2;
      else tax = 112500 + (taxableIncome - 1000000) * 0.3;
    }

    const cess = tax * 0.04;
    return Math.round(tax + cess);
  };

  const totalTax = calculateTax(annualSalary, regime);
  const taxableIncome = annualSalary;
  const takeHome = annualSalary - totalTax;
  const cess = Math.round(totalTax * 0.04 / 1.04);

  const pieData = [
    { name: 'Take Home', value: takeHome, color: '#10B981' },
    { name: 'Income Tax', value: totalTax - cess, color: '#EF4444' },
    { name: 'Cess (4%)', value: cess, color: '#F59E0B' },
  ];

  const savingTips = [
    {
      title: 'Section 80C',
      description: 'Save up to ₹1.5L through PPF, ELSS, Life Insurance',
    },
    {
      title: 'Section 80D',
      description: 'Save ₹25K-₹50K on health insurance premiums',
    },
    {
      title: 'HRA Exemption',
      description: 'Claim exemption on house rent allowance',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Tax Calculator</h1>
        <p className="text-slate-400">Calculate your income tax for FY 2024-25</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="bg-[#1E293B] border border-white/10 rounded-xl p-6">
            <div className="space-y-6">
              <div>
                <label className="text-white text-sm block mb-3">Annual Salary (₹)</label>
                <input
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
              </div>

              <div>
                <label className="text-white text-sm block mb-3">Tax Regime</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setRegime('new')}
                    className={`px-6 py-4 rounded-xl border-2 transition-all ${
                      regime === 'new'
                        ? 'bg-purple-500/20 border-purple-500 text-white'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <div className="font-semibold mb-1">New Regime</div>
                    <div className="text-xs opacity-75">Lower rates, no deductions</div>
                  </button>
                  <button
                    onClick={() => setRegime('old')}
                    className={`px-6 py-4 rounded-xl border-2 transition-all ${
                      regime === 'old'
                        ? 'bg-purple-500/20 border-purple-500 text-white'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <div className="font-semibold mb-1">Old Regime</div>
                    <div className="text-xs opacity-75">Higher rates, with deductions</div>
                  </button>
                </div>

                {regime === 'new' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 flex items-start gap-3"
                  >
                    <Info className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-300">
                      New regime offers lower rates but no deductions. Tax free up to ₹3 lakh.
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-500/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-purple-400" />
              Tax Saving Tips
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {savingTips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-4"
                >
                  <h4 className="font-semibold text-purple-300 mb-2">{tip.title}</h4>
                  <p className="text-sm text-slate-400">{tip.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#1E293B] border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <Calculator className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-semibold text-white">Tax Breakdown</h3>
            </div>

            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="space-y-3 mt-6">
              <div className="flex items-center justify-between py-3 border-b border-white/10">
                <span className="text-slate-400">Taxable Income</span>
                <span className="text-white font-semibold">₹{taxableIncome.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-white/10">
                <span className="text-slate-400">Income Tax</span>
                <span className="text-red-400 font-semibold">₹{(totalTax - cess).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-white/10">
                <span className="text-slate-400">Cess (4%)</span>
                <span className="text-orange-400 font-semibold">₹{cess.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-white/10">
                <span className="text-white font-semibold">Total Tax Payable</span>
                <span className="text-red-400 font-bold">₹{totalTax.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between py-4 bg-gradient-to-r from-green-900/30 to-emerald-900/20 rounded-xl px-4 mt-4">
                <span className="text-white font-semibold">Annual Take Home</span>
                <span className="text-green-400 font-bold text-lg">₹{takeHome.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
