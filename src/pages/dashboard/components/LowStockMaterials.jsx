import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LowStockMaterials = ({ materials }) => {
  const navigate = useNavigate();

  const getStockStatusColor = (current, minimum) => {
    if (current === 0) return 'text-error';
    if (current < minimum) return 'text-warning';
    return 'text-muted-foreground';
  };

  const getStockStatusIcon = (current, minimum) => {
    if (current === 0) return 'XCircle';
    if (current < minimum) return 'AlertTriangle';
    return 'Package';
  };

  const handleViewMaterials = () => {
    navigate('/materials-management');
  };

  if (!materials?.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center">
            <Icon name="Package" size={20} className="mr-2" />
            Material con Poco Stock
          </h3>
        </div>
        
        <div className="text-center py-6">
          <Icon name="CheckCircle" size={48} className="mx-auto text-success mb-3" />
          <p className="text-sm text-muted-foreground">
            Todos los materiales tienen stock suficiente
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center">
          <Icon name="Package" size={20} className="mr-2" />
          Material con Poco Stock
        </h3>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning text-warning-foreground">
          {materials?.length} críticos
        </span>
      </div>
      
      <div className="space-y-3 mb-4">
        {materials?.map((material) => (
          <div
            key={material?.id}
            className="flex items-start justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <Icon
                  name={getStockStatusIcon(material?.currentStock, material?.minimumThreshold)}
                  size={16}
                  className={getStockStatusColor(material?.currentStock, material?.minimumThreshold)}
                />
                <p className="text-sm font-medium text-foreground truncate">
                  {material?.name}
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span>{material?.category}</span>
                  <span>•</span>
                  <span className="truncate">{material?.supplier}</span>
                </div>
                
                <div className="flex items-center space-x-1 text-xs">
                  <span className={`font-medium ${getStockStatusColor(material?.currentStock, material?.minimumThreshold)}`}>
                    {material?.currentStock}
                  </span>
                  <span className="text-muted-foreground">/</span>
                  <span className="text-muted-foreground">
                    {material?.minimumThreshold} min
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <Button
        variant="outline"
        size="sm"
        iconName="ArrowRight"
        iconPosition="right"
        onClick={handleViewMaterials}
        className="w-full"
      >
        Ver Todos los Materiales
      </Button>
    </div>
  );
};

export default LowStockMaterials;