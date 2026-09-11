import { ReactNode } from 'react';

export function Card({ className = '', children }: { className?: string; children: ReactNode }) {
  return <div className={`card-surface ${className}`}>{children}</div>;
}
