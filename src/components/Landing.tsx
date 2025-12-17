import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, TrendingUp, Heart, DollarSign, Sparkles } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo & Brand */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>

          <h1 className="text-6xl mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
            Life Management System
          </h1>

          <p className="text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Manage Health, Habits, Tasks & Finances in One Place
          </p>

          {/* Feature Icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <CheckCircle className="w-10 h-10 text-blue-500 mb-3 mx-auto" />
              <p className="text-sm text-gray-700 dark:text-gray-300">Task Manager</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <TrendingUp className="w-10 h-10 text-purple-500 mb-3 mx-auto" />
              <p className="text-sm text-gray-700 dark:text-gray-300">Habit Tracker</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <Heart className="w-10 h-10 text-green-500 mb-3 mx-auto" />
              <p className="text-sm text-gray-700 dark:text-gray-300">Health & BMI</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <DollarSign className="w-10 h-10 text-emerald-500 mb-3 mx-auto" />
              <p className="text-sm text-gray-700 dark:text-gray-300">Finance Manager</p>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => navigate('/dashboard')}
            className="px-12 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 text-xl"
          >
            Open Dashboard
          </button>

          {/* Bottom Features */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-3xl mx-auto">
            <div className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm">
              <h3 className="mb-2 text-blue-600 dark:text-blue-400">📊 Unified Dashboard</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                All your productivity metrics in one beautiful interface
              </p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm">
              <h3 className="mb-2 text-purple-600 dark:text-purple-400">🤖 AI Motivation</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get personalized encouragement and productivity tips
              </p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm">
              <h3 className="mb-2 text-green-600 dark:text-green-400">🌓 Dark Mode</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Beautiful light and dark themes for comfortable viewing
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
