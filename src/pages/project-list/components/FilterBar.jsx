import React, { useState } from 'react';

import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const FilterBar = ({ onFiltersChange, activeFilters, onClearFilters }) => {
  const [filters, setFilters] = useState({
    client: '',
    vehicleType: '',
    conversionType: '',
    status: '',
    dateRange: '',
    search: ''
  });

  const clientOptions = [
    { value: '', label: 'Todos los clientes' },
    { value: 'maria-garcia', label: 'María García' },
    { value: 'carlos-rodriguez', label: 'Carlos Rodríguez' },
    { value: 'ana-martinez', label: 'Ana Martínez' },
    { value: 'david-lopez', label: 'David López' },
    { value: 'laura-sanchez', label: 'Laura Sánchez' }
  ];

  const vehicleTypeOptions = [
    { value: '', label: 'Todos los vehículos' },
    { value: 'fiat-ducato', label: 'Fiat Ducato' },
    { value: 'mercedes-sprinter', label: 'Mercedes Sprinter' },
    { value: 'volkswagen-crafter', label: 'Volkswagen Crafter' },
    { value: 'ford-transit', label: 'Ford Transit' },
    { value: 'iveco-daily', label: 'Iveco Daily' }
  ];

  const conversionTypeOptions = [
    { value: '', label: 'Todos los tipos' },
    { value: 'standard', label: 'Estándar' },
    { value: 'personalizada', label: 'Personalizada' }
  ];

  const statusOptions = [
    { value: '', label: 'Todos los estados' },
    { value: 'presupuesto', label: 'Presupuesto' },
    { value: 'confirmado', label: 'Confirmado' },
    { value: 'en-progreso', label: 'En Progreso' },
    { value: 'completado', label: 'Completado' },
    { value: 'cancelado', label: 'Cancelado' }
  ];

  const dateRangeOptions = [
    { value: '', label: 'Todas las fechas' },
    { value: 'today', label: 'Hoy' },
    { value: 'week', label: 'Esta semana' },
    { value: 'month', label: 'Este mes' },
    { value: 'quarter', label: 'Este trimestre' },
    { value: 'year', label: 'Este año' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClearAll = () => {
    const clearedFilters = {
      client: '',
      vehicleType: '',
      conversionType: '',
      status: '',
      dateRange: '',
      search: ''
    };
    setFilters(clearedFilters);
    onClearFilters();
  };

  const getActiveFilterCount = () => {
    return Object.values(filters)?.filter(value => value !== '')?.length;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-4">
        <Select
          label="Cliente"
          options={clientOptions}
          value={filters?.client}
          onChange={(value) => handleFilterChange('client', value)}
          placeholder="Seleccionar cliente"
        />

        <Select
          label="Tipo de Vehículo"
          options={vehicleTypeOptions}
          value={filters?.vehicleType}
          onChange={(value) => handleFilterChange('vehicleType', value)}
          placeholder="Seleccionar vehículo"
        />

        <Select
          label="Tipo de Conversión"
          options={conversionTypeOptions}
          value={filters?.conversionType}
          onChange={(value) => handleFilterChange('conversionType', value)}
          placeholder="Seleccionar tipo"
        />

        <Select
          label="Estado"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => handleFilterChange('status', value)}
          placeholder="Seleccionar estado"
        />

        <Select
          label="Rango de Fechas"
          options={dateRangeOptions}
          value={filters?.dateRange}
          onChange={(value) => handleFilterChange('dateRange', value)}
          placeholder="Seleccionar período"
        />

        <div className="flex flex-col">
          <Input
            label="Buscar"
            type="search"
            placeholder="Buscar proyectos..."
            value={filters?.search}
            onChange={(e) => handleFilterChange('search', e?.target?.value)}
          />
        </div>
      </div>
      {/* Filter Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">
            {getActiveFilterCount() > 0 && (
              `${getActiveFilterCount()} filtro${getActiveFilterCount() > 1 ? 's' : ''} activo${getActiveFilterCount() > 1 ? 's' : ''}`
            )}
          </span>
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
              iconName="X"
              iconPosition="left"
            >
              Limpiar filtros
            </Button>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
          >
            Exportar
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Save"
            iconPosition="left"
          >
            Guardar filtros
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;