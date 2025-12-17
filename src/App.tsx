import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { DataProvider } from './contexts/DataContext';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import Tasks from './components/Tasks';
import Habits from './components/Habits';
import Health from './components/Health';
import Finance from './components/Finance';
import AiMotivation from './components/AiMotivation';
import Settings from './components/Settings';

export default function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/habits" element={<Habits />} />
            <Route path="/health" element={<Health />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/ai-motivation" element={<AiMotivation />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </DataProvider>
    </ThemeProvider>
  );
}
