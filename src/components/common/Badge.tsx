import React from 'react';

interface BadgeProps {
  variant?: 'default' | 'high' | 'medium' | 'low' | 'accent';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export default function Badge({ variant = 'default', children, icon }: BadgeProps) {
  const variants = {
    default: 'bg-surface text-muted border border-border',
    high: 'bg-red-500/20 text-red-300 border border-red-500/30',
    medium: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
    low: 'bg-green-500/20 text-green-300 border border-green-500/30',
    accent: 'bg-info/20 text-info border border-info/30',
  };

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${variants[variant]}`}>
      {icon}
      {children}
    </span>
  );
}
