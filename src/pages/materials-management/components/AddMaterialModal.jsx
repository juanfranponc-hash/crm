import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AddMaterialModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    supplier: '',
    supplierContact: '',
    currentStock: '',
    minimumThreshold: '',
    unitCost: '',
    specifications: '',
    reorderPoint: '',
    location: '',
    usageRate: ''
  });

  const [errors, setErrors] = useState({});

  const categoryOptions = [
    { value: 'Wood', label: 'Madera' },
    { value: 'Solar', label: 'Solar' },
    { value: 'Electrical', label: 'Eléctrico' },
    { value: 'Plumbing', label: 'Fontanería' },
    { value: 'Hardware', label: 'Ferretería' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'El nombre del material es obligatorio';
    }

    if (!formData?.category) {
      newErrors.category = 'La categoría es obligatoria';
    }

    if (!formData?.supplier?.trim()) {
      newErrors.supplier = 'El proveedor es obligatorio';
    }

    if (!formData?.currentStock || formData?.currentStock < 0) {
      newErrors.currentStock = 'El stock actual debe ser un número válido';
    }

    if (!formData?.minimumThreshold || formData?.minimumThreshold < 0) {
      newErrors.minimumThreshold = 'El stock mínimo debe ser un número válido';
    }

    if (!formData?.unitCost || formData?.unitCost <= 0) {
      newErrors.unitCost = 'El precio unitario debe ser mayor a 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (validateForm()) {
      const materialData = {
        ...formData,
        currentStock: parseInt(formData?.currentStock),
        minimumThreshold: parseInt(formData?.minimumThreshold),
        unitCost: parseFloat(formData?.unitCost),
        reorderPoint: parseInt(formData?.reorderPoint || formData?.minimumThreshold),
        usageRate: parseInt(formData?.usageRate || 1)
      };
      
      onSave?.(materialData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      category: '',
      supplier: '',
      supplierContact: '',
      currentStock: '',
      minimumThreshold: '',
      unitCost: '',
      specifications: '',
      reorderPoint: '',
      location: '',
      usageRate: ''
    });
    setErrors({});
    onClose?.();
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-black bg-opacity-50" onClick={handleClose} />

        <div className="inline-block w-full max-w-2xl p-6 my-8 text-left align-middle transition-all transform bg-card border border-border rounded-lg shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-foreground">Añadir Nuevo Material</h3>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={handleClose}
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-1">
                  Nombre del Material *
                </label>
                <Input
                  value={formData?.name}
                  onChange={(e) => handleInputChange('name', e?.target?.value)}
                  placeholder="Ej: Madera Contrachapada 15mm"
                  error={errors?.name}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Categoría *
                </label>
                <Select
                  value={formData?.category}
                  onValueChange={(value) => handleInputChange('category', value)}
                  options={categoryOptions}
                  placeholder="Selecciona una categoría"
                  error={errors?.category}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Ubicación
                </label>
                <Input
                  value={formData?.location}
                  onChange={(e) => handleInputChange('location', e?.target?.value)}
                  placeholder="Ej: Almacén A - Estante 3"
                />
              </div>
            </div>

            {/* Supplier Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Proveedor *
                </label>
                <Input
                  value={formData?.supplier}
                  onChange={(e) => handleInputChange('supplier', e?.target?.value)}
                  placeholder="Ej: Maderas García S.L."
                  error={errors?.supplier}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Contacto del Proveedor
                </label>
                <Input
                  value={formData?.supplierContact}
                  onChange={(e) => handleInputChange('supplierContact', e?.target?.value)}
                  placeholder="Ej: +34 912 345 678"
                />
              </div>
            </div>

            {/* Stock Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Stock Actual *
                </label>
                <Input
                  type="number"
                  min="0"
                  value={formData?.currentStock}
                  onChange={(e) => handleInputChange('currentStock', e?.target?.value)}
                  placeholder="0"
                  error={errors?.currentStock}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Stock Mínimo *
                </label>
                <Input
                  type="number"
                  min="0"
                  value={formData?.minimumThreshold}
                  onChange={(e) => handleInputChange('minimumThreshold', e?.target?.value)}
                  placeholder="0"
                  error={errors?.minimumThreshold}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Uso Mensual
                </label>
                <Input
                  type="number"
                  min="0"
                  value={formData?.usageRate}
                  onChange={(e) => handleInputChange('usageRate', e?.target?.value)}
                  placeholder="1"
                />
              </div>
            </div>

            {/* Pricing */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Precio por Unidad (€) *
              </label>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={formData?.unitCost}
                onChange={(e) => handleInputChange('unitCost', e?.target?.value)}
                placeholder="0.00"
                error={errors?.unitCost}
              />
            </div>

            {/* Specifications */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Especificaciones
              </label>
              <textarea
                value={formData?.specifications}
                onChange={(e) => handleInputChange('specifications', e?.target?.value)}
                placeholder="Describe las especificaciones técnicas del material..."
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="default"
                iconName="Plus"
                iconPosition="left"
              >
                Añadir Material
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMaterialModal;