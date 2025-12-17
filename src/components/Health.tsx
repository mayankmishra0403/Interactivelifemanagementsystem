import React, { useState } from 'react';
import Layout from './Layout';
import { useData } from '../contexts/DataContext';
import { Heart, TrendingUp, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Health() {
  const { healthData, setHealthData } = useData();
  const [height, setHeight] = useState(healthData?.height.toString() || '');
  const [weight, setWeight] = useState(healthData?.weight.toString() || '');
  const [showResult, setShowResult] = useState(!!healthData?.bmi);

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault();
    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    const bmi = weightInKg / (heightInMeters * heightInMeters);

    let category = '';
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 25) category = 'Normal';
    else if (bmi < 30) category = 'Overweight';
    else category = 'Obese';

    setHealthData({
      height: parseFloat(height),
      weight: parseFloat(weight),
      bmi,
      category
    });
    setShowResult(true);
  };

  const getBMIColor = (bmi?: number) => {
    if (!bmi) return 'text-gray-500';
    if (bmi < 18.5) return 'text-blue-500';
    if (bmi < 25) return 'text-green-500';
    if (bmi < 30) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getBMIGradient = (bmi?: number) => {
    if (!bmi) return 'from-gray-400 to-gray-500';
    if (bmi < 18.5) return 'from-blue-400 to-blue-600';
    if (bmi < 25) return 'from-green-400 to-green-600';
    if (bmi < 30) return 'from-yellow-400 to-orange-600';
    return 'from-red-400 to-red-600';
  };

  // Mock historical data for trend
  const trendData = [
    { month: 'Jan', bmi: 24.5 },
    { month: 'Feb', bmi: 24.2 },
    { month: 'Mar', bmi: 23.8 },
    { month: 'Apr', bmi: 23.5 },
    { month: 'May', bmi: 23.2 },
    { month: 'Jun', bmi: healthData?.bmi || 23.0 }
  ];

  return (
    <Layout>
      <div className="p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl mb-2 text-gray-900 dark:text-white">Health & BMI</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your Body Mass Index and health metrics
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Card */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl text-gray-900 dark:text-white">BMI Calculator</h2>
            </div>

            <form onSubmit={calculateBMI} className="space-y-6">
              <div>
                <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  placeholder="e.g., 170"
                  required
                  min="100"
                  max="250"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  placeholder="e.g., 70"
                  required
                  min="30"
                  max="300"
                  step="0.1"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Calculate BMI
              </button>
            </form>

            {/* BMI Reference Card */}
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">BMI Categories:</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-400">Underweight: &lt; 18.5</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-400">Normal: 18.5 - 24.9</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-400">Overweight: 25 - 29.9</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-400">Obese: ≥ 30</span>
                </div>
              </div>
            </div>
          </div>

          {/* Result Card */}
          <div className="space-y-6">
            {showResult && healthData ? (
              <>
                <div className={`bg-gradient-to-br ${getBMIGradient(healthData.bmi)} p-8 rounded-xl shadow-lg text-white`}>
                  <div className="flex items-center gap-3 mb-4">
                    <Activity className="w-8 h-8" />
                    <h2 className="text-2xl">Your BMI Result</h2>
                  </div>
                  
                  <div className="text-center py-8">
                    <p className="text-6xl mb-4">{healthData.bmi?.toFixed(1)}</p>
                    <p className="text-2xl text-white/90">{healthData.category}</p>
                  </div>

                  <div className="mt-6 p-4 bg-white/20 backdrop-blur-sm rounded-lg">
                    <p className="text-sm text-white/90">
                      Height: {healthData.height} cm | Weight: {healthData.weight} kg
                    </p>
                  </div>
                </div>

                {/* Health Tips */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    Health Recommendations
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                    {healthData.category === 'Normal' ? (
                      <>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500">✓</span>
                          <span>Great job! Maintain your current weight through balanced diet and exercise.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500">✓</span>
                          <span>Continue regular physical activity (150 minutes per week).</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500">✓</span>
                          <span>Stay hydrated and get adequate sleep.</span>
                        </li>
                      </>
                    ) : healthData.category === 'Underweight' ? (
                      <>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500">•</span>
                          <span>Consider increasing calorie intake with nutritious foods.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500">•</span>
                          <span>Focus on strength training to build muscle mass.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500">•</span>
                          <span>Consult with a healthcare professional for personalized advice.</span>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="flex items-start gap-2">
                          <span className="text-orange-500">!</span>
                          <span>Focus on creating a calorie deficit through diet and exercise.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-orange-500">!</span>
                          <span>Incorporate both cardio and strength training.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-orange-500">!</span>
                          <span>Consult with a healthcare professional for a personalized plan.</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </>
            ) : (
              <div className="bg-white dark:bg-gray-800 p-12 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 text-center">
                <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 mb-2">No BMI data yet</p>
                <p className="text-sm text-gray-400">Enter your height and weight to calculate</p>
              </div>
            )}
          </div>
        </div>

        {/* Health Trend Chart */}
        {showResult && (
          <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="mb-4 text-gray-900 dark:text-white">BMI Trend (Last 6 Months)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" domain={[20, 28]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="bmi"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: '#10b981', r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg text-white">
            <p className="text-sm text-blue-100 mb-1">Water Intake Goal</p>
            <p className="text-3xl mb-2">8 glasses</p>
            <p className="text-xs text-blue-100">Stay hydrated daily</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl shadow-lg text-white">
            <p className="text-sm text-purple-100 mb-1">Exercise Goal</p>
            <p className="text-3xl mb-2">150 min</p>
            <p className="text-xs text-purple-100">Weekly activity</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-xl shadow-lg text-white">
            <p className="text-sm text-green-100 mb-1">Sleep Goal</p>
            <p className="text-3xl mb-2">7-9 hrs</p>
            <p className="text-xs text-green-100">Quality sleep</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
