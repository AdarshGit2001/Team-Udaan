import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, PieChart as PieChartIcon, Percent, AlertCircle } from 'lucide-react';
import { Slider } from '@radix-ui/react-slider';
import { useState } from 'react';

export default function InvestmentSimulator() {
  const [allocations, setAllocations] = useState({
    sip: 5000,
    stocks: 3000,
    savings: 4000,
  });

  const total = Object.values(allocations).reduce((a, b) => a + b, 0);

  const handleAllocationChange = (key: keyof typeof allocations, value: number[]) => {
    setAllocations({ ...allocations, [key]: value[0] });
  };

  const calculateProjection = () => {
    const months = 12;
    const data = [];

    for (let i = 0; i <= months; i++) {
      const sipReturn = allocations.sip * i * (1 + 0.12 / 12);
      const stockReturn = allocations.stocks * i * (1 + 0.15 / 12);
      const savingsReturn = allocations.savings * i * (1 + 0.04 / 12);

      data.push({
        month: i,
        value: Math.round(sipReturn + stockReturn + savingsReturn),
        invested: (allocations.sip + allocations.stocks + allocations.savings) * i,
      });
    }

    return data;
  };

  const projectionData = calculateProjection();
  const finalValue = projectionData[projectionData.length - 1].value;
  const totalInvested = projectionData[projectionData.length - 1].invested;
  const returns = finalValue - totalInvested;
  const returnPercentage = totalInvested > 0 ? ((returns / totalInvested) * 100).toFixed(2) : '0';

  const getRiskLevel = () => {
    const stockPercentage = (allocations.stocks / total) * 100;
    if (stockPercentage > 60) return { level: 'High', color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/50' };
    if (stockPercentage > 30) return { level: 'Medium', color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/50' };
    return { level: 'Low', color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500/50' };
  };

  const risk = getRiskLevel();

  const investments = [
    {
      key: 'sip',
      label: 'SIP (Mutual Funds)',
      color: '#A855F7',
      returns: '12% p.a.',
      risk: 'Medium',
      max: 20000,
    },
    {
      key: 'stocks',
      label: 'Direct Stocks',
      color: '#EC4899',
      returns: '15% p.a.',
      risk: 'High',
      max: 15000,
    },
    {
      key: 'savings',
      label: 'Savings Account',
      color: '#10B981',
      returns: '4% p.a.',
      risk: 'Low',
      max: 15000,
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
        <h1 className="text-3xl font-bold text-white mb-2">Investment Simulator</h1>
        <p className="text-slate-400">Plan and visualize your investment strategy</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 border border-purple-500/30 rounded-xl p-5">
          <TrendingUp className="w-5 h-5 text-purple-400 mb-2" />
          <div className="text-slate-400 text-sm mb-1">Monthly Investment</div>
          <div className="text-2xl font-bold text-white">₹{total.toLocaleString('en-IN')}</div>
        </div>

        <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 border border-green-500/30 rounded-xl p-5">
          <PieChartIcon className="w-5 h-5 text-green-400 mb-2" />
          <div className="text-slate-400 text-sm mb-1">Projected Value (1Y)</div>
          <div className="text-2xl font-bold text-white">₹{finalValue.toLocaleString('en-IN')}</div>
        </div>

        <div className="bg-gradient-to-br from-cyan-900/30 to-cyan-800/20 border border-cyan-500/30 rounded-xl p-5">
          <Percent className="w-5 h-5 text-cyan-400 mb-2" />
          <div className="text-slate-400 text-sm mb-1">Expected Returns</div>
          <div className="text-2xl font-bold text-white">+{returnPercentage}%</div>
        </div>

        <div className={`bg-gradient-to-br ${risk.bg} border ${risk.border} rounded-xl p-5`}>
          <AlertCircle className={`w-5 h-5 ${risk.color} mb-2`} />
          <div className="text-slate-400 text-sm mb-1">Risk Level</div>
          <div className={`text-2xl font-bold ${risk.color}`}>{risk.level}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-[#1E293B] border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Allocate Your Investment</h3>
          <div className="space-y-6">
            {investments.map((investment) => (
              <div key={investment.key}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-white font-medium">{investment.label}</div>
                    <div className="text-sm text-slate-400">
                      {investment.returns} • {investment.risk} Risk
                    </div>
                  </div>
                  <span className="font-semibold" style={{ color: investment.color }}>
                    ₹{allocations[investment.key as keyof typeof allocations].toLocaleString('en-IN')}
                  </span>
                </div>
                <Slider
                  value={[allocations[investment.key as keyof typeof allocations]]}
                  onValueChange={(value) =>
                    handleAllocationChange(investment.key as keyof typeof allocations, value)
                  }
                  max={investment.max}
                  step={500}
                  className="relative flex items-center select-none touch-none w-full h-5"
                >
                  <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-white/10">
                    <div className="absolute h-full bg-white/20" />
                  </div>
                  <div
                    className="block h-5 w-5 rounded-full shadow-lg cursor-pointer transition-transform hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${investment.color}, ${investment.color}dd)`,
                      boxShadow: `0 0 12px ${investment.color}80`,
                    }}
                  />
                </Slider>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-white font-semibold">Total Monthly</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                ₹{total.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-[#1E293B] border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Growth Projection (12 Months)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={projectionData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#A855F7" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#A855F7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                tick={{ fill: '#94A3B8', fontSize: 12 }}
                tickFormatter={(value) => `M${value}`}
              />
              <YAxis
                tick={{ fill: '#94A3B8', fontSize: 12 }}
                tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1E293B',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#fff',
                }}
                formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Value']}
                labelFormatter={(label) => `Month ${label}`}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#A855F7"
                strokeWidth={3}
                fill="url(#colorValue)"
              />
              <Area
                type="monotone"
                dataKey="invested"
                stroke="#94A3B8"
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="transparent"
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 text-sm mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              <span className="text-slate-400">Portfolio Value</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-1 bg-slate-400" />
              <span className="text-slate-400">Amount Invested</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-500/30 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Investment Insights</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
            <div className="text-sm text-slate-400 mb-2">Total Invested</div>
            <div className="text-xl font-bold text-white">₹{totalInvested.toLocaleString('en-IN')}</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
            <div className="text-sm text-slate-400 mb-2">Expected Returns</div>
            <div className="text-xl font-bold text-green-400">+₹{returns.toLocaleString('en-IN')}</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
            <div className="text-sm text-slate-400 mb-2">Future Value</div>
            <div className="text-xl font-bold text-purple-400">₹{finalValue.toLocaleString('en-IN')}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
