import { useMemo, useState } from 'react';
import { useExpenseContext } from '../context/useExpenseContext';
import InsightCard from '../components/widgets/InsightCard';
import { Wallet, TrendingUp, ArrowUpRight, ArrowDownRight, Lightbulb } from 'lucide-react';
import { format, parseISO, subMonths, isSameMonth } from 'date-fns';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ['#4f46e5', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#eab308', '#22c55e', '#06b6d4'];

export default function Dashboard() {
  const { transactions } = useExpenseContext();
  const [selectedMonth, setSelectedMonth] = useState<number>(-1); // -1 = all time, 0 = current, 1 = last month

  const filteredTransactions = useMemo(() => {
    if (selectedMonth === -1) return transactions;
    const targetMonth = subMonths(new Date(), selectedMonth);
    return transactions.filter(t => isSameMonth(parseISO(t.date), targetMonth));
  }, [transactions, selectedMonth]);

  const { totalIncome, totalExpense, balance, categoryData, chartData, highestExpenseCategory } = useMemo(() => {
    let inc = 0;
    let exp = 0;
    const catMap: Record<string, number> = {};
    const dateMap: Record<string, { income: number; expense: number }> = {};

    filteredTransactions.forEach(t => {
      const amount = Number(t.amount);
      if (t.type === 'INCOME') {
        inc += amount;
      } else {
        exp += amount;
        catMap[t.category] = (catMap[t.category] || 0) + amount;
      }

      const dateStr = format(parseISO(t.date), 'MMM dd');
      if (!dateMap[dateStr]) dateMap[dateStr] = { income: 0, expense: 0 };
      if (t.type === 'INCOME') dateMap[dateStr].income += amount;
      else dateMap[dateStr].expense += amount;
    });

    const categoryDataArray = Object.entries(catMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    // Cumulative balance for chart

    const sortedDateEntries = Object.entries(dateMap)
      .sort((a, b) => new Date(`${a[0]} ${new Date().getFullYear()}`).getTime() - new Date(`${b[0]} ${new Date().getFullYear()}`).getTime());

    const chartDataArray = [];
    let currentBalance = 0;
    for (const [date, data] of sortedDateEntries) {
      currentBalance += (data.income - data.expense);
      chartDataArray.push({
        date,
        income: data.income,
        expense: data.expense,
        balance: currentBalance
      });
    }

    const highest = categoryDataArray.length > 0 ? categoryDataArray[0] : null;

    return {
      totalIncome: inc,
      totalExpense: exp,
      balance: inc - exp,
      categoryData: categoryDataArray,
      chartData: chartDataArray,
      highestExpenseCategory: highest
    };
  }, [filteredTransactions]);

  const formatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' });

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-foreground/60 mt-1">Track, analyze, and manage your financial metrics.</p>
        </div>
        
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          className="bg-card backdrop-blur-md border border-border text-foreground text-sm rounded-xl px-4 py-2 shadow-sm focus:ring-primary focus:border-primary outline-none"
        >
          <option value="-1">All Time</option>
          <option value="0">This Month</option>
          <option value="1">Last Month</option>
          <option value="2">2 Months Ago</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InsightCard
          title="Total Balance"
          value={formatter.format(balance)}
          icon={<Wallet className="w-6 h-6" />}
          trend={balance >= 0 ? 'up' : 'down'}
          trendValue={balance >= 0 ? '+ Positive' : '- Warning'}
          className="border-t-4 border-t-primary"
        />
        <InsightCard
          title="Total Income"
          value={formatter.format(totalIncome)}
          icon={<ArrowUpRight className="w-6 h-6" />}
          trend="up"
          trendValue="Revenue"
          className="border-t-4 border-t-success"
        />
        <InsightCard
          title="Total Expenses"
          value={formatter.format(totalExpense)}
          icon={<ArrowDownRight className="w-6 h-6" />}
          trend="down"
          trendValue="Outflow"
          className="border-t-4 border-t-destructive"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Chart */}
        <div className="glass-panel p-6 lg:col-span-2 flex flex-col min-h-[400px]">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" /> Cashflow Trend
          </h3>
          <div className="flex-1 w-full relative">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorInc" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="rgb(var(--success))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="rgb(var(--success))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="rgb(var(--destructive))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="rgb(var(--destructive))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgb(var(--border))" opacity={0.5} />
                  <XAxis dataKey="date" stroke="currentColor" fontSize={12} tickLine={false} axisLine={false} opacity={0.5} />
                  <YAxis stroke="currentColor" fontSize={12} tickLine={false} axisLine={false} opacity={0.5} tickFormatter={(val) => `₹${val}`} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: '1px solid rgb(var(--border) / 0.6)', background: 'rgb(var(--card) / 0.7)', backdropFilter: 'blur(12px)', color: 'rgb(var(--foreground))' }}
                    itemStyle={{ color: 'rgb(var(--foreground))' }}
                  />
                  <Area type="monotone" dataKey="income" stroke="rgb(var(--success))" fillOpacity={1} fill="url(#colorInc)" strokeWidth={3} />
                  <Area type="monotone" dataKey="expense" stroke="rgb(var(--destructive))" fillOpacity={1} fill="url(#colorExp)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-foreground/50">
                No data available for this period
              </div>
            )}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="glass-panel p-6 flex flex-col min-h-[400px]">
          <h3 className="text-lg font-semibold mb-6">Spending Breakdown</h3>
          <div className="flex-1 w-full relative -mt-4">
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {categoryData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    formatter={(value: any) => formatter.format(Number(value) || 0)}
                    contentStyle={{ borderRadius: '12px', border: '1px solid rgb(var(--border) / 0.6)', background: 'rgb(var(--card) / 0.7)', color: 'rgb(var(--foreground))' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-foreground/50">
                No expenses recorded
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Dynamic Insights / Observation AI Simulator */}
      <div className="glass-panel p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-l-4 border-l-primary flex items-start gap-4">
        <div className="bg-primary/20 p-3 rounded-full mt-1">
          <Lightbulb className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-bold">Key Insight</h3>
          <p className="text-foreground/80 mt-1 leading-relaxed">
            {highestExpenseCategory 
              ? `Your highest spending category this period is '${highestExpenseCategory.name}' at ${formatter.format(highestExpenseCategory.value)}. Consider creating a specialized budget targeted at this category to maximize your savings.`
              : 'Add some transactions to receive personalized data-driven insights here.'}
            {totalIncome > totalExpense 
              ? ` Great job keeping expenses (${formatter.format(totalExpense)}) below your income (${formatter.format(totalIncome)})! Keep this up.`
              : totalIncome > 0 ? ` Caution: Your expenses are exceeding your income by ${formatter.format(totalExpense - totalIncome)}.` : ''}
          </p>
        </div>
      </div>
    </div>
  );
}
