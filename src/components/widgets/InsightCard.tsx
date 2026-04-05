import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface InsightCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

export default function InsightCard({ title, value, subtitle, icon, trend, trendValue, className }: InsightCardProps) {
  return (
    <div className={cn("glass-panel p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group relative overflow-hidden", className)}>
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div>
          <h3 className="text-sm font-medium text-foreground/60 mb-1">{title}</h3>
          <p className="text-3xl font-bold tracking-tight text-foreground">{value}</p>
        </div>
        {icon && (
          <div className="p-3 bg-secondary/50 rounded-2xl group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300">
            {icon}
          </div>
        )}
      </div>
      
      {(subtitle || trendValue) && (
        <div className="flex items-center gap-2 mt-2 relative z-10">
          {trendValue && (
            <span className={cn(
              "text-xs font-semibold px-2 py-1 rounded-lg",
              trend === 'up' ? "bg-success/10 text-success" : 
              trend === 'down' ? "bg-destructive/10 text-destructive" : 
              "bg-secondary text-foreground/70"
            )}>
              {trendValue}
            </span>
          )}
          {subtitle && <span className="text-sm text-foreground/50">{subtitle}</span>}
        </div>
      )}
    </div>
  );
}
