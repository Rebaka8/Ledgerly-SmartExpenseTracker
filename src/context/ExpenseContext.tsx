import React, { useState, useEffect } from 'react';
import type { Transaction, Role } from '../types';
import { generateMockData } from '../lib/mockData';
import { ExpenseContext } from './useExpenseContext';

export function ExpenseProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('tracker_transactions');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.length > 0) return parsed;
    }
    return generateMockData();
  });

  const [role, setRole] = useState<Role>(() => {
    const saved = localStorage.getItem('tracker_role');
    return (saved as Role) || 'ADMIN';
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('tracker_theme');
    return (saved as 'light' | 'dark') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('tracker_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('tracker_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('tracker_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const addTransaction = (tx: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = {
      ...tx,
      id: crypto.randomUUID()
    };
    setTransactions(prev => [newTx, ...prev]);
  };

  const updateTransaction = (id: string, updated: Omit<Transaction, 'id'>) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...updated, id } : t));
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const exportData = (format: 'csv' | 'json') => {
    let dataStr = '';
    let mimeType = '';
    let ext = '';

    if (format === 'json') {
      dataStr = JSON.stringify(transactions, null, 2);
      mimeType = 'application/json';
      ext = 'json';
    } else {
      // CSV Export
      const headers = ['ID', 'Date', 'Amount', 'Category', 'Type', 'Description'];
      const rows = transactions.map(t => [
        t.id, t.date, t.amount, t.category, t.type, `"${t.description.replace(/"/g, '""')}"`
      ]);
      dataStr = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      mimeType = 'text/csv';
      ext = 'csv';
    }

    const blob = new Blob([dataStr], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `expense_report_${new Date().toISOString().split('T')[0]}.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <ExpenseContext.Provider value={{
      transactions,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      role,
      setRole,
      theme,
      toggleTheme,
      exportData
    }}>
      {children}
    </ExpenseContext.Provider>
  );
}
