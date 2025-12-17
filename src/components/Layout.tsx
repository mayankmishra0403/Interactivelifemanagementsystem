import React from 'react';
import Sidebar from './Sidebar';
import { useTheme } from '../contexts/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { theme } = useTheme();

  return (
    <div className={`flex h-screen overflow-hidden ${theme === 'dark' ? 'dark' : ''}`}>
      <Sidebar />
      <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        {children}
      </div>
    </div>
  );
}
