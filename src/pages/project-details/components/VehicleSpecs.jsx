import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const VehicleSpecs = ({ vehicle }) => {
  const specCategories = [
    {
      title: 'Especificaciones Generales',
      icon: 'Info',
      specs: [
        { label: 'Marca', value: vehicle?.make },
        { label: 'Modelo', value: vehicle?.model },
        { label: 'Año', value: vehicle?.year },
        { label: 'Tipo de Combustible', value: vehicle?.fuelType },
        { label: 'Transmisión', value: vehicle?.transmission },
        { label: 'Kilometraje', value: vehicle?.mileage }
      ]
    },
    {
      title: 'Dimensiones',
      icon: 'Ruler',
      specs: [
        { label: 'Longitud', value: vehicle?.dimensions?.length },
        { label: 'Anchura', value: vehicle?.dimensions?.width },
        { label: 'Altura', value: vehicle?.dimensions?.height },
        { label: 'Distancia entre ejes', value: vehicle?.dimensions?.wheelbase },
        { label: 'Altura interior', value: vehicle?.dimensions?.interiorHeight },
        { label: 'Área de carga', value: vehicle?.dimensions?.cargoArea }
      ]
    },
    {
      title: 'Características Técnicas',
      icon: 'Settings',
      specs: [
        { label: 'Motor', value: vehicle?.technical?.engine },
        { label: 'Potencia', value: vehicle?.technical?.power },
        { label: 'Peso Bruto', value: vehicle?.technical?.grossWeight },
        { label: 'Capacidad de Carga', value: vehicle?.technical?.payloadCapacity },
        { label: 'Capacidad del Tanque', value: vehicle?.technical?.fuelCapacity },
        { label: 'Consumo Promedio', value: vehicle?.technical?.fuelConsumption }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Vehicle Header */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 space-y-4 lg:space-y-0">
          <div className="w-full lg:w-80 h-48 bg-muted rounded-lg overflow-hidden">
            <Image 
              src={vehicle?.image} 
              alt={`${vehicle?.make} ${vehicle?.model}`}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <Icon name="Truck" size={24} className="text-primary" />
              <h2 className="text-2xl font-bold text-card-foreground">
                {vehicle?.make} {vehicle?.model} {vehicle?.year}
              </h2>
            </div>
            
            <p className="text-muted-foreground mb-4">{vehicle?.description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-muted rounded-lg">
                <Icon name="Gauge" size={20} className="text-primary mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Kilometraje</p>
                <p className="text-sm font-semibold text-card-foreground">{vehicle?.mileage}</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <Icon name="Fuel" size={20} className="text-primary mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Combustible</p>
                <p className="text-sm font-semibold text-card-foreground">{vehicle?.fuelType}</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <Icon name="Cog" size={20} className="text-primary mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Transmisión</p>
                <p className="text-sm font-semibold text-card-foreground">{vehicle?.transmission}</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <Icon name="Calendar" size={20} className="text-primary mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Año</p>
                <p className="text-sm font-semibold text-card-foreground">{vehicle?.year}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Specifications Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {specCategories?.map((category, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Icon name={category?.icon} size={20} className="text-primary" />
              <h3 className="text-lg font-semibold text-card-foreground">{category?.title}</h3>
            </div>
            
            <div className="space-y-3">
              {category?.specs?.map((spec, specIndex) => (
                <div key={specIndex} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
                  <span className="text-sm text-muted-foreground">{spec?.label}</span>
                  <span className="text-sm font-medium text-card-foreground">{spec?.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Modification Options */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Wrench" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-card-foreground">Opciones de Modificación</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vehicle?.modificationOptions?.map((option, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                option?.available ? 'bg-success' : 'bg-error'
              }`}>
                <Icon 
                  name={option?.available ? 'Check' : 'X'} 
                  size={14} 
                  color="white" 
                />
              </div>
              <div>
                <p className="text-sm font-medium text-card-foreground">{option?.name}</p>
                <p className="text-xs text-muted-foreground">{option?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Vehicle Condition */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Shield" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-card-foreground">Estado del Vehículo</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-card-foreground mb-3">Inspección Exterior</h4>
            <div className="space-y-2">
              {vehicle?.condition?.exterior?.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{item?.component}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item?.status === 'Excelente' ? 'bg-success text-success-foreground' :
                    item?.status === 'Bueno' ? 'bg-warning text-warning-foreground' :
                    'bg-error text-error-foreground'
                  }`}>
                    {item?.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-card-foreground mb-3">Inspección Interior</h4>
            <div className="space-y-2">
              {vehicle?.condition?.interior?.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{item?.component}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item?.status === 'Excelente' ? 'bg-success text-success-foreground' :
                    item?.status === 'Bueno' ? 'bg-warning text-warning-foreground' :
                    'bg-error text-error-foreground'
                  }`}>
                    {item?.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleSpecs;