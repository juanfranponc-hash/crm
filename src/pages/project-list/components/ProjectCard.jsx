import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import StatusBadge from './StatusBadge';
import ActionDropdown from './ActionDropdown';

const ProjectCard = ({ project, isSelected, onSelect, onView, onEdit, onDuplicate, onDelete }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    })?.format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 transition-all duration-200 hover:shadow-md ${
      isSelected ? 'ring-2 ring-primary ring-opacity-50' : ''
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <Checkbox
            checked={isSelected}
            onChange={(e) => onSelect(project?.id, e?.target?.checked)}
          />
          <div>
            <h3 className="text-sm font-medium text-primary">#{project?.id}</h3>
            <p className="text-xs text-muted-foreground">{formatDate(project?.createdAt)}</p>
          </div>
        </div>
        <ActionDropdown
          project={project}
          onView={onView}
          onEdit={onEdit}
          onDuplicate={onDuplicate}
          onDelete={onDelete}
        />
      </div>
      {/* Client Info */}
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
          <Icon name="User" size={18} color="white" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-medium text-foreground">{project?.clientName}</h4>
          <p className="text-xs text-muted-foreground">{project?.clientEmail}</p>
        </div>
      </div>
      {/* Vehicle Info */}
      <div className="bg-muted/30 rounded-md p-3 mb-3">
        <div className="flex items-center space-x-2 mb-1">
          <Icon name="Truck" size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">{project?.vehicleModel}</span>
        </div>
        <p className="text-xs text-muted-foreground">{project?.vehicleYear}</p>
      </div>
      {/* Conversion Type & Status */}
      <div className="flex items-center justify-between mb-3">
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          project?.conversionType === 'standard' ?'bg-blue-100 text-blue-800' :'bg-purple-100 text-purple-800'
        }`}>
          {project?.conversionType === 'standard' ? 'Estándar' : 'Personalizada'}
        </span>
        <StatusBadge status={project?.status} />
      </div>
      {/* Price */}
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-foreground">
          {formatCurrency(project?.price)}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={onView}
          iconName="Eye"
          iconPosition="left"
        >
          Ver detalles
        </Button>
      </div>
    </div>
  );
};

export default ProjectCard;