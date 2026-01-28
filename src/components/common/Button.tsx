import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'font-medium rounded-lg transition-all duration-200 flex items-center gap-2 justify-center';

  const variants = {
    primary: 'bg-gradient-to-r from-primary to-blue-500 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95',
    secondary: 'bg-surface text-muted border border-border hover:bg-slate-700 hover:text-white',
    danger: 'bg-danger text-white hover:bg-red-600 shadow-lg hover:shadow-xl active:scale-95',
    ghost: 'text-muted hover:text-white hover:bg-surface rounded-md',
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
