import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import StatusBadge from './StatusBadge';
import ActionDropdown from './ActionDropdown';

const ProjectTable = ({ projects, onSort, sortConfig, onSelectProject, selectedProjects, onSelectAll, onBulkAction }) => {
  const [hoveredRow, setHoveredRow] = useState(null);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    })?.format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleSort = (column) => {
    const direction = sortConfig?.column === column && sortConfig?.direction === 'asc' ? 'desc' : 'asc';
    onSort({ column, direction });
  };

  const getSortIcon = (column) => {
    if (sortConfig?.column !== column) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    }
    return sortConfig?.direction === 'asc' 
      ? <Icon name="ArrowUp" size={14} className="text-foreground" />
      : <Icon name="ArrowDown" size={14} className="text-foreground" />;
  };

  const isAllSelected = projects?.length > 0 && selectedProjects?.length === projects?.length;
  const isIndeterminate = selectedProjects?.length > 0 && selectedProjects?.length < projects?.length;

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Table Header */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isIndeterminate}
                  onChange={(e) => onSelectAll(e?.target?.checked)}
                />
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('id')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  <span>ID Proyecto</span>
                  {getSortIcon('id')}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('client')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  <span>Cliente</span>
                  {getSortIcon('client')}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('vehicle')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  <span>Vehículo</span>
                  {getSortIcon('vehicle')}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('conversionType')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  <span>Tipo Conversión</span>
                  {getSortIcon('conversionType')}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  <span>Estado</span>
                  {getSortIcon('status')}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('price')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  <span>Precio</span>
                  {getSortIcon('price')}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('createdAt')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  <span>Fecha Creación</span>
                  {getSortIcon('createdAt')}
                </button>
              </th>
              <th className="w-20 px-4 py-3 text-center">
                <span className="text-sm font-medium text-foreground">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {projects?.map((project) => (
              <tr
                key={project?.id}
                className={`hover:bg-muted/30 transition-colors ${
                  selectedProjects?.includes(project?.id) ? 'bg-muted/20' : ''
                }`}
                onMouseEnter={() => setHoveredRow(project?.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td className="px-4 py-3">
                  <Checkbox
                    checked={selectedProjects?.includes(project?.id)}
                    onChange={(e) => onSelectProject(project?.id, e?.target?.checked)}
                  />
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-medium text-primary">#{project?.id}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                      <Icon name="User" size={16} color="white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{project?.clientName}</div>
                      <div className="text-xs text-muted-foreground">{project?.clientEmail}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div>
                    <div className="text-sm font-medium text-foreground">{project?.vehicleModel}</div>
                    <div className="text-xs text-muted-foreground">{project?.vehicleYear}</div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    project?.conversionType === 'standard' ?'bg-blue-100 text-blue-800' :'bg-purple-100 text-purple-800'
                  }`}>
                    {project?.conversionType === 'standard' ? 'Estándar' : 'Personalizada'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={project?.status} />
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-medium text-foreground">
                    {formatCurrency(project?.price)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-muted-foreground">
                    {formatDate(project?.createdAt)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <ActionDropdown
                    project={project}
                    onView={() => console.log('Ver proyecto', project?.id)}
                    onEdit={() => console.log('Editar proyecto', project?.id)}
                    onDuplicate={() => console.log('Duplicar proyecto', project?.id)}
                    onDelete={() => console.log('Eliminar proyecto', project?.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Empty State */}
      {projects?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FolderOpen" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No hay proyectos</h3>
          <p className="text-muted-foreground mb-4">
            No se encontraron proyectos que coincidan con los filtros seleccionados.
          </p>
          <Button variant="outline" iconName="RotateCcw" iconPosition="left">
            Limpiar filtros
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectTable;