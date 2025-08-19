import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const UpcomingDeadlines = ({ deadlines }) => {
  const navigate = useNavigate();

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return 'AlertTriangle';
      case 'medium':
        return 'Clock';
      case 'low':
        return 'CheckCircle';
      default:
        return 'Circle';
    }
  };

  const handleDeadlineClick = (projectId) => {
    navigate(`/project-details?id=${projectId}`);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Próximas Fechas Límite</h3>
        <Icon name="Calendar" size={20} className="text-muted-foreground" />
      </div>
      {deadlines?.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="Calendar" size={48} className="text-muted-foreground/50 mx-auto mb-3" />
          <p className="text-muted-foreground">No hay fechas límite próximas</p>
        </div>
      ) : (
        <div className="space-y-3">
          {deadlines?.map((deadline) => (
            <div
              key={deadline?.id}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors duration-150"
              onClick={() => handleDeadlineClick(deadline?.projectId)}
            >
              <div className={`flex-shrink-0 ${getPriorityColor(deadline?.priority)}`}>
                <Icon name={getPriorityIcon(deadline?.priority)} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {deadline?.projectName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {deadline?.client}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">
                  {deadline?.dueDate}
                </p>
                <p className="text-xs text-muted-foreground">
                  {deadline?.daysLeft} días
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-4 pt-4 border-t border-border">
        <button
          onClick={() => navigate('/project-list')}
          className="w-full text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-150"
        >
          Ver todos los proyectos →
        </button>
      </div>
    </div>
  );
};

export default UpcomingDeadlines;