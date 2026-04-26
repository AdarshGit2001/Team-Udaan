import { motion } from 'motion/react';
import { LogOut, LucideIcon } from 'lucide-react';

interface NavItem {
  id: string;
  icon: LucideIcon;
  label: string;
}

interface SidebarProps {
  navItems: NavItem[];
  currentView: string;
  onViewChange: (view: string) => void;
  userLevel: number;
  xp: number;
  onLogout: () => void;
}

export default function Sidebar({
  navItems,
  currentView,
  onViewChange,
  userLevel,
  xp,
  onLogout,
}: SidebarProps) {
  const maxXp = 1000;
  const xpPercentage = (xp / maxXp) * 100;

  return (
    <div className="w-64 bg-[#1E293B] border-r border-white/10 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1">
          FinSim
        </h1>
        <p className="text-slate-400 text-sm">Learn money by living it</p>
      </div>

      <div className="mx-4 mb-6 p-4 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl border border-purple-500/30">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold">
            U
          </div>
          <div>
            <div className="text-white font-semibold">User</div>
            <div className="text-sm text-purple-300">Level {userLevel}</div>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>XP Progress</span>
            <span>{xp}/{maxXp}</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${xpPercentage}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            />
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-purple-500/20 text-white border border-purple-500/50'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
              {item.id === 'vault' && (
                <span className="ml-auto w-2 h-2 bg-purple-500 rounded-full" />
              )}
            </motion.button>
          );
        })}
      </nav>

      <div className="p-4">
        <motion.button
          onClick={onLogout}
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm">Sign Out</span>
        </motion.button>
      </div>
    </div>
  );
}
