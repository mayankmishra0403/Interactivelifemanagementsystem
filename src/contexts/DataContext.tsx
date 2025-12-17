import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Task {
  id: string;
  name: string;
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
  completed: boolean;
  category: 'today' | 'upcoming' | 'completed';
}

export interface Habit {
  id: string;
  name: string;
  streak: number;
  completed: boolean;
  lastCompleted?: string;
}

export interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
}

export interface HealthData {
  height: number;
  weight: number;
  bmi?: number;
  category?: string;
}

interface DataContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  habits: Habit[];
  addHabit: (name: string) => void;
  toggleHabit: (id: string) => void;
  deleteHabit: (id: string) => void;
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  deleteExpense: (id: string) => void;
  income: number;
  setIncome: (amount: number) => void;
  healthData: HealthData | null;
  setHealthData: (data: HealthData) => void;
  resetAllData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const initialTasks: Task[] = [
  {
    id: '1',
    name: 'Complete project documentation',
    priority: 'High',
    dueDate: new Date().toISOString().split('T')[0],
    completed: false,
    category: 'today'
  },
  {
    id: '2',
    name: 'Review codebase',
    priority: 'Medium',
    dueDate: new Date().toISOString().split('T')[0],
    completed: false,
    category: 'today'
  },
  {
    id: '3',
    name: 'Prepare presentation slides',
    priority: 'High',
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    completed: false,
    category: 'upcoming'
  }
];

const initialHabits: Habit[] = [
  { id: '1', name: 'Morning Exercise', streak: 7, completed: false },
  { id: '2', name: 'Read for 30 minutes', streak: 12, completed: false },
  { id: '3', name: 'Drink 8 glasses of water', streak: 5, completed: false }
];

const initialExpenses: Expense[] = [
  { id: '1', amount: 45.99, category: 'Food', date: '2025-12-15' },
  { id: '2', amount: 120.00, category: 'Transport', date: '2025-12-14' },
  { id: '3', amount: 80.50, category: 'Entertainment', date: '2025-12-13' }
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem('habits');
    return saved ? JSON.parse(saved) : initialHabits;
  });

  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : initialExpenses;
  });

  const [income, setIncome] = useState<number>(() => {
    const saved = localStorage.getItem('income');
    return saved ? parseFloat(saved) : 3000;
  });

  const [healthData, setHealthData] = useState<HealthData | null>(() => {
    const saved = localStorage.getItem('healthData');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('income', income.toString());
  }, [income]);

  useEffect(() => {
    if (healthData) {
      localStorage.setItem('healthData', JSON.stringify(healthData));
    }
  }, [healthData]);

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask = { ...task, id: Date.now().toString() };
    setTasks(prev => [...prev, newTask]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed, category: !task.completed ? 'completed' : task.category }
          : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const addHabit = (name: string) => {
    const newHabit = { id: Date.now().toString(), name, streak: 0, completed: false };
    setHabits(prev => [...prev, newHabit]);
  };

  const toggleHabit = (id: string) => {
    setHabits(prev =>
      prev.map(habit =>
        habit.id === id
          ? {
              ...habit,
              completed: !habit.completed,
              streak: !habit.completed ? habit.streak + 1 : habit.streak,
              lastCompleted: !habit.completed ? new Date().toISOString() : habit.lastCompleted
            }
          : habit
      )
    );
  };

  const deleteHabit = (id: string) => {
    setHabits(prev => prev.filter(habit => habit.id !== id));
  };

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense = { ...expense, id: Date.now().toString() };
    setExpenses(prev => [...prev, newExpense]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const resetAllData = () => {
    setTasks(initialTasks);
    setHabits(initialHabits);
    setExpenses(initialExpenses);
    setIncome(3000);
    setHealthData(null);
    localStorage.clear();
  };

  return (
    <DataContext.Provider
      value={{
        tasks,
        addTask,
        toggleTask,
        deleteTask,
        habits,
        addHabit,
        toggleHabit,
        deleteHabit,
        expenses,
        addExpense,
        deleteExpense,
        income,
        setIncome,
        healthData,
        setHealthData,
        resetAllData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};
