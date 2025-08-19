import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AddClientModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    alternativePhone: '',
    address: '',
    location: '',
    clientType: 'individual',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const clientTypeOptions = [
    { value: 'individual', label: 'Individual' },
    { value: 'business', label: 'Empresa' },
    { value: 'dealer', label: 'Concesionario' }
  ];

  const locationOptions = [
    { value: 'madrid', label: 'Madrid' },
    { value: 'barcelona', label: 'Barcelona' },
    { value: 'valencia', label: 'Valencia' },
    { value: 'sevilla', label: 'Sevilla' },
    { value: 'bilbao', label: 'Bilbao' },
    { value: 'other', label: 'Otra ubicación' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'El formato del email no es válido';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'El teléfono es obligatorio';
    }

    if (!formData?.location) {
      newErrors.location = 'La ubicación es obligatoria';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const newClient = {
        ...formData,
        id: Date.now(),
        status: 'active',
        totalProjects: 0,
        completedProjects: 0,
        totalValue: 0,
        createdAt: new Date()?.toISOString(),
        lastActivity: new Date()?.toISOString(),
        projectHistory: [],
        communicationLog: []
      };

      await onSave(newClient);
      
      // Reset form
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        alternativePhone: '',
        address: '',
        location: '',
        clientType: 'individual',
        notes: ''
      });
      
      onClose();
    } catch (error) {
      console.error('Error saving client:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      alternativePhone: '',
      address: '',
      location: '',
      clientType: 'individual',
      notes: ''
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="UserPlus" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Añadir Nuevo Cliente</h2>
              <p className="text-sm text-muted-foreground">Complete la información del cliente</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={handleClose}
            className="text-muted-foreground hover:text-foreground"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Información Básica</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nombre Completo"
                type="text"
                placeholder="Ej: Juan Pérez"
                value={formData?.name}
                onChange={(e) => handleInputChange('name', e?.target?.value)}
                error={errors?.name}
                required
              />
              
              <Input
                label="Empresa"
                type="text"
                placeholder="Ej: Aventuras S.L."
                value={formData?.company}
                onChange={(e) => handleInputChange('company', e?.target?.value)}
                description="Opcional para clientes individuales"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Información de Contacto</h3>
            <div className="space-y-4">
              <Input
                label="Email"
                type="email"
                placeholder="ejemplo@email.com"
                value={formData?.email}
                onChange={(e) => handleInputChange('email', e?.target?.value)}
                error={errors?.email}
                required
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Teléfono Principal"
                  type="tel"
                  placeholder="+34 600 000 000"
                  value={formData?.phone}
                  onChange={(e) => handleInputChange('phone', e?.target?.value)}
                  error={errors?.phone}
                  required
                />
                
                <Input
                  label="Teléfono Alternativo"
                  type="tel"
                  placeholder="+34 600 000 000"
                  value={formData?.alternativePhone}
                  onChange={(e) => handleInputChange('alternativePhone', e?.target?.value)}
                  description="Opcional"
                />
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Dirección</h3>
            <div className="space-y-4">
              <Input
                label="Dirección Completa"
                type="text"
                placeholder="Calle, número, código postal"
                value={formData?.address}
                onChange={(e) => handleInputChange('address', e?.target?.value)}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Ubicación"
                  options={locationOptions}
                  value={formData?.location}
                  onChange={(value) => handleInputChange('location', value)}
                  error={errors?.location}
                  required
                  placeholder="Seleccionar ubicación"
                />
                
                <Select
                  label="Tipo de Cliente"
                  options={clientTypeOptions}
                  value={formData?.clientType}
                  onChange={(value) => handleInputChange('clientType', value)}
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Notas Adicionales</h3>
            <div className="relative">
              <textarea
                placeholder="Información adicional sobre el cliente, preferencias, historial, etc."
                value={formData?.notes}
                onChange={(e) => handleInputChange('notes', e?.target?.value)}
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="default"
              loading={isLoading}
              iconName="Save"
              iconPosition="left"
            >
              Guardar Cliente
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClientModal;