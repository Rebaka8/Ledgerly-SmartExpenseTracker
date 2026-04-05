import { useState } from 'react';
import type { Transaction, TransactionType } from '../../types';
import { X } from 'lucide-react';

interface TransactionFormProps {
  onClose: () => void;
  onSubmit: (tx: Omit<Transaction, 'id'>) => void;
  initialData?: Transaction | null;
}

const INCOME_CATEGORIES = ["Salary", "Freelance", "Investments", "Bonus", "Other Income"];
const EXPENSE_CATEGORIES = ["Groceries", "Dining", "Rent", "Utilities", "Entertainment", "Transport", "Shopping", "Other Expense"];

export default function TransactionForm({ onClose, onSubmit, initialData }: TransactionFormProps) {
  const [type, setType] = useState<TransactionType>(initialData?.type || 'EXPENSE');
  const [amount, setAmount] = useState(initialData?.amount.toString() || '');
  const [date, setDate] = useState(initialData?.date || new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState(initialData?.category || EXPENSE_CATEGORIES[0]);
  const [description, setDescription] = useState(initialData?.description || '');

  const handleTypeChange = (newType: TransactionType) => {
    setType(newType);
    if (!initialData) {
      setCategory(newType === 'INCOME' ? INCOME_CATEGORIES[0] : EXPENSE_CATEGORIES[0]);
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      type,
      amount: Number(amount),
      date,
      category,
      description
    });
    onClose();
  };

  const categories = type === 'INCOME' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
      <div className="glass-panel w-full max-w-md p-6 relative overflow-hidden bg-card/95 pb-8 shadow-2xl scale-100 animate-slide-up">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary/80 transition-colors"
        >
          <X className="w-5 h-5 text-foreground/50 hover:text-foreground" />
        </button>
        
        <h2 className="text-2xl font-bold mb-6">
          {initialData ? 'Edit Transaction' : 'New Transaction'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2 p-1 bg-secondary/50 rounded-xl">
            <button
              type="button"
              onClick={() => handleTypeChange('EXPENSE')}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                type === 'EXPENSE' ? 'bg-background shadow text-foreground' : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange('INCOME')}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                type === 'INCOME' ? 'bg-background shadow text-foreground' : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              Income
            </button>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground/80">Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-foreground/50 font-medium">₹</span>
              <input 
                type="number" 
                required 
                min="0.01" 
                step="0.01"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-2 border border-border bg-background rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground/80">Date</label>
              <input 
                type="date" 
                required
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full px-3 py-2 border border-border bg-background rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground/80">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-border bg-background rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground/80">Description</label>
            <input 
              type="text"
              required
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-border bg-background rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              placeholder="What was this for?"
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-full py-3 mt-4 text-base rounded-xl shadow-lg shadow-primary/25"
          >
            {initialData ? 'Update Transaction' : 'Save Transaction'}
          </button>
        </form>
      </div>
    </div>
  );
}
