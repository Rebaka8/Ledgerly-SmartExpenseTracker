export type Role = "VIEWER" | "ADMIN";
export type TransactionType = "INCOME" | "EXPENSE";

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: TransactionType;
  description: string;
}

export interface Insight {
  highestExpenseCategory: string;
  highestExpenseAmount: number;
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export interface FilterOptions {
  month: string; // YYYY-MM
  type: TransactionType | "ALL";
  category: string | "ALL";
  searchQuery: string;
}
