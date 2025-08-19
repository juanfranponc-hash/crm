import React from 'react';

const StatusBadge = ({ status }) => {
  const statusConfig = {
    'En progreso': {
      className: 'bg-warning/10 text-warning border-warning/20',
      label: 'En progreso'
    },
    'Completado': {
      className: 'bg-success/10 text-success border-success/20',
      label: 'Completado'
    },
    'Pendiente': {
      className: 'bg-muted text-muted-foreground border-border',
      label: 'Pendiente'
    },
    'Cancelado': {
      className: 'bg-error/10 text-error border-error/20',
      label: 'Cancelado'
    },
    'Presupuesto': {
      className: 'bg-accent/10 text-accent border-accent/20',
      label: 'Presupuesto'
    }
  };

  const config = statusConfig?.[status] || statusConfig?.['Pendiente'];

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config?.className}`}>
      {config?.label}
    </span>
  );
};

export default StatusBadge;