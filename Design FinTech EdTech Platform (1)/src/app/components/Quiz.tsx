import { motion, AnimatePresence } from 'motion/react';
import { Brain, CheckCircle2, XCircle, Trophy } from 'lucide-react';
import { useState } from 'react';
import confetti from 'canvas-confetti';

interface QuizProps {
  onQuizComplete: (xp: number) => void;
}

const questions = [
  {
    id: 1,
    category: 'Savings',
    question: 'What is the recommended emergency fund size?',
    options: [
      '1-2 months of expenses',
      '3-6 months of expenses',
      '12 months of expenses',
      'No emergency fund needed',
    ],
    correctAnswer: 1,
    explanation: '3-6 months of expenses is recommended to handle unexpected financial emergencies.',
  },
  {
    id: 2,
    category: 'Investment',
    question: 'What does SIP stand for in investing?',
    options: [
      'Systematic Investment Plan',
      'Simple Interest Payment',
      'Stock Investment Portfolio',
      'Savings Income Plan',
    ],
    correctAnswer: 0,
    explanation: 'SIP stands for Systematic Investment Plan, a method of investing fixed amounts regularly.',
  },
  {
    id: 3,
    category: 'Tax',
    question: 'Under which section can you save tax on health insurance?',
    options: ['Section 80C', 'Section 80D', 'Section 24B', 'Section 10(14)'],
    correctAnswer: 1,
    explanation: 'Section 80D allows deductions for health insurance premiums paid.',
  },
  {
    id: 4,
    category: 'Budgeting',
    question: 'What is the 50-30-20 budgeting rule?',
    options: [
      '50% needs, 30% wants, 20% savings',
      '50% savings, 30% needs, 20% wants',
      '50% wants, 30% savings, 20% needs',
      '50% investments, 30% needs, 20% wants',
    ],
    correctAnswer: 0,
    explanation: 'The 50-30-20 rule allocates 50% to needs, 30% to wants, and 20% to savings.',
  },
  {
    id: 5,
    category: 'Credit',
    question: 'What is a good credit score range?',
    options: ['300-500', '500-650', '650-750', '750-900'],
    correctAnswer: 3,
    explanation: 'A credit score of 750-900 is considered excellent and helps you get better loan terms.',
  },
];

export default function Quiz({ onQuizComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
    setShowExplanation(true);

    if (index === question.correctAnswer) {
      setScore(score + 1);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsComplete(true);
      const earnedXp = score * 20;
      onQuizComplete(earnedXp);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setIsComplete(false);
  };

  if (isComplete) {
    const percentage = (score / questions.length) * 100;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center justify-center min-h-[600px]"
      >
        <div className="max-w-2xl w-full">
          <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-500/30 rounded-2xl p-12 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-6"
            >
              <Trophy className="w-12 h-12 text-white" />
            </motion.div>

            <h2 className="text-4xl font-bold text-white mb-4">Quiz Complete!</h2>
            <p className="text-slate-300 text-lg mb-8">
              You scored {score} out of {questions.length}
            </p>

            <div className="bg-white/5 rounded-xl p-8 mb-8">
              <div className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                {percentage.toFixed(0)}%
              </div>
              <div className="text-slate-400 mb-6">Accuracy</div>

              <div className="grid grid-cols-2 gap-6 text-left">
                <div>
                  <div className="text-green-400 text-2xl font-bold mb-1">{score}</div>
                  <div className="text-slate-400 text-sm">Correct Answers</div>
                </div>
                <div>
                  <div className="text-purple-400 text-2xl font-bold mb-1">+{score * 20} XP</div>
                  <div className="text-slate-400 text-sm">Points Earned</div>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRestart}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg shadow-purple-500/30"
            >
              Try Again
            </motion.button>
          </div>
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
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Financial Knowledge Quiz</h1>
        <p className="text-slate-400">Test your financial knowledge and earn XP</p>
      </div>

      <div className="bg-[#1E293B] border border-white/10 rounded-xl p-2">
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="flex items-center justify-between text-sm text-slate-400 mt-2 px-2">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            {question.category}
          </span>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-500/30 rounded-2xl p-8">
        <h3 className="text-2xl font-semibold text-white mb-8">{question.question}</h3>

        <div className="grid gap-4">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correctAnswer;
            const showResult = showExplanation;

            let className = 'p-6 rounded-xl border-2 transition-all cursor-pointer ';
            if (!showResult) {
              className += isSelected
                ? 'bg-purple-500/20 border-purple-500 text-white'
                : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/30 hover:bg-white/10';
            } else {
              if (isCorrect) {
                className += 'bg-green-500/20 border-green-500 text-white';
              } else if (isSelected && !isCorrect) {
                className += 'bg-red-500/20 border-red-500 text-white';
              } else {
                className += 'bg-white/5 border-white/10 text-slate-400';
              }
            }

            return (
              <motion.button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                whileHover={!showResult ? { scale: 1.02, x: 8 } : {}}
                whileTap={!showResult ? { scale: 0.98 } : {}}
                className={className}
                disabled={showExplanation}
              >
                <div className="flex items-center justify-between">
                  <span className="text-left">{option}</span>
                  {showResult && isCorrect && <CheckCircle2 className="w-6 h-6 text-green-400" />}
                  {showResult && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-red-400" />}
                </div>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className={`mt-6 p-6 rounded-xl border-2 ${
                selectedAnswer === question.correctAnswer
                  ? 'bg-green-500/10 border-green-500/50'
                  : 'bg-orange-500/10 border-orange-500/50'
              }`}
            >
              <div className="flex items-start gap-3">
                {selectedAnswer === question.correctAnswer ? (
                  <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                ) : (
                  <Brain className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                )}
                <div>
                  <h4 className={`font-semibold mb-2 ${
                    selectedAnswer === question.correctAnswer ? 'text-green-300' : 'text-orange-300'
                  }`}>
                    {selectedAnswer === question.correctAnswer ? 'Correct!' : 'Not quite!'}
                  </h4>
                  <p className="text-slate-300">{question.explanation}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {showExplanation && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleNext}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-6 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg shadow-purple-500/30"
          >
            {currentQuestion < questions.length - 1 ? 'Next Question →' : 'See Results'}
          </motion.button>
        )}
      </div>

      <div className="flex items-center justify-center gap-8 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-500" />
          <span className="text-slate-400">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-slate-400">Correct</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-slate-400">Incorrect</span>
        </div>
      </div>
    </motion.div>
  );
}
