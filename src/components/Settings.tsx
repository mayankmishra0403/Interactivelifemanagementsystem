import React, { useState } from 'react';
import Layout from './Layout';
import { useTheme } from '../contexts/ThemeContext';
import { useData } from '../contexts/DataContext';
import { Moon, Sun, Download, RotateCcw, Info, AlertTriangle } from 'lucide-react';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { resetAllData } = useData();
  const [showResetModal, setShowResetModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleExportData = () => {
    const data = {
      tasks: localStorage.getItem('tasks'),
      habits: localStorage.getItem('habits'),
      expenses: localStorage.getItem('expenses'),
      income: localStorage.getItem('income'),
      healthData: localStorage.getItem('healthData'),
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `life-manager-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);

    showToastMessage('Data exported successfully! ✅');
  };

  const handleReset = () => {
    resetAllData();
    setShowResetModal(false);
    showToastMessage('All data has been reset! 🔄');
  };

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <Layout>
      <div className="p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl mb-2 text-gray-900 dark:text-white">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Customize your experience and manage your data
          </p>
        </div>

        {/* Theme Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-6">
          <h2 className="text-xl mb-4 text-gray-900 dark:text-white">Appearance</h2>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="flex items-center gap-3">
              {theme === 'light' ? (
                <Sun className="w-6 h-6 text-yellow-500" />
              ) : (
                <Moon className="w-6 h-6 text-blue-500" />
              )}
              <div>
                <p className="text-gray-900 dark:text-white">Theme</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
                </p>
              </div>
            </div>
            
            <button
              onClick={toggleTheme}
              className={`relative w-16 h-8 rounded-full transition-all duration-300 ${
                theme === 'dark' ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                  theme === 'dark' ? 'translate-x-8' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-6">
          <h2 className="text-xl mb-4 text-gray-900 dark:text-white">Data Management</h2>
          
          <div className="space-y-4">
            {/* Export Data */}
            <button
              onClick={handleExportData}
              className="w-full flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-200 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Download className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-gray-900 dark:text-white">Export Data</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Download all your data as JSON
                  </p>
                </div>
              </div>
              <div className="text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                →
              </div>
            </button>

            {/* Reset Progress */}
            <button
              onClick={() => setShowResetModal(true)}
              className="w-full flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-200 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                  <RotateCcw className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-gray-900 dark:text-white">Reset Progress</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Clear all data and start fresh
                  </p>
                </div>
              </div>
              <div className="text-red-600 dark:text-red-400 group-hover:translate-x-1 transition-transform">
                →
              </div>
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-xl shadow-lg text-white mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Info className="w-6 h-6" />
            <h2 className="text-xl">About This App</h2>
          </div>
          
          <div className="space-y-3 text-sm text-white/90">
            <p>
              <strong>Life Management System</strong> is a unified productivity platform designed to help you manage all aspects of your life in one place.
            </p>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <p className="text-xs text-white/70 mb-1">Version</p>
                <p>1.0.0</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <p className="text-xs text-white/70 mb-1">Created</p>
                <p>December 2025</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features List */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl mb-4 text-gray-900 dark:text-white">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: '✅', title: 'Task Management', desc: 'Organize and prioritize your tasks' },
              { icon: '🎯', title: 'Habit Tracking', desc: 'Build consistency with streak tracking' },
              { icon: '💪', title: 'Health Monitor', desc: 'Track BMI and health metrics' },
              { icon: '💰', title: 'Finance Manager', desc: 'Manage income and expenses' },
              { icon: '🤖', title: 'AI Motivation', desc: 'Get personalized encouragement' },
              { icon: '🌓', title: 'Dark Mode', desc: 'Comfortable viewing experience' }
            ].map((feature, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{feature.icon}</span>
                  <div>
                    <p className="text-gray-900 dark:text-white mb-1">{feature.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Info */}
        <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
          <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
            🎓 <strong>Final Year Project 2025</strong> - Life Management System
          </p>
        </div>

        {/* Reset Confirmation Modal */}
        {showResetModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <h2 className="text-2xl text-gray-900 dark:text-white">Reset All Data?</h2>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                This will permanently delete all your tasks, habits, expenses, and health data. This action cannot be undone.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowResetModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Yes, Reset
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Toast Notification */}
        {showToast && (
          <div className="fixed bottom-8 right-8 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-6 py-4 rounded-xl shadow-2xl animate-slide-up z-50">
            <p>{toastMessage}</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
