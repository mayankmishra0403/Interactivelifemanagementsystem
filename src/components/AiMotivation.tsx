import React, { useState } from 'react';
import Layout from './Layout';
import { Sparkles, Send } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isAi: boolean;
  timestamp: Date;
}

export default function AiMotivation() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI Motivation Coach 🤖 I'm here to help you stay motivated and productive. How can I inspire you today?",
      isAi: true,
      timestamp: new Date()
    }
  ]);

  const suggestions = [
    { emoji: '🎯', text: 'Motivate me', response: "You're doing amazing! Remember, every small step you take is progress. Your dedication to tracking your tasks, habits, and health shows real commitment to personal growth. Keep pushing forward - you've got this! 💪✨" },
    { emoji: '📈', text: 'Improve habits', response: "Building strong habits is key to success! Here are some tips:\n\n✅ Start small - Don't try to change everything at once\n🔄 Be consistent - Do it at the same time each day\n📊 Track progress - Use your habit tracker religiously\n🎉 Celebrate wins - Acknowledge every streak milestone\n💪 Stay patient - It takes 21 days to form a habit\n\nYou're already on the right track by using this app!" },
    { emoji: '⚡', text: 'Boost productivity', response: "Ready to supercharge your productivity? Try these strategies:\n\n🎯 Prioritize ruthlessly - Focus on high-impact tasks first\n⏰ Time blocking - Schedule specific times for each task\n🚫 Eliminate distractions - Turn off notifications\n🎵 Find your zone - Music or silence, whatever works\n☕ Take breaks - 25 min work, 5 min rest (Pomodoro)\n\nYour task manager is the perfect tool to implement these! Let's crush those goals! 🚀" },
    { emoji: '💪', text: 'Stay healthy', response: "Your health is your greatest wealth! 💚\n\n🏃 Move daily - Even 15 minutes makes a difference\n💧 Stay hydrated - 8 glasses of water per day\n🥗 Eat mindfully - Fuel your body with nutrients\n😴 Sleep well - 7-9 hours is optimal\n🧘 Manage stress - Practice meditation or deep breathing\n\nI see you're tracking your BMI - that's awesome! Keep monitoring your health metrics. You're investing in your future self! 🌟" },
    { emoji: '💰', text: 'Financial advice', response: "Smart money management leads to financial freedom! 💸\n\n📊 Track everything - You're already doing this!\n🎯 Set goals - Short-term and long-term savings\n💳 Budget wisely - 50% needs, 30% wants, 20% savings\n🚫 Avoid debt - Live within your means\n📈 Invest early - Start small, compound over time\n\nYour finance tracker shows you're taking control. That's the first step to wealth! Keep it up! 🏆" },
    { emoji: '🎉', text: 'Celebrate progress', response: "Let's celebrate how far you've come! 🎊\n\n✨ You're actively managing your life across multiple areas\n📝 Tasks are getting done - that's real progress!\n🔥 Your habit streaks are building momentum\n💪 You're monitoring your health - investing in yourself\n💰 Financial tracking shows you're responsible\n\nEvery day you show up is a WIN. You're not just dreaming about success - you're actively building it. Be proud of yourself! You deserve it! 🌟👏" }
  ];

  const handleSuggestionClick = (suggestion: typeof suggestions[0]) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: suggestion.text,
      isAi: false,
      timestamp: new Date()
    };

    // Add AI response
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: suggestion.response,
      isAi: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, aiMessage]);
  };

  return (
    <Layout>
      <div className="p-8 max-w-4xl mx-auto h-[calc(100vh-4rem)] flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl text-gray-900 dark:text-white">AI Motivation Bot</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Your personal motivation coach
              </p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto mb-6 space-y-4 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.isAi ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[80%] px-5 py-3 rounded-2xl ${
                  message.isAi
                    ? 'bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-gray-900 dark:text-white'
                    : 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
                }`}
              >
                {message.isAi && (
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span className="text-xs text-purple-600 dark:text-purple-400">AI Coach</span>
                  </div>
                )}
                <p className="whitespace-pre-line text-sm leading-relaxed">{message.text}</p>
                <p className={`text-xs mt-2 ${message.isAi ? 'text-gray-500 dark:text-gray-400' : 'text-white/70'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Suggestion Buttons */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Quick suggestions:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm"
              >
                <span className="mr-2">{suggestion.emoji}</span>
                {suggestion.text}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="mt-6 flex gap-3">
            <input
              type="text"
              placeholder="Type your message... (This is a demo - click suggestions above)"
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              disabled
            />
            <button
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2 opacity-50 cursor-not-allowed"
              disabled
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            💡 This is a demo. Click the suggestion buttons above to get AI responses!
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl text-white">
            <p className="text-sm text-blue-100 mb-1">Daily Quote</p>
            <p className="text-xs">"The secret of getting ahead is getting started."</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-xl text-white">
            <p className="text-sm text-purple-100 mb-1">Your Progress</p>
            <p className="text-xs">You're building momentum every day! 🚀</p>
          </div>
          <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-4 rounded-xl text-white">
            <p className="text-sm text-pink-100 mb-1">Motivation Level</p>
            <p className="text-xs">High Energy Mode Activated! ⚡</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
