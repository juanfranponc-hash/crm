import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const VehicleSelectionStep = ({ formData, onUpdate, onNext, onPrevious }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(formData?.vehicleType || '');
  const [error, setError] = useState('');

  const vehicleTypes = [
    {
      id: 'mercedes-sprinter',
      name: 'Mercedes Sprinter',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=250&fit=crop',
      specs: {
        length: '5,93m',
        width: '2,03m',
        height: '2,78m',
        payload: '1.400kg'
      },
      description: 'Furgoneta premium con excelente espacio interior y confiabilidad',
      price: '€45.000 - €55.000'
    },
    {
      id: 'volkswagen-crafter',
      name: 'Volkswagen Crafter',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop',
      specs: {
        length: '5,99m',
        width: '2,04m',
        height: '2,59m',
        payload: '1.300kg'
      },
      description: 'Diseño moderno con tecnología avanzada y eficiencia de combustible',
      price: '€42.000 - €52.000'
    },
    {
      id: 'ford-transit',
      name: 'Ford Transit',
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400&h=250&fit=crop',
      specs: {
        length: '5,53m',
        width: '2,03m',
        height: '2,72m',
        payload: '1.350kg'
      },
      description: 'Opción versátil y económica con gran capacidad de carga',
      price: '€38.000 - €48.000'
    },
    {
      id: 'iveco-daily',
      name: 'Iveco Daily',
      image: 'https://images.unsplash.com/photo-1586244439413-bc2288941dda?w=400&h=250&fit=crop',
      specs: {
        length: '5,64m',
        width: '2,05m',
        height: '2,52m',
        payload: '1.500kg'
      },
      description: 'Robusta y confiable, ideal para conversiones pesadas',
      price: '€40.000 - €50.000'
    },
    {
      id: 'renault-master',
      name: 'Renault Master',
      image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=400&h=250&fit=crop',
      specs: {
        length: '5,48m',
        width: '2,04m',
        height: '2,52m',
        payload: '1.200kg'
      },
      description: 'Equilibrio perfecto entre precio y funcionalidad',
      price: '€35.000 - €45.000'
    },
    {
      id: 'fiat-ducato',
      name: 'Fiat Ducato',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop',
      specs: {
        length: '5,41m',
        width: '2,05m',
        height: '2,52m',
        payload: '1.280kg'
      },
      description: 'Popular en Europa, excelente relación calidad-precio',
      price: '€36.000 - €46.000'
    }
  ];

  const handleVehicleSelect = (vehicleId) => {
    setSelectedVehicle(vehicleId);
    const vehicle = vehicleTypes?.find(v => v?.id === vehicleId);
    onUpdate({ 
      vehicleType: vehicleId,
      vehicleName: vehicle?.name,
      vehicleSpecs: vehicle?.specs,
      vehiclePrice: vehicle?.price
    });
    setError('');
  };

  const handleNext = () => {
    if (!selectedVehicle) {
      setError('Seleccione un tipo de vehículo');
      return;
    }
    onNext();
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Icon name="Truck" size={16} color="white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Selección de Vehículo</h2>
          <p className="text-sm text-muted-foreground">Elija el tipo de vehículo para la conversión</p>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {vehicleTypes?.map((vehicle) => (
          <div
            key={vehicle?.id}
            className={`border rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedVehicle === vehicle?.id
                ? 'border-primary bg-primary/5 shadow-md'
                : 'border-border bg-card hover:border-primary/50'
            }`}
            onClick={() => handleVehicleSelect(vehicle?.id)}
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={vehicle?.image}
                alt={vehicle?.name}
                className="w-full h-full object-cover"
              />
              {selectedVehicle === vehicle?.id && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Check" size={14} color="white" />
                </div>
              )}
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-foreground mb-2">{vehicle?.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{vehicle?.description}</p>
              
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="text-xs">
                  <span className="text-muted-foreground">Longitud:</span>
                  <span className="ml-1 font-medium text-foreground">{vehicle?.specs?.length}</span>
                </div>
                <div className="text-xs">
                  <span className="text-muted-foreground">Anchura:</span>
                  <span className="ml-1 font-medium text-foreground">{vehicle?.specs?.width}</span>
                </div>
                <div className="text-xs">
                  <span className="text-muted-foreground">Altura:</span>
                  <span className="ml-1 font-medium text-foreground">{vehicle?.specs?.height}</span>
                </div>
                <div className="text-xs">
                  <span className="text-muted-foreground">Carga:</span>
                  <span className="ml-1 font-medium text-foreground">{vehicle?.specs?.payload}</span>
                </div>
              </div>

              <div className="text-sm font-semibold text-primary">{vehicle?.price}</div>
            </div>
          </div>
        ))}
      </div>
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

export default VehicleSelectionStep;