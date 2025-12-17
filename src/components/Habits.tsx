import React, { useState } from 'react';
import Layout from './Layout';
import { useData } from '../contexts/DataContext';
import { Plus, Trash2, CheckCircle, TrendingUp, Flame } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Habits() {
  const { habits, addHabit, toggleHabit, deleteHabit } = useData();
  const [showModal, setShowModal] = useState(false);
  const [habitName, setHabitName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!habitName.trim()) return;
    addHabit(habitName);
    setHabitName('');
    setShowModal(false);
  };

  const totalStreak = habits.reduce((acc, h) => acc + h.streak, 0);
  const completedToday = habits.filter(h => h.completed).length;

  const chartData = habits.map(h => ({
    name: h.name.length > 15 ? h.name.substring(0, 15) + '...' : h.name,
    streak: h.streak
  }));

  return (
    <Layout>
      <div className="p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl mb-2 text-gray-900 dark:text-white">Habit Tracker</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Build consistency and track your progress
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            Add Habit
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl shadow-lg text-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-purple-100">Total Habits</p>
                <p className="text-3xl">{habits.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-xl shadow-lg text-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-orange-100">Total Streak</p>
                <p className="text-3xl">{totalStreak}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-xl shadow-lg text-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-green-100">Completed Today</p>
                <p className="text-3xl">{completedToday}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Chart */}
        {habits.length > 0 && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
            <h3 className="mb-4 text-gray-900 dark:text-white">Habit Streaks Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="streak" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Habit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {habits.length === 0 ? (
            <div className="col-span-2 bg-white dark:bg-gray-800 p-12 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
              <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 mb-2">No habits yet</p>
              <p className="text-sm text-gray-400">Start building positive habits today!</p>
            </div>
          ) : (
            habits.map(habit => (
              <div
                key={habit.id}
                className={`p-6 rounded-xl shadow-lg border-2 transition-all duration-300 ${
                  habit.completed
                    ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-500'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl mb-2 text-gray-900 dark:text-white">
                      {habit.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Flame className={`w-5 h-5 ${habit.streak > 0 ? 'text-orange-500' : 'text-gray-400'}`} />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {habit.streak} day streak
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteHabit(habit.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleHabit(habit.id)}
                    disabled={habit.completed}
                    className={`flex-1 py-3 px-4 rounded-lg transition-all duration-300 ${
                      habit.completed
                        ? 'bg-green-500 text-white cursor-default'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:scale-105'
                    }`}
                  >
                    {habit.completed ? (
                      <span className="flex items-center justify-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Completed Today!
                      </span>
                    ) : (
                      'Mark as Done'
                    )}
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>{Math.min(habit.streak * 10, 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-600 to-pink-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(habit.streak * 10, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Weekly Challenge Card */}
        {habits.length > 0 && (
          <div className="mt-8 bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-xl shadow-lg text-white">
            <h3 className="mb-2">🎯 Weekly Challenge</h3>
            <p className="text-blue-100 mb-4">
              Complete all {habits.length} habits for 7 consecutive days!
            </p>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-white/20 rounded-lg flex items-center justify-center text-xs"
                >
                  Day {i + 1}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Habit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-6">
              <h2 className="text-2xl mb-6 text-gray-900 dark:text-white">Add New Habit</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                    Habit Name
                  </label>
                  <input
                    type="text"
                    value={habitName}
                    onChange={(e) => setHabitName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    placeholder="e.g., Morning meditation"
                    required
                  />
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    💡 <strong>Tip:</strong> Start with small, achievable habits. Consistency is key!
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    Add Habit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
