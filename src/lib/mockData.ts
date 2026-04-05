import type { Transaction } from "../types";
import { subMonths, startOfMonth, getDaysInMonth, addDays, format } from "date-fns";

const CATEGORIES = {
  INCOME: ["Salary", "Freelance", "Investments", "Bonus"],
  EXPENSE: ["Groceries", "Dining", "Rent", "Utilities", "Entertainment", "Transport", "Shopping"],
};

export function generateMockData(): Transaction[] {
  const transactions: Transaction[] = [];
  const now = new Date();
  
  // Generate data for the past 3 months
  for (let m = 0; m < 3; m++) {
    const monthBase = subMonths(now, m);
    const start = startOfMonth(monthBase);
    const daysInM = getDaysInMonth(monthBase);
    
    // Add 1-2 income sources per month
    const incomeCount = Math.floor(Math.random() * 2) + 1;
    for (let i = 0; i < incomeCount; i++) {
        const date = addDays(start, Math.floor(Math.random() * daysInM));
        transactions.push({
            id: `seed-inc-${m}-${i}`,
            date: format(date, 'yyyy-MM-dd'),
            amount: 3000 + Math.floor(Math.random() * 2000), // $3k - $5k
            category: CATEGORIES.INCOME[Math.floor(Math.random() * CATEGORIES.INCOME.length)],
            type: "INCOME",
            description: "Monthly revenue stream"
        });
    }

    // Add 10-15 expenses per month
    const expCount = Math.floor(Math.random() * 6) + 10;
    for (let i = 0; i < expCount; i++) {
        const date = addDays(start, Math.floor(Math.random() * daysInM));
        transactions.push({
            id: `seed-exp-${m}-${i}`,
            date: format(date, 'yyyy-MM-dd'),
            amount: 20 + Math.floor(Math.random() * 400), // $20 - $420
            category: CATEGORIES.EXPENSE[Math.floor(Math.random() * CATEGORIES.EXPENSE.length)],
            type: "EXPENSE",
            description: "Regular expense"
        });
    }
  }

  // Sort by date descending
  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
