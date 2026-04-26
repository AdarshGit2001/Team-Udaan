import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import HeroAnimation from './components/HeroAnimation';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';

type Screen = 'hero' | 'login' | 'signup' | 'dashboard';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('hero');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentScreen === 'hero') {
        setCurrentScreen('login');
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentScreen]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentScreen('dashboard');
  };

  const handleSignup = () => {
    setIsAuthenticated(true);
    setCurrentScreen('dashboard');
  };

  return (
    <div className="size-full bg-[#0F172A] overflow-hidden">
      <AnimatePresence mode="wait">
        {currentScreen === 'hero' && (
          <HeroAnimation key="hero" onComplete={() => setCurrentScreen('login')} />
        )}
        {currentScreen === 'login' && (
          <Login
            key="login"
            onLogin={handleLogin}
            onSwitchToSignup={() => setCurrentScreen('signup')}
          />
        )}
        {currentScreen === 'signup' && (
          <Signup
            key="signup"
            onSignup={handleSignup}
            onSwitchToLogin={() => setCurrentScreen('login')}
          />
        )}
        {currentScreen === 'dashboard' && isAuthenticated && (
          <Dashboard key="dashboard" onLogout={() => {
            setIsAuthenticated(false);
            setCurrentScreen('login');
          }} />
        )}
      </AnimatePresence>
    </div>
  );
}
