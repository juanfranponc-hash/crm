import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PricingTab = ({ project, onUpdatePricing }) => {
  const [pricingItems, setPricingItems] = useState(project?.pricing?.items || []);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('1');
  const [discount, setDiscount] = useState(project?.pricing?.discount || 0);
  const [tax, setTax] = useState(project?.pricing?.tax || 21);

  const calculateSubtotal = () => {
    return pricingItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
  };

  const calculateDiscountAmount = () => {
    return (calculateSubtotal() * discount) / 100;
  };

  const calculateTaxAmount = () => {
    const afterDiscount = calculateSubtotal() - calculateDiscountAmount();
    return (afterDiscount * tax) / 100;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscountAmount() + calculateTaxAmount();
  };

  useEffect(() => {
    onUpdatePricing?.({
      items: pricingItems,
      discount,
      tax,
      subtotal: calculateSubtotal(),
      total: calculateTotal()
    });
  }, [pricingItems, discount, tax]);

  const handleAddItem = () => {
    if (newItemName?.trim() && newItemPrice && newItemQuantity) {
      const newItem = {
        id: Date.now(),
        name: newItemName,
        price: parseFloat(newItemPrice),
        quantity: parseInt(newItemQuantity),
        category: 'Personalizado'
      };
      
      setPricingItems([...pricingItems, newItem]);
      setNewItemName('');
      setNewItemPrice('');
      setNewItemQuantity('1');
    }
  };

  const handleRemoveItem = (itemId) => {
    setPricingItems(pricingItems?.filter(item => item?.id !== itemId));
  };

  const handleUpdateItem = (itemId, field, value) => {
    setPricingItems(pricingItems?.map(item => 
      item?.id === itemId ? { 
        ...item, 
        [field]: field === 'price' ? parseFloat(value) || 0 : 
                field === 'quantity' ? parseInt(value) || 1 : value 
      } : item
    ));
  };

  const categoryColors = {
    'Base': 'bg-primary/10 text-primary',
    'Personalizado': 'bg-accent/10 text-accent',
    'Materiales': 'bg-success/10 text-success',
    'Mano de Obra': 'bg-warning/10 text-warning',
    'Extras': 'bg-secondary/10 text-secondary'
  };

  return (
    <div className="space-y-6">
      {/* Add New Item */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Plus" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-card-foreground">Agregar Elemento de Precio</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="md:col-span-2">
            <Input
              label="Descripción del Elemento"
              type="text"
              placeholder="Ej: Instalación de paneles solares"
              value={newItemName}
              onChange={(e) => setNewItemName(e?.target?.value)}
            />
          </div>
          <Input
            label="Precio Unitario (€)"
            type="number"
            placeholder="0.00"
            value={newItemPrice}
            onChange={(e) => setNewItemPrice(e?.target?.value)}
          />
          <Input
            label="Cantidad"
            type="number"
            placeholder="1"
            value={newItemQuantity}
            onChange={(e) => setNewItemQuantity(e?.target?.value)}
          />
        </div>
        
        <Button 
          onClick={handleAddItem}
          disabled={!newItemName?.trim() || !newItemPrice || !newItemQuantity}
          iconName="Plus"
          iconPosition="left"
        >
          Agregar Elemento
        </Button>
      </div>
      {/* Pricing Items List */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Receipt" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-card-foreground">Desglose de Precios</h3>
          </div>
          <span className="text-sm text-muted-foreground">
            {pricingItems?.length} elemento{pricingItems?.length !== 1 ? 's' : ''}
          </span>
        </div>
        
        {pricingItems?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Receipt" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No hay elementos de precio agregados</p>
            <p className="text-sm text-muted-foreground mt-1">
              Utiliza el formulario anterior para agregar elementos de precio
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {pricingItems?.map((item) => (
              <div key={item?.id} className="flex items-center space-x-4 p-4 border border-border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors?.[item?.category] || categoryColors?.['Personalizado']}`}>
                      {item?.category}
                    </span>
                  </div>
                  <input
                    type="text"
                    value={item?.name}
                    onChange={(e) => handleUpdateItem(item?.id, 'name', e?.target?.value)}
                    className="text-sm font-medium text-card-foreground bg-transparent border-none outline-none w-full"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={item?.quantity}
                    onChange={(e) => handleUpdateItem(item?.id, 'quantity', e?.target?.value)}
                    className="w-16 px-2 py-1 text-sm border border-border rounded text-center"
                    min="1"
                  />
                  <span className="text-sm text-muted-foreground">×</span>
                  <input
                    type="number"
                    value={item?.price}
                    onChange={(e) => handleUpdateItem(item?.id, 'price', e?.target?.value)}
                    className="w-24 px-2 py-1 text-sm border border-border rounded text-right"
                    step="0.01"
                    min="0"
                  />
                  <span className="text-sm text-muted-foreground">=</span>
                  <span className="text-sm font-semibold text-card-foreground w-20 text-right">
                    €{(item?.price * item?.quantity)?.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveItem(item?.id)}
                  iconName="Trash2"
                  className="text-error hover:text-error"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Pricing Summary */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Calculator" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-card-foreground">Resumen de Precios</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-card-foreground w-24">Descuento (%):</label>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(parseFloat(e?.target?.value) || 0)}
                className="flex-1 px-3 py-2 border border-border rounded-md text-sm"
                min="0"
                max="100"
                step="0.1"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-card-foreground w-24">IVA (%):</label>
              <input
                type="number"
                value={tax}
                onChange={(e) => setTax(parseFloat(e?.target?.value) || 0)}
                className="flex-1 px-3 py-2 border border-border rounded-md text-sm"
                min="0"
                max="100"
                step="0.1"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">Subtotal:</span>
              <span className="text-sm font-medium text-card-foreground">
                €{calculateSubtotal()?.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
              </span>
            </div>
            
            {discount > 0 && (
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm text-success">Descuento ({discount}%):</span>
                <span className="text-sm font-medium text-success">
                  -€{calculateDiscountAmount()?.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                </span>
              </div>
            )}
            
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">IVA ({tax}%):</span>
              <span className="text-sm font-medium text-card-foreground">
                €{calculateTaxAmount()?.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
              </span>
            </div>
            
            <div className="flex justify-between items-center py-3 bg-primary/10 px-4 rounded-lg">
              <span className="text-lg font-bold text-card-foreground">Total:</span>
              <span className="text-xl font-bold text-primary">
                €{calculateTotal()?.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Payment Terms */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="CreditCard" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-card-foreground">Términos de Pago</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-border rounded-lg">
            <h4 className="font-medium text-card-foreground mb-2">Anticipo (30%)</h4>
            <p className="text-2xl font-bold text-primary">
              €{(calculateTotal() * 0.3)?.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Al confirmar el proyecto</p>
          </div>
          
          <div className="p-4 border border-border rounded-lg">
            <h4 className="font-medium text-card-foreground mb-2">Progreso (40%)</h4>
            <p className="text-2xl font-bold text-warning">
              €{(calculateTotal() * 0.4)?.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Al 50% de avance</p>
          </div>
          
          <div className="p-4 border border-border rounded-lg">
            <h4 className="font-medium text-card-foreground mb-2">Final (30%)</h4>
            <p className="text-2xl font-bold text-success">
              €{(calculateTotal() * 0.3)?.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Al completar el proyecto</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingTab;