import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  Target,
  Shield,
  Calculator,
  Brain,
  Trophy,
  TrendingUp,
  LogOut,
  Eye,
  EyeOff,
  Edit3,
} from 'lucide-react';
import Sidebar from './Sidebar';
import DashboardView from './DashboardView';
import BudgetPlanner from './BudgetPlanner';
import EmergencyVault from './EmergencyVault';
import TaxCalculator from './TaxCalculator';
import Quiz from './Quiz';
import Achievements from './Achievements';
import InvestmentSimulator from './InvestmentSimulator';
import LiveTicker from './LiveTicker';
import IncomeEditor from './IncomeEditor';

type View = 'dashboard' | 'budget' | 'vault' | 'tax' | 'quiz' | 'achievements' | 'investment';

interface DashboardProps {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [userLevel, setUserLevel] = useState(3);
  const [xp, setXp] = useState(650);
  const [salary, setSalary] = useState(80000);
  const [showIncomeEditor, setShowIncomeEditor] = useState(false);

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'budget', icon: Target, label: 'Budget Planner' },
    { id: 'vault', icon: Shield, label: 'Emergency Vault' },
    { id: 'tax', icon: Calculator, label: 'Tax Calculator' },
    { id: 'quiz', icon: Brain, label: 'Learn & Quiz' },
    { id: 'achievements', icon: Trophy, label: 'Achievements' },
    { id: 'investment', icon: TrendingUp, label: 'Investment' },
  ];

  return (
    <div className="size-full bg-[#0F172A] flex flex-col overflow-hidden">
      <LiveTicker />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          navItems={navItems}
          currentView={currentView}
          onViewChange={(view) => setCurrentView(view as View)}
          userLevel={userLevel}
          xp={xp}
          onLogout={onLogout}
        />

        <main className="flex-1 overflow-auto">
          <div className="p-8">
            <AnimatePresence mode="wait">
              {currentView === 'dashboard' && (
                <DashboardView
                  key="dashboard"
                  salary={salary}
                  onEditIncome={() => setShowIncomeEditor(true)}
                />
              )}
              {currentView === 'budget' && (
                <BudgetPlanner key="budget" salary={salary} />
              )}
              {currentView === 'vault' && (
                <EmergencyVault key="vault" />
              )}
              {currentView === 'tax' && (
                <TaxCalculator key="tax" salary={salary} />
              )}
              {currentView === 'quiz' && (
                <Quiz
                  key="quiz"
                  onQuizComplete={(earnedXp) => setXp(xp + earnedXp)}
                />
              )}
              {currentView === 'achievements' && (
                <Achievements key="achievements" userLevel={userLevel} xp={xp} />
              )}
              {currentView === 'investment' && (
                <InvestmentSimulator key="investment" />
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>

      {showIncomeEditor && (
        <IncomeEditor
          currentSalary={salary}
          onSave={(newSalary) => {
            setSalary(newSalary);
            setShowIncomeEditor(false);
          }}
          onClose={() => setShowIncomeEditor(false)}
        />
      )}
    </div>
  );
}
