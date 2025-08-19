import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps }) => {
  const steps = [
    { id: 1, title: 'Información del Cliente', icon: 'User' },
    { id: 2, title: 'Selección de Vehículo', icon: 'Truck' },
    { id: 3, title: 'Tipo de Conversión', icon: 'Settings' },
    { id: 4, title: 'Resumen', icon: 'FileCheck' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between">
        {steps?.map((step, index) => (
          <React.Fragment key={step?.id}>
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                currentStep === step?.id 
                  ? 'bg-primary border-primary text-primary-foreground' 
                  : currentStep > step?.id 
                    ? 'bg-success border-success text-success-foreground'
                    : 'bg-muted border-border text-muted-foreground'
              }`}>
                {currentStep > step?.id ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <Icon name={step?.icon} size={16} />
                )}
              </div>
              <div className="hidden sm:block">
                <div className={`text-sm font-medium ${
                  currentStep >= step?.id ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step?.title}
                </div>
                <div className="text-xs text-muted-foreground">
                  Paso {step?.id} de {totalSteps}
                </div>
              </div>
            </div>
            {index < steps?.length - 1 && (
              <div className={`flex-1 h-0.5 mx-4 ${
                currentStep > step?.id ? 'bg-success' : 'bg-border'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;