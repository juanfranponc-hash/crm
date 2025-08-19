import React from 'react';
import SearchInput from '../../../components/ui/SearchInput';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const MaterialFilters = ({
  searchTerm,
  onSearchChange,
  filters,
  onFilterChange,
  onClearFilters,
  materials
}) => {
  // Get unique values for filter options
  const categories = [...new Set(materials?.map(m => m?.category))];
  const suppliers = [...new Set(materials?.map(m => m?.supplier))];

  const categoryOptions = [
    { value: 'all', label: 'Todas las categorías' },
    ...categories?.map(cat => ({ value: cat?.toLowerCase(), label: cat }))
  ];

  const supplierOptions = [
    { value: 'all', label: 'Todos los proveedores' },
    ...suppliers?.map(sup => ({ value: sup, label: sup }))
  ];

  const stockLevelOptions = [
    { value: 'all', label: 'Todos los niveles' },
    { value: 'out', label: 'Sin stock' },
    { value: 'low', label: 'Stock bajo' },
    { value: 'medium', label: 'Stock normal' },
    { value: 'high', label: 'Stock alto' }
  ];

  const hasActiveFilters = 
    filters?.category !== 'all' || 
    filters?.supplier !== 'all' || 
    filters?.stockLevel !== 'all' ||
    searchTerm?.trim();

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Search */}
        <div className="lg:col-span-4">
          <SearchInput
            placeholder="Buscar materiales..."
            value={searchTerm}
            onSearch={onSearchChange}
            onClear={() => onSearchChange('')}
            size="default"
          />
        </div>

        {/* Category Filter */}
        <div className="lg:col-span-3">
          <Select
            value={filters?.category}
            onValueChange={(value) => onFilterChange?.('category', value)}
            options={categoryOptions}
            placeholder="Categoría"
          />
        </div>

        {/* Supplier Filter */}
        <div className="lg:col-span-3">
          <Select
            value={filters?.supplier}
            onValueChange={(value) => onFilterChange?.('supplier', value)}
            options={supplierOptions}
            placeholder="Proveedor"
          />
        </div>

        {/* Stock Level Filter */}
        <div className="lg:col-span-2">
          <Select
            value={filters?.stockLevel}
            onValueChange={(value) => onFilterChange?.('stockLevel', value)}
            options={stockLevelOptions}
            placeholder="Nivel de Stock"
          />
        </div>

        {/* Clear Filters Button - only show if there are active filters */}
        {hasActiveFilters && (
          <div className="lg:col-span-12 flex justify-end">
            <Button
              variant="outline"
              size="sm"
              iconName="X"
              iconPosition="left"
              onClick={onClearFilters}
            >
              Limpiar Filtros
            </Button>
          </div>
        )}
      </div>

      {/* Filter Summary */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">Filtros activos:</span>
            {searchTerm?.trim() && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                Búsqueda: "{searchTerm}"
              </span>
            )}
            {filters?.category !== 'all' && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                Categoría: {filters?.category}
              </span>
            )}
            {filters?.supplier !== 'all' && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                Proveedor: {filters?.supplier}
              </span>
            )}
            {filters?.stockLevel !== 'all' && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                Stock: {stockLevelOptions?.find(opt => opt?.value === filters?.stockLevel)?.label}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MaterialFilters;