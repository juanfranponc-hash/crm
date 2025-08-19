import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MaterialsTable = ({ 
  materials, 
  onMaterialSelect, 
  selectedMaterial, 
  onEditMaterial,
  onAdjustStock 
}) => {
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
      year: 'numeric'
    })?.format(new Date(dateString));
  };

  if (!materials?.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <Icon name="Package" size={48} className="mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">No se encontraron materiales</h3>
        <p className="text-muted-foreground">
          Ajusta los filtros de búsqueda o añade nuevos materiales al inventario.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-4 font-medium text-foreground">Material</th>
              <th className="text-left p-4 font-medium text-foreground">Categoría</th>
              <th className="text-left p-4 font-medium text-foreground">Proveedor</th>
              <th className="text-center p-4 font-medium text-foreground">Stock</th>
              <th className="text-center p-4 font-medium text-foreground">Estado</th>
              <th className="text-right p-4 font-medium text-foreground">Precio</th>
              <th className="text-center p-4 font-medium text-foreground">Actualizado</th>
              <th className="text-center p-4 font-medium text-foreground">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {materials?.map((material) => (
              <tr
                key={material?.id}
                className={`border-b border-border hover:bg-muted/50 cursor-pointer transition-colors ${
                  selectedMaterial?.id === material?.id ? 'bg-primary/5 border-l-4 border-l-primary' : ''
                }`}
                onClick={() => onMaterialSelect?.(material)}
              >
                <td className="p-4">
                  <div>
                    <div className="font-medium text-foreground">{material?.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Min: {material?.minimumThreshold} unidades
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                    {material?.category}
                  </span>
                </td>
                <td className="p-4">
                  <div>
                    <div className="text-sm font-medium text-foreground">{material?.supplier}</div>
                    <div className="text-xs text-muted-foreground">{material?.supplierContact}</div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="text-lg font-bold text-foreground">{material?.currentStock}</div>
                  <div className="text-xs text-muted-foreground">unidades</div>
                </td>
                <td className="p-4 text-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStockStatusColor(material?.currentStock, material?.minimumThreshold)}`}>
                    {getStockStatusText(material?.currentStock, material?.minimumThreshold)}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="font-medium text-foreground">
                    {formatCurrency(material?.unitCost)}
                  </div>
                  <div className="text-xs text-muted-foreground">por unidad</div>
                </td>
                <td className="p-4 text-center text-sm text-muted-foreground">
                  {formatDate(material?.lastUpdated)}
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      iconName="Edit"
                      onClick={(e) => {
                        e?.stopPropagation();
                        onEditMaterial?.(material);
                      }}
                    />
                    <div className="flex items-center space-x-1">
                      <Button
                        size="sm"
                        variant="outline"
                        iconName="Minus"
                        onClick={(e) => {
                          e?.stopPropagation();
                          onAdjustStock?.(material, -1);
                        }}
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        iconName="Plus"
                        onClick={(e) => {
                          e?.stopPropagation();
                          onAdjustStock?.(material, 1);
                        }}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MaterialsTable;