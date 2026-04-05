import { Link, useLocation } from 'react-router-dom';
import { Globe, Link as LinkIcon, LayoutDashboard, ListOrdered, Shield, FileText, Home } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  const location = useLocation();

  if (location.pathname === '/dashboard' || location.pathname === '/transactions') {
    return null;
  }

  return (
    <footer className="w-full mt-24">
      {/* Top border accent */}
      <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-success opacity-60" />

      {/* Main Footer Grid */}
      <div className="bg-card border-t-[3px] border-foreground/8 dark:border-border/20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

            {/* Col 1 — Product */}
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-xs font-black uppercase tracking-widest text-foreground/40 mb-5">Product</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="group flex items-center gap-2 text-sm font-semibold text-foreground/60 hover:text-primary transition-colors">
                    <Home className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="group flex items-center gap-2 text-sm font-semibold text-foreground/60 hover:text-primary transition-colors">
                    <LayoutDashboard className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/transactions" className="group flex items-center gap-2 text-sm font-semibold text-foreground/60 hover:text-primary transition-colors">
                    <ListOrdered className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                    Transactions
                  </Link>
                </li>
                <li>
                  <Link to="/#features" className="text-sm font-semibold text-foreground/60 hover:text-primary transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/#faq" className="text-sm font-semibold text-foreground/60 hover:text-primary transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 2 — Legal */}
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-xs font-black uppercase tracking-widest text-foreground/40 mb-5">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/privacy" className="group flex items-center gap-2 text-sm font-semibold text-foreground/60 hover:text-primary transition-colors">
                    <Shield className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="group flex items-center gap-2 text-sm font-semibold text-foreground/60 hover:text-primary transition-colors">
                    <FileText className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3 — Developer */}
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-xs font-black uppercase tracking-widest text-foreground/40 mb-5">Developer</h4>
              <p className="text-sm font-semibold text-foreground/70 mb-1">
                Developed by
              </p>
              <p className="text-base font-black text-foreground mb-5">Rebaka Meda</p>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://www.linkedin.com/in/rebaka-meda-6832b2367"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl border-2 border-foreground/10 bg-background hover:border-primary hover:text-primary text-foreground/60 transition-all text-xs font-bold group"
                >
                  <LinkIcon className="w-4 h-4 group-hover:text-primary transition-colors" />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/Rebaka8"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl border-2 border-foreground/10 bg-background hover:border-foreground hover:text-foreground text-foreground/60 transition-all text-xs font-bold group"
                >
                  <Globe className="w-4 h-4" />
                  GitHub
                </a>
              </div>
            </div>

            {/* Col 4 — Status */}
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-xs font-black uppercase tracking-widest text-foreground/40 mb-5">Status</h4>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 border-2 border-accent/30 mb-4">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                <span className="text-xs font-bold text-foreground/70">In Development</span>
              </div>
              <p className="text-xs text-foreground/50 leading-relaxed">
                Ledgerly is actively being improved. Features may be added or updated at any time. Data is stored locally in your browser.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Giant Brand Block — Expensify-style */}
      <div className="bg-background border-t-[3px] border-foreground/8 dark:border-border/20 overflow-hidden">
        {/* Disclaimer strip */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pt-10">
          <div className="rounded-2xl border-2 border-foreground/10 bg-secondary px-6 py-4 shadow-sm relative overflow-hidden">
            {/* Subtle accent line on the left side to keep it interesting */}
            <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-accent"></div>
            <p className="text-xs text-foreground/70 leading-relaxed font-medium pl-2">
              <span className="font-black text-foreground">Disclaimer:</span>{' '}
              This app is for personal finance tracking and educational purposes only. It does not constitute financial advice. Please consult a professional for investment decisions. All data is stored exclusively in your browser — we never collect or transmit your information.
            </p>
          </div>
        </div>

        {/* Giant "Ledgerly" wordmark */}
        <div className="px-4 pt-6 pb-2 overflow-hidden">
          <p
            className="font-black text-center leading-none tracking-tighter select-none"
            style={{
              fontSize: 'clamp(5rem, 18vw, 18rem)',
              color: 'transparent',
              WebkitTextStroke: '2px rgb(var(--primary) / 0.25)',
              textShadow: 'none',
            }}
          >
            Ledgerly
          </p>
        </div>
      </div>

      {/* Absolute bottom bar */}
      <div className="bg-foreground dark:bg-card border-t-[3px] border-foreground">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-primary-foreground/80 dark:text-foreground/50 text-xs font-bold">
            © {year} Ledgerly · Smart Expense Tracker
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/privacy"
              className="text-primary-foreground/60 dark:text-foreground/40 hover:text-accent transition-colors text-xs font-bold"
            >
              Privacy Policy
            </Link>
            <span className="text-primary-foreground/20 dark:text-foreground/20">·</span>
            <Link
              to="/terms"
              className="text-primary-foreground/60 dark:text-foreground/40 hover:text-accent transition-colors text-xs font-bold"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
