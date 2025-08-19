import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const CustomizationTab = ({ project, onUpdateCustomization }) => {
  const [customFeatures, setCustomFeatures] = useState(project?.customization?.customFeatures || []);
  const [newFeatureTitle, setNewFeatureTitle] = useState('');
  const [newFeatureDescription, setNewFeatureDescription] = useState('');
  const [standardFeatures, setStandardFeatures] = useState(project?.customization?.standardFeatures || []);

  const handleAddCustomFeature = () => {
    if (newFeatureTitle?.trim() && newFeatureDescription?.trim()) {
      const newFeature = {
        id: Date.now(),
        title: newFeatureTitle,
        description: newFeatureDescription,
        createdAt: new Date()?.toLocaleDateString('es-ES')
      };
      
      const updatedFeatures = [...customFeatures, newFeature];
      setCustomFeatures(updatedFeatures);
      setNewFeatureTitle('');
      setNewFeatureDescription('');
      
      onUpdateCustomization?.({
        ...project?.customization,
        customFeatures: updatedFeatures
      });
    }
  };

  const handleRemoveCustomFeature = (featureId) => {
    const updatedFeatures = customFeatures?.filter(feature => feature?.id !== featureId);
    setCustomFeatures(updatedFeatures);
    
    onUpdateCustomization?.({
      ...project?.customization,
      customFeatures: updatedFeatures
    });
  };

  const handleUpdateCustomFeature = (featureId, field, value) => {
    const updatedFeatures = customFeatures?.map(feature => 
      feature?.id === featureId ? { ...feature, [field]: value } : feature
    );
    setCustomFeatures(updatedFeatures);
    
    onUpdateCustomization?.({
      ...project?.customization,
      customFeatures: updatedFeatures
    });
  };

  const handleStandardFeatureToggle = (featureId, checked) => {
    const updatedFeatures = standardFeatures?.map(feature =>
      feature?.id === featureId ? { ...feature, selected: checked } : feature
    );
    setStandardFeatures(updatedFeatures);
    
    onUpdateCustomization?.({
      ...project?.customization,
      standardFeatures: updatedFeatures
    });
  };

  if (project?.conversionType === 'Estándar') {
    return (
      <div className="space-y-6">
        {/* Standard Features Checklist */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="CheckSquare" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-card-foreground">Características Estándar</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {standardFeatures?.map((feature) => (
              <div key={feature?.id} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                <Checkbox
                  checked={feature?.selected}
                  onChange={(e) => handleStandardFeatureToggle(feature?.id, e?.target?.checked)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-card-foreground">{feature?.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{feature?.description}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-xs text-muted-foreground">
                      Precio: €{feature?.price?.toLocaleString('es-ES')}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Tiempo: {feature?.installationTime}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-primary/10 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-medium text-card-foreground">Total de Características Seleccionadas:</span>
              <span className="text-lg font-bold text-primary">
                {standardFeatures?.filter(f => f?.selected)?.length} de {standardFeatures?.length}
              </span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="font-medium text-card-foreground">Costo Adicional:</span>
              <span className="text-lg font-bold text-primary">
                €{standardFeatures?.filter(f => f?.selected)?.reduce((sum, f) => sum + f?.price, 0)?.toLocaleString('es-ES')}
              </span>
            </div>
          </div>
        </div>
        {/* Package Options */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Package" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-card-foreground">Paquetes Disponibles</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {project?.customization?.packages?.map((pkg, index) => (
              <div key={index} className="border border-border rounded-lg p-4 hover:border-primary transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-card-foreground">{pkg?.name}</h4>
                  <span className="text-lg font-bold text-primary">€{pkg?.price?.toLocaleString('es-ES')}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{pkg?.description}</p>
                <ul className="space-y-1">
                  {pkg?.features?.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2 text-sm">
                      <Icon name="Check" size={14} className="text-success" />
                      <span className="text-card-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full mt-4">
                  Seleccionar Paquete
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Personalized Conversion Layout
  return (
    <div className="space-y-6">
      {/* Add New Custom Feature */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Plus" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-card-foreground">Agregar Característica Personalizada</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            label="Título de la Característica"
            type="text"
            placeholder="Ej: Sistema de iluminación LED personalizado"
            value={newFeatureTitle}
            onChange={(e) => setNewFeatureTitle(e?.target?.value)}
          />
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Descripción Detallada
            </label>
            <textarea
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-150 ease-in-out"
              rows={4}
              placeholder="Describe en detalle las especificaciones, materiales, instalación y cualquier consideración especial para esta característica personalizada..."
              value={newFeatureDescription}
              onChange={(e) => setNewFeatureDescription(e?.target?.value)}
            />
          </div>
        </div>
        
        <Button 
          onClick={handleAddCustomFeature}
          disabled={!newFeatureTitle?.trim() || !newFeatureDescription?.trim()}
          iconName="Plus"
          iconPosition="left"
        >
          Agregar Característica
        </Button>
      </div>
      {/* Custom Features List */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Edit" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-card-foreground">Características Personalizadas</h3>
          </div>
          <span className="text-sm text-muted-foreground">
            {customFeatures?.length} característica{customFeatures?.length !== 1 ? 's' : ''}
          </span>
        </div>
        
        {customFeatures?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No hay características personalizadas agregadas</p>
            <p className="text-sm text-muted-foreground mt-1">
              Utiliza el formulario anterior para agregar características específicas para este proyecto
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {customFeatures?.map((feature) => (
              <div key={feature?.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={feature?.title}
                      onChange={(e) => handleUpdateCustomFeature(feature?.id, 'title', e?.target?.value)}
                      className="text-lg font-semibold text-card-foreground bg-transparent border-none outline-none w-full"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Agregado el {feature?.createdAt}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveCustomFeature(feature?.id)}
                    iconName="Trash2"
                    className="text-error hover:text-error"
                  />
                </div>
                
                <textarea
                  value={feature?.description}
                  onChange={(e) => handleUpdateCustomFeature(feature?.id, 'description', e?.target?.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-150 ease-in-out"
                  rows={3}
                  placeholder="Descripción de la característica..."
                />
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Project Notes */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="FileText" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-card-foreground">Notas del Proyecto</h3>
        </div>
        
        <textarea
          className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-150 ease-in-out"
          rows={4}
          placeholder="Notas adicionales sobre el proyecto, consideraciones especiales, preferencias del cliente, etc..."
          defaultValue={project?.customization?.notes}
        />
      </div>
    </div>
  );
};

export default CustomizationTab;