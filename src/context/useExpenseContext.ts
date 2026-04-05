import { createContext, useContext } from 'react';
import type { Transaction, Role } from '../types';

export interface ExpenseContextType {
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, tx: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  role: Role;
  setRole: (role: Role) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  exportData: (format: 'csv' | 'json') => void;
}

export const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export function useExpenseContext() {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpenseContext must be used within an ExpenseProvider');
  }
  return context;
}
