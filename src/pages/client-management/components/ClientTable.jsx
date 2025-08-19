import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ClientTable = ({ clients, onClientSelect, selectedClient, onEditClient, onArchiveClient }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedClients = React.useMemo(() => {
    if (!sortConfig?.key) return clients;

    return [...clients]?.sort((a, b) => {
      const aValue = a?.[sortConfig?.key];
      const bValue = b?.[sortConfig?.key];

      if (aValue < bValue) {
        return sortConfig?.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig?.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [clients, sortConfig]);

  const getSortIcon = (columnKey) => {
    if (sortConfig?.key !== columnKey) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    }
    return sortConfig?.direction === 'asc' 
      ? <Icon name="ArrowUp" size={14} className="text-primary" />
      : <Icon name="ArrowDown" size={14} className="text-primary" />;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  <span>Nombre</span>
                  {getSortIcon('name')}
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('company')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  <span>Empresa</span>
                  {getSortIcon('company')}
                </button>
              </th>
              <th className="text-left p-4">
                <span className="text-sm font-medium text-foreground">Contacto</span>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('totalProjects')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  <span>Proyectos</span>
                  {getSortIcon('totalProjects')}
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('lastActivity')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  <span>Última Actividad</span>
                  {getSortIcon('lastActivity')}
                </button>
              </th>
              <th className="text-left p-4">
                <span className="text-sm font-medium text-foreground">Estado</span>
              </th>
              <th className="text-right p-4">
                <span className="text-sm font-medium text-foreground">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedClients?.map((client) => (
              <tr
                key={client?.id}
                className={`border-b border-border hover:bg-muted/30 cursor-pointer transition-colors ${
                  selectedClient?.id === client?.id ? 'bg-muted/50' : ''
                }`}
                onClick={() => onClientSelect(client)}
              >
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="User" size={16} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{client?.name}</div>
                      <div className="text-sm text-muted-foreground">{client?.location}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-foreground">{client?.company}</div>
                </td>
                <td className="p-4">
                  <div className="space-y-1">
                    <div className="text-sm text-foreground">{client?.email}</div>
                    <div className="text-sm text-muted-foreground">{client?.phone}</div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-foreground">{client?.totalProjects}</span>
                    <span className="text-xs text-muted-foreground">proyectos</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-foreground">{formatDate(client?.lastActivity)}</div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    client?.status === 'active' ?'bg-success/10 text-success' 
                      : client?.status === 'inactive' ?'bg-muted text-muted-foreground' :'bg-warning/10 text-warning'
                  }`}>
                    {client?.status === 'active' ? 'Activo' : client?.status === 'inactive' ? 'Inactivo' : 'Pendiente'}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Edit"
                      iconSize={14}
                      onClick={(e) => {
                        e?.stopPropagation();
                        onEditClient(client);
                      }}
                      className="text-muted-foreground hover:text-foreground"
                    >
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Archive"
                      iconSize={14}
                      onClick={(e) => {
                        e?.stopPropagation();
                        onArchiveClient(client);
                      }}
                      className="text-muted-foreground hover:text-warning"
                    >
                    </Button>
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

export default ClientTable;