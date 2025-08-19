import React from 'react';
import Icon from '../../../components/AppIcon';

const ProjectOverview = ({ project }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'En Progreso':
        return 'bg-warning text-warning-foreground';
      case 'Completado':
        return 'bg-success text-success-foreground';
      case 'Pendiente':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Alta':
        return 'text-error';
      case 'Media':
        return 'text-warning';
      case 'Baja':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Client Information Card */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-card-foreground">Información del Cliente</h3>
          <Icon name="User" size={20} className="text-muted-foreground" />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <Icon name="User" size={20} color="white" />
            </div>
            <div>
              <h4 className="font-medium text-card-foreground">{project?.client?.name}</h4>
              <p className="text-sm text-muted-foreground">{project?.client?.company}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Icon name="Mail" size={16} className="text-muted-foreground" />
              <span className="text-sm text-card-foreground">{project?.client?.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Phone" size={16} className="text-muted-foreground" />
              <span className="text-sm text-card-foreground">{project?.client?.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="MapPin" size={16} className="text-muted-foreground" />
              <span className="text-sm text-card-foreground">{project?.client?.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={16} className="text-muted-foreground" />
              <span className="text-sm text-card-foreground">Cliente desde {project?.client?.joinDate}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Project Status & Timeline */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-card-foreground">Estado del Proyecto</h3>
          <Icon name="Activity" size={20} className="text-muted-foreground" />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-card-foreground">Estado Actual</span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project?.status)}`}>
              {project?.status}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-card-foreground">Prioridad</span>
            <span className={`text-sm font-medium ${getPriorityColor(project?.priority)}`}>
              {project?.priority}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-card-foreground">Progreso</span>
            <span className="text-sm text-muted-foreground">{project?.progress}%</span>
          </div>
          
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${project?.progress}%` }}
            ></div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <span className="text-xs text-muted-foreground">Fecha de Inicio</span>
              <p className="text-sm font-medium text-card-foreground">{project?.startDate}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Fecha Estimada</span>
              <p className="text-sm font-medium text-card-foreground">{project?.estimatedEndDate}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Recent Activity */}
      <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-card-foreground">Actividad Reciente</h3>
          <Icon name="Clock" size={20} className="text-muted-foreground" />
        </div>
        
        <div className="space-y-4">
          {project?.recentActivity?.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 pb-4 border-b border-border last:border-b-0 last:pb-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                activity?.type === 'update' ? 'bg-primary' : 
                activity?.type === 'comment' ? 'bg-accent' : 'bg-success'
              }`}>
                <Icon 
                  name={activity?.type === 'update' ? 'Edit' : activity?.type === 'comment' ? 'MessageCircle' : 'CheckCircle'} 
                  size={14} 
                  color="white" 
                />
              </div>
              <div className="flex-1">
                <p className="text-sm text-card-foreground">{activity?.description}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-muted-foreground">{activity?.user}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{activity?.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;