import React from 'react';
import SearchInput from '../../../components/ui/SearchInput';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const ClientFilters = ({ 
  searchTerm, 
  onSearchChange, 
  filters, 
  onFilterChange, 
  onClearFilters,
  onBulkAction 
}) => {
  const clientTypeOptions = [
    { value: 'all', label: 'Todos los tipos' },
    { value: 'individual', label: 'Individual' },
    { value: 'business', label: 'Empresa' },
    { value: 'dealer', label: 'Concesionario' }
  ];

  const locationOptions = [
    { value: 'all', label: 'Todas las ubicaciones' },
    { value: 'madrid', label: 'Madrid' },
    { value: 'barcelona', label: 'Barcelona' },
    { value: 'valencia', label: 'Valencia' },
    { value: 'sevilla', label: 'Sevilla' },
    { value: 'bilbao', label: 'Bilbao' }
  ];

  const statusOptions = [
    { value: 'all', label: 'Todos los estados' },
    { value: 'active', label: 'Activo' },
    { value: 'inactive', label: 'Inactivo' },
    { value: 'pending', label: 'Pendiente' }
  ];

  const activityOptions = [
    { value: 'all', label: 'Toda la actividad' },
    { value: 'last-week', label: 'Última semana' },
    { value: 'last-month', label: 'Último mes' },
    { value: 'last-quarter', label: 'Último trimestre' },
    { value: 'last-year', label: 'Último año' }
  ];

  const bulkActionOptions = [
    { value: '', label: 'Acciones en lote' },
    { value: 'email', label: 'Enviar email masivo' },
    { value: 'export', label: 'Exportar seleccionados' },
    { value: 'archive', label: 'Archivar seleccionados' },
    { value: 'tag', label: 'Añadir etiqueta' }
  ];

  const hasActiveFilters = filters?.clientType !== 'all' || 
                          filters?.location !== 'all' || 
                          filters?.status !== 'all' || 
                          filters?.activity !== 'all';

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      {/* Search and Quick Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div className="flex-1 max-w-md">
          <SearchInput
            placeholder="Buscar clientes por nombre, empresa o email..."
            value={searchTerm}
            onSearch={onSearchChange}
            onClear={() => onSearchChange('')}
            size="default"
          />
        </div>
        <div className="flex items-center space-x-3">
          <Select
            options={bulkActionOptions}
            value=""
            onChange={(value) => value && onBulkAction(value)}
            placeholder="Acciones en lote"
            className="w-48"
          />
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            onClick={() => onBulkAction('export-all')}
          >
            Exportar Todo
          </Button>
        </div>
      </div>
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select
          label="Tipo de Cliente"
          options={clientTypeOptions}
          value={filters?.clientType}
          onChange={(value) => onFilterChange('clientType', value)}
        />
        
        <Select
          label="Ubicación"
          options={locationOptions}
          value={filters?.location}
          onChange={(value) => onFilterChange('location', value)}
        />
        
        <Select
          label="Estado"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => onFilterChange('status', value)}
        />
        
        <Select
          label="Actividad"
          options={activityOptions}
          value={filters?.activity}
          onChange={(value) => onFilterChange('activity', value)}
        />
      </div>
      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            iconPosition="left"
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Limpiar Filtros
          </Button>
        </div>
      )}
    </div>
  );
};

export default ClientFilters;