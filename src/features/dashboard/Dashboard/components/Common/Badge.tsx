import React from 'react';

interface BadgeProps {
  label: string;
  variant?: 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
}

export function Badge({ label, variant = 'info', size = 'md' }: BadgeProps) {
  const getColors = () => {
    switch (variant) {
      case 'success':
        return { bg: 'rgba(16, 185, 129, 0.08)', text: '#10b981', border: 'rgba(16, 185, 129, 0.15)' };
      case 'warning':
        return { bg: 'rgba(245, 158, 11, 0.08)', text: '#f59e0b', border: 'rgba(245, 158, 11, 0.15)' };
      case 'danger':
        return { bg: 'rgba(239, 68, 68, 0.08)', text: '#ef4444', border: 'rgba(239, 68, 68, 0.15)' };
      default:
        return { bg: 'rgba(59, 130, 246, 0.08)', text: '#3b82f6', border: 'rgba(59, 130, 246, 0.15)' };
    }
  };

  const { bg, text, border } = getColors();

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: size === 'sm' ? '2px 8px' : '4px 12px',
      fontSize: size === 'sm' ? '10px' : '12px',
      fontWeight: 700,
      borderRadius: '100px',
      backgroundColor: bg,
      color: text,
      border: `1px solid ${border}`,
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    }}>
      {label}
    </span>
  );
}
