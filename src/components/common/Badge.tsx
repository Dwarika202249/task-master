import React from 'react';

interface BadgeProps {
  variant?: 'default' | 'high' | 'medium' | 'low' | 'accent';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export default function Badge({ variant = 'default', children, icon }: BadgeProps) {
  const variants = {
    default: 'bg-surface text-muted border border-border',
    high: 'bg-danger text-white border border-danger',
    medium: 'bg-warning text-white border border-warning',
    low: 'bg-accent text-white border border-accent',
    accent: 'bg-info text-white border border-info',
  };

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${variants[variant]}`}>
      {icon}
      {children}
    </span>
  );
}