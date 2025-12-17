import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import { useData } from '../contexts/DataContext';
import { CheckCircle, TrendingUp, Heart, DollarSign, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

export default function Dashboard() {
  const navigate = useNavigate();
  const { tasks, habits, expenses, income, healthData } = useData();

  const todayTasks = tasks.filter(t => t.category === 'today' && !t.completed);
  const completedTasks = tasks.filter(t => t.completed);
  const totalStreak = habits.reduce((acc, h) => acc + h.streak, 0);
  const totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);
  const savings = income - totalExpenses;

  // Chart data
  const taskData = [
    { name: 'Today', count: todayTasks.length },
    { name: 'Upcoming', count: tasks.filter(t => t.category === 'upcoming').length },
    { name: 'Completed', count: completedTasks.length }
  ];

  const expenseData = expenses.slice(0, 5).map(e => ({
    category: e.category,
    amount: e.amount
  }));

  const habitData = habits.map(h => ({
    name: h.name.split(' ')[0],
    streak: h.streak
  }));

  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <Layout>
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl mb-2 text-gray-900 dark:text-white">Welcome Back! 👋</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Here's your productivity overview for today
          </p>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Today's Tasks Card */}
          <button
            onClick={() => navigate('/tasks')}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-105 text-left group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
            <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-1">Today's Tasks</h3>
            <p className="text-3xl text-gray-900 dark:text-white">{todayTasks.length}</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              {completedTasks.length} completed total
            </p>
          </button>

          {/* Habit Streak Card */}
          <button
            onClick={() => navigate('/habits')}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-105 text-left group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
            </div>
            <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Streak</h3>
            <p className="text-3xl text-gray-900 dark:text-white">{totalStreak}</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              {habits.length} active habits
            </p>
          </button>

          {/* BMI Status Card */}
          <button
            onClick={() => navigate('/health')}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-105 text-left group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
            </div>
            <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-1">BMI Status</h3>
            <p className="text-3xl text-gray-900 dark:text-white">
              {healthData?.bmi ? healthData.bmi.toFixed(1) : '--'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              {healthData?.category || 'Not calculated'}
            </p>
          </button>

          {/* Monthly Savings Card */}
          <button
            onClick={() => navigate('/finance')}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-105 text-left group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 transition-colors" />
            </div>
            <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-1">Savings</h3>
            <p className="text-3xl text-gray-900 dark:text-white">${savings.toFixed(0)}</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              ${totalExpenses.toFixed(0)} spent
            </p>
          </button>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Task Overview Chart */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="mb-4 text-gray-900 dark:text-white">Task Overview</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={taskData}>
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
                <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Expense Distribution */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="mb-4 text-gray-900 dark:text-white">Expense Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="amount"
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Habit Progress */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="mb-4 text-gray-900 dark:text-white">Habit Streaks</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={habitData}>
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
                <Line type="monotone" dataKey="streak" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-xl shadow-lg text-white">
            <h3 className="mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/tasks')}
                className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all py-3 px-4 rounded-lg text-left"
              >
                ✅ Add New Task
              </button>
              <button
                onClick={() => navigate('/habits')}
                className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all py-3 px-4 rounded-lg text-left"
              >
                🎯 Track Habit
              </button>
              <button
                onClick={() => navigate('/finance')}
                className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all py-3 px-4 rounded-lg text-left"
              >
                💰 Log Expense
              </button>
              <button
                onClick={() => navigate('/ai-motivation')}
                className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all py-3 px-4 rounded-lg text-left"
              >
                ✨ Get Motivated
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="mb-4 text-gray-900 dark:text-white">Recent Tasks</h3>
          <div className="space-y-3">
            {tasks.slice(0, 5).map(task => (
              <div 
                key={task.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    task.completed ? 'bg-green-500' : 
                    task.priority === 'High' ? 'bg-red-500' : 
                    task.priority === 'Medium' ? 'bg-yellow-500' : 
                    'bg-blue-500'
                  }`} />
                  <span className={`text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                    {task.name}
                  </span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{task.dueDate}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
