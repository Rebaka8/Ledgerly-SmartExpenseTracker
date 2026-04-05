import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useExpenseContext } from '../../context/useExpenseContext';
import { Moon, Sun, LayoutDashboard, ListOrdered, Download, Home, Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { Role } from '../../types';

export default function Navbar() {
  const { role, setRole, theme, toggleTheme, exportData } = useExpenseContext();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Transactions', path: '/transactions', icon: ListOrdered },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 lg:px-8 pt-4">
      <nav className={cn(
        'mx-auto transition-all duration-300',
        scrolled
          ? 'max-w-5xl glass-panel px-5 py-3 bg-card/95'
          : 'max-w-7xl'
      )}>
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-card border-2 border-foreground/10 group-hover:border-primary/50 transition-colors shadow-[3px_3px_0px_rgb(var(--foreground)/0.06)]">
              {/* Wallet SVG matching reference image */}
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="rgb(var(--primary))" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 18V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"/>
                <path d="M3 10h18"/>
                <circle cx="17" cy="14" r="1.5" fill="rgb(var(--primary))" stroke="none"/>
              </svg>
            </div>
            <span className="font-black text-xl tracking-tight text-foreground">
              Ledger<span className="text-primary">ly</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-bold transition-all duration-200',
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-[3px_3px_0px_rgb(var(--foreground)/0.15)]'
                      : 'text-foreground/60 hover:bg-secondary/70 hover:text-foreground'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Right Controls */}
          <div className="hidden md:flex items-center gap-2">
            {/* Export Buttons */}
            <div className="flex items-center gap-1 border-r border-foreground/10 pr-2 mr-1">
              <button onClick={() => exportData('csv')} title="Export CSV"
                className="btn btn-outline text-xs px-2.5 py-1.5 h-8 gap-1 !rounded-lg">
                <Download className="w-3 h-3" /> CSV
              </button>
              <button onClick={() => exportData('json')} title="Export JSON"
                className="btn btn-outline text-xs px-2.5 py-1.5 h-8 gap-1 !rounded-lg">
                <Download className="w-3 h-3" /> JSON
              </button>
            </div>

            {/* Role Switcher */}
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className="bg-secondary border-2 border-foreground/10 text-foreground text-xs font-bold rounded-xl px-2 py-1.5 outline-none cursor-pointer h-8"
            >
              <option value="VIEWER">👁 Viewer</option>
              <option value="ADMIN">🛡 Admin</option>
            </select>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="h-8 w-8 flex items-center justify-center rounded-xl bg-secondary border-2 border-foreground/10 hover:border-primary/40 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark'
                ? <Sun className="w-4 h-4 text-yellow-400" />
                : <Moon className="w-4 h-4 text-foreground/60" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden h-9 w-9 flex items-center justify-center rounded-xl bg-secondary border-2 border-foreground/10"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-foreground/10 space-y-1 pb-2">
            {links.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground/60 hover:bg-secondary hover:text-foreground'
                  )}
                >
                  <Icon className="w-4 h-4" /> {item.name}
                </Link>
              );
            })}
            <div className="flex items-center gap-2 px-4 pt-2">
              <button onClick={() => exportData('csv')} className="btn btn-outline text-xs px-3 py-1.5 h-8 !rounded-lg gap-1"><Download className="w-3 h-3" />CSV</button>
              <button onClick={() => exportData('json')} className="btn btn-outline text-xs px-3 py-1.5 h-8 !rounded-lg gap-1"><Download className="w-3 h-3" />JSON</button>
              <select value={role} onChange={(e) => setRole(e.target.value as Role)}
                className="ml-auto bg-secondary border border-foreground/10 text-foreground text-xs font-bold rounded-xl px-2 py-1 outline-none cursor-pointer h-8">
                <option value="VIEWER">👁 Viewer</option>
                <option value="ADMIN">🛡 Admin</option>
              </select>
              <button onClick={toggleTheme}
                className="h-8 w-8 flex items-center justify-center rounded-xl bg-secondary border border-foreground/10">
                {theme === 'dark' ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-foreground/60" />}
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
