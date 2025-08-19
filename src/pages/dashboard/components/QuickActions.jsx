import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Nuevo Proyecto',
      description: 'Crear un nuevo proyecto de camperización',
      icon: 'Plus',
      variant: 'default',
      onClick: () => navigate('/new-project')
    },
    {
      title: 'Añadir Cliente',
      description: 'Registrar un nuevo cliente',
      icon: 'UserPlus',
      variant: 'outline',
      onClick: () => navigate('/client-management')
    },
    {
      title: 'Generar Informe',
      description: 'Crear informe de proyectos',
      icon: 'FileText',
      variant: 'outline',
      onClick: () => console.log('Generar informe')
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Acciones Rápidas</h3>
      <div className="space-y-3">
        {actions?.map((action, index) => (
          <Button
            key={index}
            variant={action?.variant}
            iconName={action?.icon}
            iconPosition="left"
            fullWidth
            onClick={action?.onClick}
            className="justify-start h-auto p-4"
          >
            <div className="text-left">
              <div className="font-medium">{action?.title}</div>
              <div className="text-sm text-muted-foreground mt-1">{action?.description}</div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;