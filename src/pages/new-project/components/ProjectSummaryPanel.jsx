import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ProjectSummaryPanel = ({ formData, currentStep }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const getStepStatus = (step) => {
    if (currentStep > step) return 'completed';
    if (currentStep === step) return 'current';
    return 'pending';
  };

  const getClientSummary = () => {
    if (formData?.clientType === 'new' && formData?.clientName) {
      return `${formData?.clientName} (Nuevo)`;
    }
    if (formData?.clientName) {
      return formData?.clientName;
    }
    return 'No seleccionado';
  };

  const getVehicleSummary = () => {
    return formData?.vehicleName || 'No seleccionado';
  };

  const getConversionSummary = () => {
    if (!formData?.conversionName) return 'No seleccionado';
    
    let summary = formData?.conversionName;
    if (formData?.conversionType === 'personalized' && formData?.customFeatures) {
      const validFeatures = formData?.customFeatures?.filter(f => f?.trim() !== '');
      if (validFeatures?.length > 0) {
        summary += ` (${validFeatures?.length} características)`;
      }
    }
    return summary;
  };

  if (isCollapsed) {
    return (
      <div className="bg-card border border-border rounded-lg p-4 mb-6">
        <button
          onClick={() => setIsCollapsed(false)}
          className="flex items-center justify-between w-full text-left"
        >
          <div className="flex items-center space-x-2">
            <Icon name="FileText" size={16} className="text-primary" />
            <span className="font-medium text-foreground">Resumen del Proyecto</span>
          </div>
          <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="FileText" size={16} className="text-primary" />
          <span className="font-medium text-foreground">Resumen del Proyecto</span>
        </div>
        <button
          onClick={() => setIsCollapsed(true)}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <Icon name="ChevronUp" size={16} />
        </button>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between py-2 border-b border-border">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              getStepStatus(1) === 'completed' ? 'bg-success' :
              getStepStatus(1) === 'current' ? 'bg-primary' : 'bg-muted'
            }`} />
            <span className="text-sm text-muted-foreground">Cliente:</span>
          </div>
          <span className="text-sm font-medium text-foreground">{getClientSummary()}</span>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-border">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              getStepStatus(2) === 'completed' ? 'bg-success' :
              getStepStatus(2) === 'current' ? 'bg-primary' : 'bg-muted'
            }`} />
            <span className="text-sm text-muted-foreground">Vehículo:</span>
          </div>
          <span className="text-sm font-medium text-foreground">{getVehicleSummary()}</span>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-border">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              getStepStatus(3) === 'completed' ? 'bg-success' :
              getStepStatus(3) === 'current' ? 'bg-primary' : 'bg-muted'
            }`} />
            <span className="text-sm text-muted-foreground">Conversión:</span>
          </div>
          <span className="text-sm font-medium text-foreground">{getConversionSummary()}</span>
        </div>

        {formData?.projectPrice && (
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                getStepStatus(4) === 'completed' ? 'bg-success' :
                getStepStatus(4) === 'current' ? 'bg-primary' : 'bg-muted'
              }`} />
              <span className="text-sm text-muted-foreground">Precio:</span>
            </div>
            <span className="text-sm font-semibold text-primary">€{formData?.projectPrice}</span>
          </div>
        )}
      </div>
      <div className="mt-4 pt-3 border-t border-border">
        <div className="text-xs text-muted-foreground">
          Progreso: {Math.round((currentStep / 4) * 100)}% completado
        </div>
        <div className="w-full bg-muted rounded-full h-1.5 mt-1">
          <div 
            className="bg-primary h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectSummaryPanel;