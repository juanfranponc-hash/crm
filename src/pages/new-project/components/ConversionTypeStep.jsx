import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const ConversionTypeStep = ({ formData, onUpdate, onNext, onPrevious }) => {
  const [selectedType, setSelectedType] = useState(formData?.conversionType || '');
  const [customFeatures, setCustomFeatures] = useState(formData?.customFeatures || ['']);
  const [error, setError] = useState('');

  const conversionTypes = [
    {
      id: 'standard',
      name: 'Conversión Estándar',
      icon: 'Package',
      description: 'Paquete completo con características predefinidas',
      features: [
        'Cama plegable para 2 personas',
        'Cocina con fogón de gas y fregadero',
        'Nevera de 12V (40L)',
        'Sistema eléctrico básico (12V)',
        'Armarios de almacenamiento',
        'Mesa plegable',
        'Cortinas y oscurecedores',
        'Suelo vinílico antideslizante'
      ],
      price: '€15.000 - €25.000',
      duration: '3-4 semanas'
    },
    {
      id: 'personalized',
      name: 'Conversión Personalizada',
      icon: 'Wrench',
      description: 'Diseño completamente personalizado según sus necesidades',
      features: [
        'Diseño interior personalizado',
        'Selección de materiales premium',
        'Configuración de mobiliario a medida',
        'Sistemas eléctricos avanzados',
        'Opciones de calefacción/refrigeración',
        'Equipamiento especializado',
        'Acabados de lujo',
        'Consultoría de diseño incluida'
      ],
      price: '€25.000 - €50.000+',
      duration: '6-10 semanas'
    }
  ];

  const handleTypeSelect = (typeId) => {
    setSelectedType(typeId);
    const type = conversionTypes?.find(t => t?.id === typeId);
    onUpdate({ 
      conversionType: typeId,
      conversionName: type?.name,
      conversionPrice: type?.price,
      conversionDuration: type?.duration
    });
    setError('');
  };

  const handleCustomFeatureChange = (index, value) => {
    const updatedFeatures = [...customFeatures];
    updatedFeatures[index] = value;
    setCustomFeatures(updatedFeatures);
    onUpdate({ customFeatures: updatedFeatures });
  };

  const addCustomFeature = () => {
    const updatedFeatures = [...customFeatures, ''];
    setCustomFeatures(updatedFeatures);
    onUpdate({ customFeatures: updatedFeatures });
  };

  const removeCustomFeature = (index) => {
    if (customFeatures?.length > 1) {
      const updatedFeatures = customFeatures?.filter((_, i) => i !== index);
      setCustomFeatures(updatedFeatures);
      onUpdate({ customFeatures: updatedFeatures });
    }
  };

  const handleNext = () => {
    if (!selectedType) {
      setError('Seleccione un tipo de conversión');
      return;
    }

    if (selectedType === 'personalized') {
      const hasValidFeatures = customFeatures?.some(feature => feature?.trim() !== '');
      if (!hasValidFeatures) {
        setError('Añada al menos una característica personalizada');
        return;
      }
    }

    onNext();
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Icon name="Settings" size={16} color="white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Tipo de Conversión</h2>
          <p className="text-sm text-muted-foreground">Elija entre conversión estándar o personalizada</p>
        </div>
      </div>
      {error && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-3 mb-6">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-error" />
            <span className="text-sm text-error">{error}</span>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {conversionTypes?.map((type) => (
          <div
            key={type?.id}
            className={`border rounded-lg p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedType === type?.id
                ? 'border-primary bg-primary/5 shadow-md'
                : 'border-border bg-card hover:border-primary/50'
            }`}
            onClick={() => handleTypeSelect(type?.id)}
          >
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                selectedType === type?.id ? 'bg-primary' : 'bg-muted'
              }`}>
                <Icon 
                  name={type?.icon} 
                  size={20} 
                  color={selectedType === type?.id ? 'white' : 'currentColor'} 
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-foreground">{type?.name}</h3>
                  {selectedType === type?.id && (
                    <Icon name="Check" size={20} className="text-primary" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-4">{type?.description}</p>
                
                <div className="space-y-2 mb-4">
                  {type?.features?.slice(0, 4)?.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Icon name="Check" size={14} className="text-success" />
                      <span className="text-xs text-foreground">{feature}</span>
                    </div>
                  ))}
                  {type?.features?.length > 4 && (
                    <div className="text-xs text-muted-foreground">
                      +{type?.features?.length - 4} características más
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-primary">{type?.price}</span>
                  <span className="text-muted-foreground">{type?.duration}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedType === 'personalized' && (
        <div className="bg-muted rounded-lg p-6 mb-8 animate-slide-down">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Edit3" size={16} className="text-primary" />
            <h3 className="text-lg font-medium text-foreground">Características Personalizadas</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Describa las características específicas que desea incluir en su conversión personalizada
          </p>

          <div className="space-y-4">
            {customFeatures?.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="flex-1">
                  <Input
                    placeholder={`Característica ${index + 1} (ej: Ducha con agua caliente)`}
                    value={feature}
                    onChange={(e) => handleCustomFeatureChange(index, e?.target?.value)}
                  />
                </div>
                {customFeatures?.length > 1 && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeCustomFeature(index)}
                    className="flex-shrink-0"
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                )}
              </div>
            ))}

            <Button
              variant="outline"
              onClick={addCustomFeature}
              iconName="Plus"
              iconPosition="left"
              className="w-full"
            >
              Añadir Característica
            </Button>
          </div>
        </div>
      )}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onPrevious} iconName="ArrowLeft" iconPosition="left">
          Anterior
        </Button>
        <Button onClick={handleNext} iconName="ArrowRight" iconPosition="right">
          Siguiente
        </Button>
      </div>
    </div>
  );
};

export default ConversionTypeStep;