import React from 'react';

interface BadgeProps {
  variant?: 'default' | 'high' | 'medium' | 'low' | 'accent';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export default function Badge({ variant = 'default', children, icon }: BadgeProps) {
  const variants = {
    default: 'bg-[#0F172A] text-white border border-border badge-solid',
    high: 'bg-danger bg-[#EF4444] text-white border border-danger badge-solid',
    medium: 'bg-warning bg-[#F59E0B] text-white border border-warning badge-solid',
    low: 'bg-accent bg-[#22C55E] text-white border border-accent badge-solid',
    accent: 'bg-info bg-[#38BDF8] text-white border border-info badge-solid',
  };

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${variants[variant]}`}>
      {icon}
      {children}
    </span>
  );
}