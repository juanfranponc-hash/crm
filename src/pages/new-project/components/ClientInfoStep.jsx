import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ClientInfoStep = ({ formData, onUpdate, onNext }) => {
  const [showNewClientForm, setShowNewClientForm] = useState(false);
  const [errors, setErrors] = useState({});

  const existingClients = [
    { value: 'new', label: 'Añadir Nuevo Cliente' },
    { value: '1', label: 'María García - maria.garcia@email.com' },
    { value: '2', label: 'Carlos Rodríguez - carlos.rodriguez@email.com' },
    { value: '3', label: 'Ana Martínez - ana.martinez@email.com' },
    { value: '4', label: 'Luis Fernández - luis.fernandez@email.com' }
  ];

  const handleClientSelect = (value) => {
    if (value === 'new') {
      setShowNewClientForm(true);
      onUpdate({ clientId: '', clientType: 'new' });
    } else {
      setShowNewClientForm(false);
      const selectedClient = existingClients?.find(client => client?.value === value);
      onUpdate({ 
        clientId: value, 
        clientType: 'existing',
        clientName: selectedClient?.label?.split(' - ')?.[0] || ''
      });
    }
  };

  const handleInputChange = (field, value) => {
    onUpdate({ [field]: value });
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.clientId && formData?.clientType !== 'new') {
      newErrors.clientId = 'Seleccione un cliente';
    }

    if (formData?.clientType === 'new' || showNewClientForm) {
      if (!formData?.clientName?.trim()) {
        newErrors.clientName = 'El nombre es obligatorio';
      }
      if (!formData?.clientEmail?.trim()) {
        newErrors.clientEmail = 'El email es obligatorio';
      } else if (!/\S+@\S+\.\S+/?.test(formData?.clientEmail)) {
        newErrors.clientEmail = 'Email no válido';
      }
      if (!formData?.clientPhone?.trim()) {
        newErrors.clientPhone = 'El teléfono es obligatorio';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Icon name="User" size={16} color="white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Información del Cliente</h2>
          <p className="text-sm text-muted-foreground">Seleccione un cliente existente o añada uno nuevo</p>
        </div>
      </div>
      <div className="space-y-6">
        <Select
          label="Cliente"
          placeholder="Seleccione un cliente"
          options={existingClients}
          value={formData?.clientId || ''}
          onChange={handleClientSelect}
          error={errors?.clientId}
          required
        />

        {showNewClientForm && (
          <div className="bg-muted rounded-lg p-4 space-y-4 animate-slide-down">
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="UserPlus" size={16} className="text-primary" />
              <h3 className="text-lg font-medium text-foreground">Nuevo Cliente</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nombre Completo"
                type="text"
                placeholder="Ej: María García López"
                value={formData?.clientName || ''}
                onChange={(e) => handleInputChange('clientName', e?.target?.value)}
                error={errors?.clientName}
                required
              />

              <Input
                label="Email"
                type="email"
                placeholder="maria.garcia@email.com"
                value={formData?.clientEmail || ''}
                onChange={(e) => handleInputChange('clientEmail', e?.target?.value)}
                error={errors?.clientEmail}
                required
              />

              <Input
                label="Teléfono"
                type="tel"
                placeholder="+34 600 123 456"
                value={formData?.clientPhone || ''}
                onChange={(e) => handleInputChange('clientPhone', e?.target?.value)}
                error={errors?.clientPhone}
                required
              />

              <Input
                label="Empresa (Opcional)"
                type="text"
                placeholder="Nombre de la empresa"
                value={formData?.clientCompany || ''}
                onChange={(e) => handleInputChange('clientCompany', e?.target?.value)}
              />
            </div>

            <Input
              label="Dirección (Opcional)"
              type="text"
              placeholder="Calle, número, ciudad, código postal"
              value={formData?.clientAddress || ''}
              onChange={(e) => handleInputChange('clientAddress', e?.target?.value)}
            />

            <Input
              label="Notas Adicionales (Opcional)"
              type="text"
              placeholder="Información adicional sobre el cliente"
              value={formData?.clientNotes || ''}
              onChange={(e) => handleInputChange('clientNotes', e?.target?.value)}
            />
          </div>
        )}

        <div className="flex justify-end pt-4">
          <Button onClick={handleNext} iconName="ArrowRight" iconPosition="right">
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClientInfoStep;