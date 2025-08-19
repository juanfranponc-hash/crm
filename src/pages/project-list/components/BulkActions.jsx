import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActions = ({ selectedCount, onBulkAction, onClearSelection }) => {
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const dropdownRef = useRef(null);

  const statusOptions = [
    { value: 'presupuesto', label: 'Presupuesto' },
    { value: 'confirmado', label: 'Confirmado' },
    { value: 'en-progreso', label: 'En Progreso' },
    { value: 'completado', label: 'Completado' },
    { value: 'cancelado', label: 'Cancelado' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsStatusDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleStatusUpdate = () => {
    if (selectedStatus) {
      onBulkAction('updateStatus', selectedStatus);
      setSelectedStatus('');
      setIsStatusDropdownOpen(false);
    }
  };

  if (selectedCount === 0) {
    return null;
  }

  return (
    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={20} className="text-primary" />
            <span className="text-sm font-medium text-foreground">
              {selectedCount} proyecto{selectedCount > 1 ? 's' : ''} seleccionado{selectedCount > 1 ? 's' : ''}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative" ref={dropdownRef}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                iconName="RefreshCw"
                iconPosition="left"
              >
                Cambiar estado
              </Button>

              {isStatusDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-popover border border-border rounded-md shadow-dropdown z-50 animate-slide-down">
                  <div className="p-3">
                    <Select
                      label="Nuevo estado"
                      options={statusOptions}
                      value={selectedStatus}
                      onChange={setSelectedStatus}
                      placeholder="Seleccionar estado"
                    />
                    <div className="flex items-center space-x-2 mt-3">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={handleStatusUpdate}
                        disabled={!selectedStatus}
                      >
                        Aplicar
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsStatusDropdownOpen(false)}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onBulkAction('export')}
              iconName="Download"
              iconPosition="left"
            >
              Exportar
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onBulkAction('duplicate')}
              iconName="Copy"
              iconPosition="left"
            >
              Duplicar
            </Button>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => onBulkAction('delete')}
              iconName="Trash2"
              iconPosition="left"
            >
              Eliminar
            </Button>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onClearSelection}
          iconName="X"
          iconPosition="left"
        >
          Limpiar selección
        </Button>
      </div>
    </div>
  );
};

export default BulkActions;