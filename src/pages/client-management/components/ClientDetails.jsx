import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ClientDetails = ({ client, onEditClient, onCreateProject }) => {
  if (!client) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">Selecciona un Cliente</h3>
        <p className="text-muted-foreground">
          Selecciona un cliente de la lista para ver sus detalles completos
        </p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    })?.format(amount);
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="User" size={24} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{client?.name}</h2>
              <p className="text-muted-foreground">{client?.company}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  client?.status === 'active' ?'bg-success/10 text-success' 
                    : client?.status === 'inactive' ?'bg-muted text-muted-foreground' :'bg-warning/10 text-warning'
                }`}>
                  {client?.status === 'active' ? 'Activo' : client?.status === 'inactive' ? 'Inactivo' : 'Pendiente'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Edit"
              iconPosition="left"
              onClick={() => onEditClient(client)}
            >
              Editar
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="Plus"
              iconPosition="left"
              onClick={() => onCreateProject(client)}
            >
              Nuevo Proyecto
            </Button>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">Información de Contacto</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Icon name="Mail" size={16} className="text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium text-foreground">Email</div>
                  <div className="text-sm text-muted-foreground">{client?.email}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Phone" size={16} className="text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium text-foreground">Teléfono Principal</div>
                  <div className="text-sm text-muted-foreground">{client?.phone}</div>
                </div>
              </div>
              {client?.alternativePhone && (
                <div className="flex items-center space-x-3">
                  <Icon name="Smartphone" size={16} className="text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium text-foreground">Teléfono Alternativo</div>
                    <div className="text-sm text-muted-foreground">{client?.alternativePhone}</div>
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Icon name="MapPin" size={16} className="text-muted-foreground mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-foreground">Dirección</div>
                  <div className="text-sm text-muted-foreground">
                    {client?.address}<br />
                    {client?.location}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Calendar" size={16} className="text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium text-foreground">Cliente desde</div>
                  <div className="text-sm text-muted-foreground">{formatDate(client?.createdAt)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Statistics */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">Estadísticas de Proyectos</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="FolderOpen" size={20} className="text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{client?.totalProjects}</div>
                  <div className="text-sm text-muted-foreground">Total Proyectos</div>
                </div>
              </div>
            </div>
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="CheckCircle" size={20} className="text-success" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{client?.completedProjects}</div>
                  <div className="text-sm text-muted-foreground">Completados</div>
                </div>
              </div>
            </div>
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="Euro" size={20} className="text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{formatCurrency(client?.totalValue)}</div>
                  <div className="text-sm text-muted-foreground">Valor Total</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project History */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">Historial de Proyectos</h3>
          <div className="space-y-3">
            {client?.projectHistory?.map((project) => (
              <div key={project?.id} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    project?.status === 'completed' ? 'bg-success' :
                    project?.status === 'in-progress'? 'bg-warning' : 'bg-muted-foreground'
                  }`}></div>
                  <div>
                    <div className="font-medium text-foreground">{project?.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {project?.vehicleType} • {formatDate(project?.createdAt)}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-foreground">{formatCurrency(project?.price)}</div>
                  <div className="text-sm text-muted-foreground capitalize">{project?.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        {client?.notes && (
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Notas</h3>
            <div className="bg-muted/20 rounded-lg p-4">
              <p className="text-sm text-foreground whitespace-pre-wrap">{client?.notes}</p>
            </div>
          </div>
        )}

        {/* Communication Log */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">Registro de Comunicación</h3>
          <div className="space-y-3">
            {client?.communicationLog?.map((log) => (
              <div key={log?.id} className="flex items-start space-x-3 p-3 bg-muted/20 rounded-lg">
                <Icon name={log?.type === 'email' ? 'Mail' : log?.type === 'phone' ? 'Phone' : 'MessageSquare'} 
                      size={16} className="text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm font-medium text-foreground">{log?.subject}</div>
                    <div className="text-xs text-muted-foreground">{formatDate(log?.date)}</div>
                  </div>
                  <p className="text-sm text-muted-foreground">{log?.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;