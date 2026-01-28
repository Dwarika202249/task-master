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
  const baseStyles = 'font-semibold rounded-lg transition-all duration-150 flex items-center gap-2 justify-center hover:opacity-90 hover:shadow-md active:scale-95 transform focus:outline-none focus-visible:ring-2 focus-visible:ring-primary';

  const variants = {
    // include an explicit hex fallback class to ensure solid fill even if theme colors aren't generated
    primary: 'bg-primary bg-[#2563EB] text-white',
    secondary: 'bg-surface bg-[#111827] text-white border border-border',
    danger: 'bg-danger bg-[#EF4444] text-white',
    ghost: 'text-muted hover:text-white hover:bg-surface',
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