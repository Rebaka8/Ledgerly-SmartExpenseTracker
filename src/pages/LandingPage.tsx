import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, BarChart3, Receipt, TrendingUp, Lightbulb, Download, Users,
  Moon, Smartphone, Lock, PieChart, Calendar, Search, ChevronDown, ChevronUp,
  Wallet, Sparkles
} from 'lucide-react';

const FEATURES = [
  { icon: BarChart3, title: 'Dashboard Analytics', desc: 'Real-time visual charts, trend analysis, and spending patterns to help you understand where your money goes.', link: '/dashboard', color: 'bg-primary/15 text-primary' },
  { icon: Receipt, title: 'Expense Tracking', desc: 'Log and categorize every transaction instantly. Track daily spending with smart category breakdowns.', link: '/transactions', color: 'bg-accent/20 text-accent-foreground' },
  { icon: TrendingUp, title: 'Income Management', desc: 'Monitor all income streams including salary, freelance, investments, and bonuses in one unified view.', link: '/dashboard', color: 'bg-success/15 text-success' },
  { icon: Lightbulb, title: 'Budget Insights', desc: 'Smart spending recommendations based on your data. Get actionable insights when patterns emerge.', link: '/dashboard', color: 'bg-destructive/10 text-destructive' },
  { icon: Download, title: 'Data Export', desc: 'Download your financial data as CSV or JSON reports anytime. Perfect for sharing with accountants.', link: '/transactions', color: 'bg-primary/15 text-primary' },
  { icon: Users, title: 'Role-Based Access', desc: 'Switch between Admin and Viewer modes. Admins can manage data; viewers get read-only access.', link: '/transactions', color: 'bg-accent/20 text-accent-foreground' },
  { icon: Moon, title: 'Dark & Light Themes', desc: 'Beautiful, accessible themes that adapt to your preference with smooth transitions.', link: '/', color: 'bg-success/15 text-success' },
  { icon: Smartphone, title: 'Responsive Design', desc: 'Works perfectly on desktop, tablet, and mobile devices. Your finances, anywhere.', link: '/', color: 'bg-destructive/10 text-destructive' },
  { icon: Lock, title: 'Privacy First', desc: 'All data stored locally in your browser. Zero server-side tracking. Your finances stay yours.', link: '/privacy', color: 'bg-primary/15 text-primary' },
  { icon: PieChart, title: 'Category Breakdown', desc: 'Detailed donut charts showing spending by category. Instantly see your biggest expenses.', link: '/dashboard', color: 'bg-accent/20 text-accent-foreground' },
  { icon: Calendar, title: 'Date Filtering', desc: 'Filter transactions by this month, last month, or all time. Compare periods instantly.', link: '/dashboard', color: 'bg-success/15 text-success' },
  { icon: Search, title: 'Smart Search', desc: 'Search transactions by description, category, or amount. Find any transaction in seconds.', link: '/transactions', color: 'bg-destructive/10 text-destructive' },
];

const FAQS = [
  { q: 'What is Ledgerly?', a: 'Ledgerly is a premium, open-source expense tracking application designed to help you monitor, analyze, and optimize your personal finances. It features a beautiful neo-brutalism UI, interactive charts, and powerful data management tools.' },
  { q: 'Is my data secure?', a: 'Absolutely. All your financial data stays entirely in your browser\'s local storage. We do not collect, transmit, or store any personal or financial information on external servers. Your data is 100% private.' },
  { q: 'Is Ledgerly free to use?', a: 'Yes! Ledgerly is completely free and open-source. You can use all features without any payment or subscription. The source code is available on GitHub.' },
  { q: 'Can I export my financial data?', a: 'Yes! You can export your complete transaction history as CSV or JSON files at any time. This makes it easy to keep backups or share data with financial advisors.' },
  { q: 'Is Ledgerly still being developed?', a: 'Yes, Ledgerly is under active development with regular updates and new features. The app will keep improving over time with better analytics, more export options, and enhanced UI/UX.' },
  { q: 'What is the difference between Admin and Viewer roles?', a: 'Admin users can add, edit, and delete transactions. Viewer users have read-only access and can only view and filter data. This simulates role-based access control used in enterprise applications.' },
];

export default function LandingPage() {
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const visibleFeatures = showAllFeatures ? FEATURES : FEATURES.slice(0, 6);

  return (
    <div className="flex flex-col items-center mt-6 space-y-20 pb-20 animate-fade-in">
      {/* Hero Section */}
      <section className="text-center space-y-8 max-w-4xl px-4 animate-slide-up relative">
        <div className="neo-card inline-flex items-center gap-2 px-5 py-2 text-sm font-bold text-primary !rounded-full">
          <Sparkles className="w-4 h-4" />
          Now in Active Development
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-foreground leading-[1.1]">
          Take control of your{' '}
          <span className="relative inline-block">
            <span className="relative z-10">Finances</span>
            <span className="absolute bottom-1 left-0 w-full h-4 bg-accent/40 -z-0 rounded"></span>
          </span>
        </h1>

        <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed font-medium">
          Ledgerly is a premium, open-source expense tracker with powerful analytics, beautiful charts, and a privacy-first approach. Your data, your rules.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link to="/dashboard" className="btn btn-primary text-lg px-8 py-4 w-full sm:w-auto h-14 !rounded-2xl group">
            Open Dashboard
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/transactions" className="btn btn-outline text-lg px-8 py-4 w-full sm:w-auto h-14 !rounded-2xl">
            View Transactions
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-6xl px-4" id="features">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">Features</h2>
          <p className="text-foreground/50 mt-3 text-lg font-medium">Everything you need to master your money</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleFeatures.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="glass-panel p-6 space-y-3 hover:-translate-y-1 transition-transform duration-200">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${f.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{f.title}</h3>
                <p className="text-foreground/60 text-sm leading-relaxed">{f.desc}</p>
                <Link to={f.link} className="text-primary font-bold text-sm hover:underline inline-flex items-center gap-1">
                  Learn More <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={() => setShowAllFeatures(!showAllFeatures)}
            className="btn btn-outline px-8 py-3 !rounded-full text-base"
          >
            {showAllFeatures ? (
              <><ChevronUp className="w-5 h-5 mr-2" /> See Less Features</>
            ) : (
              <><ChevronDown className="w-5 h-5 mr-2" /> See More Features</>
            )}
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full max-w-3xl px-4" id="faq">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">FAQ</h2>
          <p className="text-foreground/50 mt-3 text-lg font-medium">Common questions answered</p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="glass-panel overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-secondary/30 transition-colors"
              >
                <span className="font-bold text-foreground pr-4">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-foreground/40 shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-60 pb-5' : 'max-h-0'}`}>
                <p className="px-5 text-foreground/60 leading-relaxed text-sm">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full max-w-4xl mx-auto text-center px-4">
        <div className="neo-card p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/20 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          <Wallet className="w-14 h-14 mx-auto text-primary mb-6" />
          <h2 className="text-3xl font-black mb-4 relative z-10">Ready to take control?</h2>
          <p className="text-lg text-foreground/60 mb-8 max-w-lg mx-auto font-medium relative z-10">Start tracking your finances today. No account required, no data collected.</p>
          <Link to="/transactions" className="btn btn-primary text-lg px-10 py-4 !rounded-2xl relative z-10">
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}
