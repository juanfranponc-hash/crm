import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import ClientTable from './components/ClientTable';
import ClientDetails from './components/ClientDetails';
import ClientFilters from './components/ClientFilters';
import AddClientModal from './components/AddClientModal';

const ClientManagement = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    clientType: 'all',
    location: 'all',
    status: 'all',
    activity: 'all'
  });

  // Mock data
  const mockClients = [
    {
      id: 1,
      name: "Carlos Rodríguez",
      company: "Aventuras Extremas S.L.",
      email: "carlos@aventurasextremas.es",
      phone: "+34 666 123 456",
      alternativePhone: "+34 911 234 567",
      address: "Calle Mayor 123, 28001",
      location: "Madrid",
      clientType: "business",
      status: "active",
      totalProjects: 3,
      completedProjects: 2,
      totalValue: 85000,
      createdAt: "2023-01-15T10:00:00Z",
      lastActivity: "2024-08-10T14:30:00Z",
      notes: `Cliente muy satisfecho con nuestros servicios. Especializado en turismo de aventura.\nRequiere vehículos con equipamiento específico para actividades al aire libre.`,
      projectHistory: [
        {
          id: 101,
          name: "Furgoneta Mercedes Sprinter - Aventura",
          vehicleType: "Mercedes Sprinter",
          status: "completed",
          price: 35000,
          createdAt: "2023-02-01T09:00:00Z"
        },
        {
          id: 102,
          name: "Ford Transit - Expedición",
          vehicleType: "Ford Transit",
          status: "completed",
          price: 28000,
          createdAt: "2023-06-15T11:00:00Z"
        },
        {
          id: 103,
          name: "Volkswagen Crafter - Premium",
          vehicleType: "Volkswagen Crafter",
          status: "in-progress",
          price: 22000,
          createdAt: "2024-07-20T16:00:00Z"
        }
      ],
      communicationLog: [
        {
          id: 1,
          type: "email",
          subject: "Consulta sobre nuevo proyecto",
          summary: "Interesado en una nueva conversión para la temporada de verano 2024",
          date: "2024-08-10T14:30:00Z"
        },
        {
          id: 2,
          type: "phone",
          subject: "Seguimiento proyecto Crafter",
          summary: "Revisión del progreso y ajustes en el diseño interior",
          date: "2024-08-05T10:15:00Z"
        }
      ]
    },
    {
      id: 2,
      name: "María González",
      company: "",
      email: "maria.gonzalez@email.com",
      phone: "+34 655 987 654",
      alternativePhone: "",
      address: "Avenida Diagonal 456, 08008",
      location: "Barcelona",
      clientType: "individual",
      status: "active",
      totalProjects: 1,
      completedProjects: 1,
      totalValue: 32000,
      createdAt: "2023-03-20T15:30:00Z",
      lastActivity: "2024-08-08T09:45:00Z",
      notes: "Cliente particular muy detallista. Busca soluciones personalizadas para viajes familiares.",
      projectHistory: [
        {
          id: 201,
          name: "Volkswagen California - Familiar",
          vehicleType: "Volkswagen California",
          status: "completed",
          price: 32000,
          createdAt: "2023-04-01T12:00:00Z"
        }
      ],
      communicationLog: [
        {
          id: 3,
          type: "email",
          subject: "Agradecimiento por el servicio",
          summary: "Muy satisfecha con el resultado final del proyecto",
          date: "2024-08-08T09:45:00Z"
        }
      ]
    },
    {
      id: 3,
      name: "Antonio Martín",
      company: "Concesionario Martín",
      email: "antonio@concesionariomartin.es",
      phone: "+34 677 456 789",
      alternativePhone: "+34 963 123 456",
      address: "Carretera Nacional 340, Km 15",
      location: "Valencia",
      clientType: "dealer",
      status: "active",
      totalProjects: 5,
      completedProjects: 4,
      totalValue: 125000,
      createdAt: "2022-11-10T08:00:00Z",
      lastActivity: "2024-08-12T16:20:00Z",
      notes: `Concesionario oficial con gran volumen de pedidos.\nRequiere entregas rápidas y calidad consistente.`,
      projectHistory: [
        {
          id: 301,
          name: "Fiat Ducato - Estándar",
          vehicleType: "Fiat Ducato",
          status: "completed",
          price: 25000,
          createdAt: "2022-12-01T10:00:00Z"
        },
        {
          id: 302,
          name: "Mercedes Sprinter - Comercial",
          vehicleType: "Mercedes Sprinter",
          status: "completed",
          price: 30000,
          createdAt: "2023-03-15T14:00:00Z"
        },
        {
          id: 303,
          name: "Ford Transit - Básico",
          vehicleType: "Ford Transit",
          status: "completed",
          price: 22000,
          createdAt: "2023-08-10T11:30:00Z"
        },
        {
          id: 304,
          name: "Volkswagen Crafter - Deluxe",
          vehicleType: "Volkswagen Crafter",
          status: "completed",
          price: 28000,
          createdAt: "2024-01-20T09:15:00Z"
        },
        {
          id: 305,
          name: "Peugeot Boxer - Personalizado",
          vehicleType: "Peugeot Boxer",
          status: "in-progress",
          price: 20000,
          createdAt: "2024-07-30T13:45:00Z"
        }
      ],
      communicationLog: [
        {
          id: 4,
          type: "phone",
          subject: "Pedido urgente para cliente",
          summary: "Solicita conversión express para entrega en 3 semanas",
          date: "2024-08-12T16:20:00Z"
        },
        {
          id: 5,
          type: "email",
          subject: "Condiciones comerciales 2024",
          summary: "Negociación de descuentos por volumen para el próximo año",
          date: "2024-08-01T11:00:00Z"
        }
      ]
    },
    {
      id: 4,
      name: "Laura Fernández",
      company: "Viajes Fernández",
      email: "laura@viajesfernandez.com",
      phone: "+34 644 321 987",
      alternativePhone: "",
      address: "Plaza España 78, 41001",
      location: "Sevilla",
      clientType: "business",
      status: "pending",
      totalProjects: 1,
      completedProjects: 0,
      totalValue: 18000,
      createdAt: "2024-07-25T12:30:00Z",
      lastActivity: "2024-08-14T10:15:00Z",
      notes: "Nueva cliente interesada en conversiones económicas para alquiler turístico.",
      projectHistory: [
        {
          id: 401,
          name: "Citroën Jumper - Económico",
          vehicleType: "Citroën Jumper",
          status: "pending",
          price: 18000,
          createdAt: "2024-08-01T15:00:00Z"
        }
      ],
      communicationLog: [
        {
          id: 6,
          type: "email",
          subject: "Presupuesto inicial",
          summary: "Envío de presupuesto para conversión básica",
          date: "2024-08-14T10:15:00Z"
        }
      ]
    },
    {
      id: 5,
      name: "Roberto Sánchez",
      company: "",
      email: "roberto.sanchez@gmail.com",
      phone: "+34 688 555 444",
      alternativePhone: "+34 944 666 777",
      address: "Gran Vía 234, 48001",
      location: "Bilbao",
      clientType: "individual",
      status: "inactive",
      totalProjects: 2,
      completedProjects: 2,
      totalValue: 45000,
      createdAt: "2022-08-15T14:00:00Z",
      lastActivity: "2023-12-20T16:30:00Z",
      notes: "Cliente satisfecho pero sin proyectos recientes. Mantener contacto para futuras oportunidades.",
      projectHistory: [
        {
          id: 501,
          name: "Mercedes Vito - Compacto",
          vehicleType: "Mercedes Vito",
          status: "completed",
          price: 20000,
          createdAt: "2022-09-01T10:00:00Z"
        },
        {
          id: 502,
          name: "Ford Transit - Familiar",
          vehicleType: "Ford Transit",
          status: "completed",
          price: 25000,
          createdAt: "2023-05-15T12:00:00Z"
        }
      ],
      communicationLog: [
        {
          id: 7,
          type: "email",
          subject: "Felicitaciones navideñas",
          summary: "Email de temporada y consulta sobre posibles proyectos futuros",
          date: "2023-12-20T16:30:00Z"
        }
      ]
    }
  ];

  useEffect(() => {
    setClients(mockClients);
    setFilteredClients(mockClients);
  }, []);

  useEffect(() => {
    let filtered = clients;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered?.filter(client =>
        client?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        client?.company?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        client?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    // Apply filters
    if (filters?.clientType !== 'all') {
      filtered = filtered?.filter(client => client?.clientType === filters?.clientType);
    }

    if (filters?.location !== 'all') {
      filtered = filtered?.filter(client => client?.location?.toLowerCase() === filters?.location);
    }

    if (filters?.status !== 'all') {
      filtered = filtered?.filter(client => client?.status === filters?.status);
    }

    if (filters?.activity !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (filters?.activity) {
        case 'last-week':
          filterDate?.setDate(now?.getDate() - 7);
          break;
        case 'last-month':
          filterDate?.setMonth(now?.getMonth() - 1);
          break;
        case 'last-quarter':
          filterDate?.setMonth(now?.getMonth() - 3);
          break;
        case 'last-year':
          filterDate?.setFullYear(now?.getFullYear() - 1);
          break;
        default:
          break;
      }
      
      if (filters?.activity !== 'all') {
        filtered = filtered?.filter(client => 
          new Date(client.lastActivity) >= filterDate
        );
      }
    }

    setFilteredClients(filtered);
  }, [clients, searchTerm, filters]);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleFilterChange = (filterKey, value) => {
    setFilters(prev => ({ ...prev, [filterKey]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      clientType: 'all',
      location: 'all',
      status: 'all',
      activity: 'all'
    });
    setSearchTerm('');
  };

  const handleClientSelect = (client) => {
    setSelectedClient(client);
  };

  const handleEditClient = (client) => {
    // TODO: Implement edit client functionality
    console.log('Edit client:', client);
  };

  const handleArchiveClient = (client) => {
    // TODO: Implement archive client functionality
    console.log('Archive client:', client);
  };

  const handleCreateProject = (client) => {
    navigate('/new-project', { state: { selectedClient: client } });
  };

  const handleAddClient = (newClient) => {
    setClients(prev => [...prev, newClient]);
  };

  const handleBulkAction = (action) => {
    // TODO: Implement bulk actions
    console.log('Bulk action:', action);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <Breadcrumb />
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Gestión de Clientes</h1>
                <p className="text-muted-foreground mt-2">
                  Administra tu base de datos de clientes y su historial de proyectos
                </p>
              </div>
              
              <Button
                variant="default"
                iconName="UserPlus"
                iconPosition="left"
                onClick={() => setIsAddModalOpen(true)}
              >
                Añadir Cliente
              </Button>
            </div>
          </div>

          {/* Filters */}
          <ClientFilters
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            onBulkAction={handleBulkAction}
          />

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Client List */}
            <div className="xl:col-span-7">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">
                  Lista de Clientes ({filteredClients?.length})
                </h2>
              </div>
              
              <ClientTable
                clients={filteredClients}
                onClientSelect={handleClientSelect}
                selectedClient={selectedClient}
                onEditClient={handleEditClient}
                onArchiveClient={handleArchiveClient}
              />
            </div>

            {/* Client Details */}
            <div className="xl:col-span-5">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-foreground">Detalles del Cliente</h2>
              </div>
              
              <ClientDetails
                client={selectedClient}
                onEditClient={handleEditClient}
                onCreateProject={handleCreateProject}
              />
            </div>
          </div>
        </div>
      </main>
      {/* Add Client Modal */}
      <AddClientModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddClient}
      />
    </div>
  );
};

export default ClientManagement;