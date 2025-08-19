import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import StatusBadge from './StatusBadge';

const ProjectsTable = ({ projects, onSort, sortField, sortDirection }) => {
  const navigate = useNavigate();

  const handleRowClick = (projectId) => {
    navigate(`/project-details?id=${projectId}`);
  };

  const handleSort = (field) => {
    onSort(field);
  };

  const SortableHeader = ({ field, children }) => (
    <th 
      className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors duration-150"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        <div className="flex flex-col">
          <Icon 
            name="ChevronUp" 
            size={12} 
            className={`${sortField === field && sortDirection === 'asc' ? 'text-primary' : 'text-muted-foreground/50'}`}
          />
          <Icon 
            name="ChevronDown" 
            size={12} 
            className={`-mt-1 ${sortField === field && sortDirection === 'desc' ? 'text-primary' : 'text-muted-foreground/50'}`}
          />
        </div>
      </div>
    </th>
  );

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted/50">
            <tr>
              <SortableHeader field="client">Cliente</SortableHeader>
              <SortableHeader field="vehicle">Vehículo</SortableHeader>
              <SortableHeader field="type">Tipo</SortableHeader>
              <SortableHeader field="status">Estado</SortableHeader>
              <SortableHeader field="dueDate">Fecha límite</SortableHeader>
              <SortableHeader field="price">Precio</SortableHeader>
              <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            {projects?.map((project) => (
              <tr 
                key={project?.id}
                className="hover:bg-muted/30 cursor-pointer transition-colors duration-150"
                onClick={() => handleRowClick(project?.id)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center mr-3">
                      <Icon name="User" size={16} color="white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{project?.client}</div>
                      <div className="text-sm text-muted-foreground">{project?.clientEmail}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-foreground">{project?.vehicle}</div>
                  <div className="text-sm text-muted-foreground">{project?.vehicleYear}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-foreground">{project?.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={project?.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {project?.dueDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                  €{project?.price?.toLocaleString('es-ES')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={(e) => {
                      e?.stopPropagation();
                      navigate(`/project-details?id=${project?.id}`);
                    }}
                    className="text-primary hover:text-primary/80 transition-colors duration-150"
                  >
                    <Icon name="Eye" size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectsTable;