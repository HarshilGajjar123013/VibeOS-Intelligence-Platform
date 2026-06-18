import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  icon?: string;
  description?: string;
  trend?: number;
  status?: 'up' | 'down' | 'neutral';
}

export function MetricCard({ label, value, icon, description, trend, status }: MetricCardProps) {
  const getTrendColor = () => {
    if (status === 'up') return '#10b981';
    if (status === 'down') return '#ef4444';
    return '#64748b';
  };

  return (
    <div className="dashboard-metric-card" style={{
      background: 'rgba(255, 255, 255, 0.7)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(226, 232, 240, 0.8)',
      borderRadius: '20px',
      padding: '20px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.005)',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
        {icon && <span style={{ fontSize: '18px' }}>{icon}</span>}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
        <span style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>{value}</span>
        {trend !== undefined && (
          <span style={{ fontSize: '11px', fontWeight: 700, color: getTrendColor() }}>
            {status === 'up' ? '▲' : status === 'down' ? '▼' : '•'} {trend}%
          </span>
        )}
      </div>
      {description && (
        <span style={{ fontSize: '11px', color: '#94a3b8' }}>{description}</span>
      )}
    </div>
  );
}
