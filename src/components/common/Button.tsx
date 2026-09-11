import { ReactNode } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: ReactNode;
}

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  const classes = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'inline-flex items-center justify-center rounded-full border border-transparent px-5 py-3 text-sm font-semibold text-green-300 transition hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-green-300',
  };

  return (
    <button className={`${classes[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
