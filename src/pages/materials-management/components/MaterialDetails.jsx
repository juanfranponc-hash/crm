import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MaterialDetails = ({ material, onEditMaterial, onAdjustStock }) => {
  if (!material) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-center py-8">
          <Icon name="Package" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            Selecciona un Material
          </h3>
          <p className="text-muted-foreground">
            Selecciona un material de la tabla para ver sus detalles completos.
          </p>
        </div>
      </div>
    );
  }

  const getStockStatusColor = (current, minimum) => {
    if (current === 0) return 'text-error bg-error/10';
    if (current < minimum) return 'text-warning bg-warning/10';
    if (current <= minimum * 2) return 'text-accent bg-accent/10';
    return 'text-success bg-success/10';
  };

  const getStockStatusText = (current, minimum) => {
    if (current === 0) return 'Sin Stock';
    if (current < minimum) return 'Stock Bajo';
    if (current <= minimum * 2) return 'Stock Normal';
    return 'Stock Alto';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    })?.format(amount);
  };

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })?.format(new Date(dateString));
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="border-b border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-foreground">{material?.name}</h3>
          <Button
            size="sm"
            variant="outline"
            iconName="Edit"
            onClick={() => onEditMaterial?.(material)}
          >
            Editar
          </Button>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
            {material?.category}
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStockStatusColor(material?.currentStock, material?.minimumThreshold)}`}>
            {getStockStatusText(material?.currentStock, material?.minimumThreshold)}
          </span>
        </div>
      </div>

      {/* Stock Information */}
      <div className="p-6 border-b border-border">
        <h4 className="text-sm font-medium text-foreground mb-4 flex items-center">
          <Icon name="Package" size={16} className="mr-2" />
          Información de Stock
        </h4>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-foreground">{material?.currentStock}</div>
            <div className="text-sm text-muted-foreground">Stock Actual</div>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-foreground">{material?.minimumThreshold}</div>
            <div className="text-sm text-muted-foreground">Stock Mínimo</div>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-3">
          <Button
            size="sm"
            variant="outline"
            iconName="Minus"
            onClick={() => onAdjustStock?.(material, -1)}
            disabled={material?.currentStock === 0}
          />
          <span className="text-sm text-muted-foreground">Ajustar Stock</span>
          <Button
            size="sm"
            variant="outline"
            iconName="Plus"
            onClick={() => onAdjustStock?.(material, 1)}
          />
        </div>
      </div>

      {/* Material Details */}
      <div className="p-6 space-y-6">
        {/* Supplier Information */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
            <Icon name="Truck" size={16} className="mr-2" />
            Información del Proveedor
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Proveedor:</span>
              <span className="text-sm font-medium text-foreground">{material?.supplier}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Contacto:</span>
              <span className="text-sm font-medium text-foreground">{material?.supplierContact}</span>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
            <Icon name="DollarSign" size={16} className="mr-2" />
            Información de Precios
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Precio por unidad:</span>
              <span className="text-sm font-medium text-foreground">{formatCurrency(material?.unitCost)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Valor total stock:</span>
              <span className="text-sm font-bold text-foreground">
                {formatCurrency(material?.unitCost * material?.currentStock)}
              </span>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
            <Icon name="FileText" size={16} className="mr-2" />
            Especificaciones
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {material?.specifications}
          </p>
        </div>

        {/* Location & Usage */}
        <div className="grid grid-cols-1 gap-4">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2 flex items-center">
              <Icon name="MapPin" size={16} className="mr-2" />
              Ubicación
            </h4>
            <p className="text-sm text-muted-foreground">{material?.location}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2 flex items-center">
              <Icon name="TrendingUp" size={16} className="mr-2" />
              Uso Mensual
            </h4>
            <p className="text-sm text-muted-foreground">{material?.usageRate} unidades/mes</p>
          </div>
        </div>

        {/* Last Updated */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Última actualización:</span>
            <span>{formatDate(material?.lastUpdated)}</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6 bg-muted border-t border-border">
        <div className="flex space-x-3">
          <Button
            variant="outline"
            size="sm"
            iconName="RefreshCw"
            className="flex-1"
          >
            Reabastecerse
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="AlertTriangle"
            className="flex-1"
          >
            Reportar Problema
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MaterialDetails;