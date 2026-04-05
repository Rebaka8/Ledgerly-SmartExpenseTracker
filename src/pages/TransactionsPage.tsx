import { useState, useMemo } from 'react';
import { useExpenseContext } from '../context/useExpenseContext';
import TransactionForm from '../components/transactions/TransactionForm';
import type { Transaction } from '../types';
import { Plus, Search, Filter, ArrowDownUp, Edit2, Trash2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';

export default function TransactionsPage() {
  const { transactions, role, addTransaction, updateTransaction, deleteTransaction } = useExpenseContext();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);
  
  // Filters
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'ALL' | 'INCOME' | 'EXPENSE'>('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  
  // Sort
  const [sortField, setSortField] = useState<'date' | 'amount'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const formatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' });

  // Get unique categories for filter
  const categories = useMemo(() => {
    const cats = new Set(transactions.map(t => t.category));
    return ['ALL', ...Array.from(cats)].sort();
  }, [transactions]);

  const filteredAndSorted = useMemo(() => {
    let result = transactions;

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(t => 
        t.description.toLowerCase().includes(q) || 
        t.category.toLowerCase().includes(q) ||
        t.amount.toString().includes(q)
      );
    }

    if (typeFilter !== 'ALL') {
      result = result.filter(t => t.type === typeFilter);
    }

    if (categoryFilter !== 'ALL') {
      result = result.filter(t => t.category === categoryFilter);
    }

    result.sort((a, b) => {
      let comparison = 0;
      if (sortField === 'date') {
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        comparison = a.amount - b.amount;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [transactions, search, typeFilter, categoryFilter, sortField, sortOrder]);

  const handleEdit = (tx: Transaction) => {
    setEditingTx(tx);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      deleteTransaction(id);
    }
  };

  const handleFormSubmit = (data: Omit<Transaction, 'id'>) => {
    if (editingTx) {
      updateTransaction(editingTx.id, data);
    } else {
      addTransaction(data);
    }
    setEditingTx(null);
  };

  const toggleSort = (field: 'date' | 'amount') => {
    if (sortField === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-foreground/60 mt-1">Manage and filter your financial records.</p>
        </div>
        
        {role === 'ADMIN' && (
          <button 
            onClick={() => { setEditingTx(null); setIsFormOpen(true); }}
            className="btn btn-primary px-6"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Transaction
          </button>
        )}
      </div>

      <div className="glass-panel p-4 flex flex-col sm:flex-row gap-4 items-center z-10 relative">
        <div className="relative flex-1 w-full sm:w-auto">
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-foreground/50" />
          <input 
            type="text" 
            placeholder="Search descriptions, amounts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
          />
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <div className="flex items-center gap-2 px-3 py-2 bg-background border border-border rounded-xl whitespace-nowrap">
            <Filter className="w-4 h-4 text-foreground/50" />
            <select 
              value={typeFilter} 
              onChange={(e) => setTypeFilter(e.target.value as 'ALL' | 'INCOME' | 'EXPENSE')}
              className="bg-transparent border-none outline-none text-sm font-medium focus:ring-0"
            >
              <option value="ALL">All Types</option>
              <option value="INCOME">Income</option>
              <option value="EXPENSE">Expense</option>
            </select>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 bg-background border border-border rounded-xl whitespace-nowrap">
            <select 
              value={categoryFilter} 
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-transparent border-none outline-none text-sm font-medium focus:ring-0 max-w-[120px]"
            >
              {categories.map(c => <option key={c} value={c}>{c === 'ALL' ? 'All Categories' : c}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 bg-background border border-border rounded-xl whitespace-nowrap">
            <ArrowDownUp className="w-4 h-4 text-foreground/50" />
            <select 
              value={`${sortField}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortField(field as 'date' | 'amount');
                setSortOrder(order as 'asc' | 'desc');
              }}
              className="bg-transparent border-none outline-none text-sm font-medium focus:ring-0"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="amount-desc">Highest Amount</option>
              <option value="amount-asc">Lowest Amount</option>
            </select>
          </div>
        </div>
      </div>

      <div className="glass-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-secondary/40 text-foreground/70 uppercase text-xs font-semibold border-b border-border">
              <tr>
                <th className="px-6 py-4 cursor-pointer hover:text-foreground transition-colors group" onClick={() => toggleSort('date')}>
                  <div className="flex items-center gap-2">
                    Date
                    <ArrowDownUp className={`w-3 h-3 transition-opacity ${sortField === 'date' ? 'opacity-100 text-primary' : 'opacity-0 group-hover:opacity-50'}`} />
                  </div>
                </th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 cursor-pointer hover:text-foreground transition-colors group" onClick={() => toggleSort('amount')}>
                  <div className="flex items-center gap-2 justify-end">
                    Amount
                    <ArrowDownUp className={`w-3 h-3 transition-opacity ${sortField === 'amount' ? 'opacity-100 text-primary' : 'opacity-0 group-hover:opacity-50'}`} />
                  </div>
                </th>
                {role === 'ADMIN' && <th className="px-6 py-4 text-center">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredAndSorted.length > 0 ? (
                filteredAndSorted.map((tx) => (
                  <tr key={tx.id} className="hover:bg-secondary/20 transition-colors group">
                    <td className="px-6 py-4 font-medium">{format(parseISO(tx.date), 'MMM dd, yyyy')}</td>
                    <td className="px-6 py-4 text-foreground/80">{tx.description}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-secondary/50 rounded-lg text-xs font-medium">
                        {tx.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`font-semibold ${tx.type === 'INCOME' ? 'text-success' : 'text-destructive'}`}>
                        {tx.type === 'INCOME' ? '+' : '-'}{formatter.format(tx.amount)}
                      </span>
                    </td>
                    {role === 'ADMIN' && (
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleEdit(tx)} className="p-1.5 text-foreground/50 hover:text-primary bg-background rounded-lg border border-border/50 hover:border-primary/50 transition-colors" title="Edit">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(tx.id)} className="p-1.5 text-foreground/50 hover:text-destructive bg-background rounded-lg border border-border/50 hover:border-destructive/50 transition-colors" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={role === 'ADMIN' ? 5 : 4} className="px-6 py-12 text-center text-foreground/50">
                    No transactions found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isFormOpen && (
        <TransactionForm 
          onClose={() => {
            setIsFormOpen(false);
            setEditingTx(null);
          }} 
          onSubmit={handleFormSubmit}
          initialData={editingTx}
        />
      )}
    </div>
  );
}
