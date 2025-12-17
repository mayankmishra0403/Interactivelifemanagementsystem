import React, { useState } from 'react';
import Layout from './Layout';
import { useData } from '../contexts/DataContext';
import { Plus, Trash2, DollarSign, TrendingUp, TrendingDown, PieChart as PieChartIcon } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function Finance() {
  const { expenses, addExpense, deleteExpense, income, setIncome } = useData();
  const [showModal, setShowModal] = useState(false);
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    category: 'Food'
  });
  const [incomeInput, setIncomeInput] = useState(income.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || parseFloat(formData.amount) <= 0) return;

    addExpense({
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: new Date().toISOString().split('T')[0]
    });

    setFormData({ amount: '', category: 'Food' });
    setShowModal(false);
  };

  const handleIncomeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newIncome = parseFloat(incomeInput);
    if (newIncome > 0) {
      setIncome(newIncome);
      setShowIncomeModal(false);
    }
  };

  const totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);
  const savings = income - totalExpenses;
  const savingsPercentage = ((savings / income) * 100).toFixed(1);

  // Group expenses by category
  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(categoryTotals).map(([category, amount]) => ({
    name: category,
    value: amount
  }));

  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#06b6d4'];

  const categories = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Health', 'Other'];

  // Monthly trend data (mock)
  const monthlyData = [
    { month: 'Jan', income: 3000, expenses: 2100 },
    { month: 'Feb', income: 3000, expenses: 2300 },
    { month: 'Mar', income: 3000, expenses: 1900 },
    { month: 'Apr', income: 3000, expenses: 2400 },
    { month: 'May', income: 3000, expenses: 2200 },
    { month: 'Jun', income: income, expenses: totalExpenses }
  ];

  return (
    <Layout>
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl mb-2 text-gray-900 dark:text-white">Finance Manager</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Track your income, expenses, and savings
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowIncomeModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <TrendingUp className="w-5 h-5" />
              Set Income
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              Add Expense
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-xl shadow-lg text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <DollarSign className="w-8 h-8 text-white/50" />
            </div>
            <p className="text-sm text-green-100 mb-1">Total Income</p>
            <p className="text-4xl">${income.toFixed(2)}</p>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-pink-600 p-6 rounded-xl shadow-lg text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-6 h-6" />
              </div>
              <DollarSign className="w-8 h-8 text-white/50" />
            </div>
            <p className="text-sm text-red-100 mb-1">Total Expenses</p>
            <p className="text-4xl">${totalExpenses.toFixed(2)}</p>
          </div>

          <div className={`bg-gradient-to-br ${savings >= 0 ? 'from-blue-500 to-indigo-600' : 'from-orange-500 to-red-600'} p-6 rounded-xl shadow-lg text-white`}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                {savingsPercentage}%
              </span>
            </div>
            <p className="text-sm text-blue-100 mb-1">Savings</p>
            <p className="text-4xl">${savings.toFixed(2)}</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Expense Distribution Pie Chart */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <PieChartIcon className="w-5 h-5" />
              Expense Distribution
            </h3>
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
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
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-400">
                No expense data yet
              </div>
            )}
          </div>

          {/* Monthly Trend */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="mb-4 text-gray-900 dark:text-white">Income vs Expenses</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Legend />
                <Bar dataKey="income" fill="#10b981" radius={[8, 8, 0, 0]} />
                <Bar dataKey="expenses" fill="#ef4444" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
          <h3 className="mb-4 text-gray-900 dark:text-white">Spending by Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categories.map((category, index) => {
              const total = categoryTotals[category] || 0;
              return (
                <div
                  key={category}
                  className="p-4 rounded-lg text-center border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-colors"
                  style={{ borderColor: total > 0 ? COLORS[index % COLORS.length] : undefined }}
                >
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{category}</p>
                  <p className="text-xl text-gray-900 dark:text-white">${total.toFixed(0)}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Expenses */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="mb-4 text-gray-900 dark:text-white">Recent Expenses</h3>
          <div className="space-y-3">
            {expenses.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No expenses yet. Add your first expense!
              </div>
            ) : (
              expenses.slice().reverse().map((expense, index) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                      style={{ backgroundColor: COLORS[categories.indexOf(expense.category) % COLORS.length] }}
                    >
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-white">{expense.category}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{expense.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-xl text-gray-900 dark:text-white">
                      ${expense.amount.toFixed(2)}
                    </p>
                    <button
                      onClick={() => deleteExpense(expense.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Add Expense Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-6">
              <h2 className="text-2xl mb-6 text-gray-900 dark:text-white">Add New Expense</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                    Amount ($)
                  </label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="0.00"
                    required
                    min="0.01"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
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
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    Add Expense
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Set Income Modal */}
        {showIncomeModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-6">
              <h2 className="text-2xl mb-6 text-gray-900 dark:text-white">Set Monthly Income</h2>
              <form onSubmit={handleIncomeSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                    Monthly Income ($)
                  </label>
                  <input
                    type="number"
                    value={incomeInput}
                    onChange={(e) => setIncomeInput(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    placeholder="0.00"
                    required
                    min="0.01"
                    step="0.01"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowIncomeModal(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    Set Income
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
