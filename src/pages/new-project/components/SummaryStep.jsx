import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const SummaryStep = ({ formData, onUpdate, onSave, onPrevious }) => {
  const [projectPrice, setProjectPrice] = useState(formData?.projectPrice || '');
  const [projectNotes, setProjectNotes] = useState(formData?.projectNotes || '');
  const [isSaving, setIsSaving] = useState(false);

  const handlePriceChange = (e) => {
    const value = e?.target?.value;
    setProjectPrice(value);
    onUpdate({ projectPrice: value });
  };

  const handleNotesChange = (e) => {
    const value = e?.target?.value;
    setProjectNotes(value);
    onUpdate({ projectNotes: value });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave();
    } finally {
      setIsSaving(false);
    }
  };

  const getClientName = () => {
    if (formData?.clientType === 'new') {
      return formData?.clientName || 'Cliente Nuevo';
    }
    return formData?.clientName || 'Cliente Seleccionado';
  };

  const formatCustomFeatures = () => {
    if (!formData?.customFeatures || formData?.customFeatures?.length === 0) {
      return [];
    }
    return formData?.customFeatures?.filter(feature => feature?.trim() !== '');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Icon name="FileCheck" size={16} color="white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Resumen del Proyecto</h2>
          <p className="text-sm text-muted-foreground">Revise los detalles antes de crear el proyecto</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Client Information */}
        <div className="space-y-6">
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Icon name="User" size={16} className="text-primary" />
              <h3 className="font-semibold text-foreground">Información del Cliente</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">Nombre:</span>
                <span className="ml-2 font-medium text-foreground">{getClientName()}</span>
              </div>
              {formData?.clientEmail && (
                <div>
                  <span className="text-muted-foreground">Email:</span>
                  <span className="ml-2 text-foreground">{formData?.clientEmail}</span>
                </div>
              )}
              {formData?.clientPhone && (
                <div>
                  <span className="text-muted-foreground">Teléfono:</span>
                  <span className="ml-2 text-foreground">{formData?.clientPhone}</span>
                </div>
              )}
              {formData?.clientCompany && (
                <div>
                  <span className="text-muted-foreground">Empresa:</span>
                  <span className="ml-2 text-foreground">{formData?.clientCompany}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Icon name="Truck" size={16} className="text-primary" />
              <h3 className="font-semibold text-foreground">Vehículo Seleccionado</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">Modelo:</span>
                <span className="ml-2 font-medium text-foreground">{formData?.vehicleName}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Precio Base:</span>
                <span className="ml-2 text-foreground">{formData?.vehiclePrice}</span>
              </div>
              {formData?.vehicleSpecs && (
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <span className="text-muted-foreground">Dimensiones:</span>
                    <div className="text-xs text-foreground">
                      {formData?.vehicleSpecs?.length} × {formData?.vehicleSpecs?.width} × {formData?.vehicleSpecs?.height}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Carga:</span>
                    <div className="text-xs text-foreground">{formData?.vehicleSpecs?.payload}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Conversion Information */}
        <div className="space-y-6">
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Icon name="Settings" size={16} className="text-primary" />
              <h3 className="font-semibold text-foreground">Tipo de Conversión</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">Tipo:</span>
                <span className="ml-2 font-medium text-foreground">{formData?.conversionName}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Precio Estimado:</span>
                <span className="ml-2 text-foreground">{formData?.conversionPrice}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Duración:</span>
                <span className="ml-2 text-foreground">{formData?.conversionDuration}</span>
              </div>
            </div>

            {formData?.conversionType === 'personalized' && formatCustomFeatures()?.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-foreground mb-2">Características Personalizadas:</h4>
                <div className="space-y-1">
                  {formatCustomFeatures()?.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Icon name="Check" size={12} className="text-success mt-0.5" />
                      <span className="text-xs text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <Input
              label="Precio Final del Proyecto (€)"
              type="number"
              placeholder="35000"
              value={projectPrice}
              onChange={handlePriceChange}
              description="Precio total incluyendo vehículo y conversión"
            />

            <Input
              label="Notas del Proyecto (Opcional)"
              type="text"
              placeholder="Información adicional sobre el proyecto..."
              value={projectNotes}
              onChange={handleNotesChange}
              description="Detalles especiales o consideraciones"
            />
          </div>
        </div>
      </div>
      <div className="border-t border-border pt-6">
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={onPrevious} iconName="ArrowLeft" iconPosition="left">
            Anterior
          </Button>
          
          <div className="flex space-x-3">
            <Button variant="outline" disabled={isSaving}>
              Guardar Borrador
            </Button>
            <Button 
              onClick={handleSave} 
              loading={isSaving}
              iconName="Save" 
              iconPosition="left"
            >
              Crear Proyecto
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryStep;