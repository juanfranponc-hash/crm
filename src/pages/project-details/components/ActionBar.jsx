import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ActionBar = ({ project, onSave, onGenerateQuote, onStatusChange }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isGeneratingQuote, setIsGeneratingQuote] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(project?.status);

  const statusOptions = [
    { value: 'Pendiente', label: 'Pendiente' },
    { value: 'En Progreso', label: 'En Progreso' },
    { value: 'En Revisión', label: 'En Revisión' },
    { value: 'Completado', label: 'Completado' },
    { value: 'Cancelado', label: 'Cancelado' }
  ];

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave?.();
      // Show success notification
    } catch (error) {
      console.error('Error saving project:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleGenerateQuote = async () => {
    setIsGeneratingQuote(true);
    try {
      await onGenerateQuote?.();
      // Show success notification
    } catch (error) {
      console.error('Error generating quote:', error);
    } finally {
      setIsGeneratingQuote(false);
    }
  };

  const handleStatusChange = (newStatus) => {
    setCurrentStatus(newStatus);
    onStatusChange?.(newStatus);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'En Progreso':
        return 'text-warning';
      case 'Completado':
        return 'text-success';
      case 'Cancelado':
        return 'text-error';
      case 'En Revisión':
        return 'text-accent';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-40">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 sm:space-x-4">
          {/* Left Side - Project Info */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="FolderOpen" size={20} className="text-primary" />
              <div>
                <h4 className="font-medium text-card-foreground">{project?.name}</h4>
                <p className="text-xs text-muted-foreground">
                  Cliente: {project?.client?.name}
                </p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-2">
              <Icon name="Calendar" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Última actualización: {new Date()?.toLocaleDateString('es-ES')}
              </span>
            </div>
          </div>

          {/* Center - Status Change */}
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-card-foreground">Estado:</span>
            <div className="w-48">
              <Select
                options={statusOptions}
                value={currentStatus}
                onChange={handleStatusChange}
                placeholder="Seleccionar estado"
              />
            </div>
            <div className={`flex items-center space-x-1 ${getStatusColor(currentStatus)}`}>
              <Icon 
                name={
                  currentStatus === 'Completado' ? 'CheckCircle' :
                  currentStatus === 'En Progreso' ? 'Clock' :
                  currentStatus === 'Cancelado' ? 'XCircle' :
                  currentStatus === 'En Revisión'? 'Eye' : 'Circle'
                } 
                size={16} 
              />
            </div>
          </div>

          {/* Right Side - Actions */}
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={handleSave}
              loading={isSaving}
              iconName="Save"
              iconPosition="left"
              className="hidden sm:flex"
            >
              Guardar
            </Button>
            
            <Button
              variant="secondary"
              onClick={handleGenerateQuote}
              loading={isGeneratingQuote}
              iconName="FileText"
              iconPosition="left"
            >
              Generar Cotización
            </Button>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                iconName="Share2"
                className="text-muted-foreground hover:text-foreground"
              />
              
              <Button
                variant="ghost"
                size="icon"
                iconName="Download"
                className="text-muted-foreground hover:text-foreground"
              />
              
              <Button
                variant="ghost"
                size="icon"
                iconName="MoreVertical"
                className="text-muted-foreground hover:text-foreground"
              />
            </div>
          </div>
        </div>

        {/* Mobile Save Button */}
        <div className="sm:hidden mt-3">
          <Button
            variant="outline"
            onClick={handleSave}
            loading={isSaving}
            iconName="Save"
            iconPosition="left"
            fullWidth
          >
            Guardar Cambios
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActionBar;