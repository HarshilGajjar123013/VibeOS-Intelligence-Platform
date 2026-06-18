import React from 'react';

interface CardProps {
  title: string;
  icon?: string;
  children: React.ReactNode;
}

export function Card({ title, icon, children }: CardProps) {
  return (
    <div className="dashboard-card" style={{
      background: 'rgba(255, 255, 255, 0.7)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(226, 232, 240, 0.8)',
      borderRadius: '24px',
      padding: '24px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.01)',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      {(title || icon) && (
        <div className="dashboard-card__header" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          {icon && <span style={{ fontSize: '18px' }}>{icon}</span>}
          <h3 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#0f172a',
            margin: 0
          }}>{title}</h3>
        </div>
      )}
      <div className="dashboard-card__body">{children}</div>
    </div>
  );
}
