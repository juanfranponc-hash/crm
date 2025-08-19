import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import SearchInput from '../../components/ui/SearchInput';
import SummaryCard from './components/SummaryCard';
import ProjectsTable from './components/ProjectsTable';
import QuickActions from './components/QuickActions';
import UpcomingDeadlines from './components/UpcomingDeadlines';
import LowStockMaterials from './components/LowStockMaterials';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [sortField, setSortField] = useState('dueDate');
  const [sortDirection, setSortDirection] = useState('asc');

  // Mock data for dashboard
  const summaryData = [
    {
      title: 'Total Proyectos',
      value: '24',
      icon: 'FolderOpen',
      trend: 'up',
      trendValue: '+12%',
      color: 'primary'
    },
    {
      title: 'Conversiones Activas',
      value: '8',
      icon: 'Truck',
      trend: 'up',
      trendValue: '+3',
      color: 'success'
    },
    {
      title: 'Ingresos Este Mes',
      value: '€45.200',
      icon: 'Euro',
      trend: 'up',
      trendValue: '+18%',
      color: 'accent'
    },
    {
      title: 'Presupuestos Pendientes',
      value: '6',
      icon: 'FileText',
      trend: 'neutral',
      trendValue: '0',
      color: 'warning'
    }
  ];

  // Mock materials data for low stock alert
  const lowStockMaterials = [
    {
      id: 2,
      name: 'Panel Solar 100W Monocristalino',
      category: 'Solar',
      currentStock: 2,
      minimumThreshold: 5,
      supplier: 'Solar Tech España'
    },
    {
      id: 4,
      name: 'Cuadro Eléctrico Autocaravana',
      category: 'Electrical',
      currentStock: 1,
      minimumThreshold: 3,
      supplier: 'ElectroSuministros Madrid'
    },
    {
      id: 7,
      name: 'Tablero OSB 18mm',
      category: 'Wood',
      currentStock: 0,
      minimumThreshold: 6,
      supplier: 'Maderas García S.L.'
    }
  ];

  const mockProjects = [
    {
      id: 1,
      client: 'Carlos Rodríguez',
      clientEmail: 'carlos@email.com',
      vehicle: 'Mercedes Sprinter',
      vehicleYear: '2020',
      type: 'Personalizada',
      status: 'En progreso',
      dueDate: '25/08/2025',
      price: 35000
    },
    {
      id: 2,
      client: 'Ana García',
      clientEmail: 'ana.garcia@email.com',
      vehicle: 'Ford Transit',
      vehicleYear: '2019',
      type: 'Estándar',
      status: 'Presupuesto',
      dueDate: '30/08/2025',
      price: 28000
    },
    {
      id: 3,
      client: 'Miguel López',
      clientEmail: 'miguel.lopez@email.com',
      vehicle: 'Volkswagen Crafter',
      vehicleYear: '2021',
      type: 'Personalizada',
      status: 'Completado',
      dueDate: '15/08/2025',
      price: 42000
    },
    {
      id: 4,
      client: 'Laura Martínez',
      clientEmail: 'laura.martinez@email.com',
      vehicle: 'Iveco Daily',
      vehicleYear: '2018',
      type: 'Estándar',
      status: 'En progreso',
      dueDate: '05/09/2025',
      price: 31000
    },
    {
      id: 5,
      client: 'David Sánchez',
      clientEmail: 'david.sanchez@email.com',
      vehicle: 'Renault Master',
      vehicleYear: '2020',
      type: 'Personalizada',
      status: 'Pendiente',
      dueDate: '10/09/2025',
      price: 38000
    },
    {
      id: 6,
      client: 'Elena Fernández',
      clientEmail: 'elena.fernandez@email.com',
      vehicle: 'Mercedes Sprinter',
      vehicleYear: '2022',
      type: 'Estándar',
      status: 'En progreso',
      dueDate: '20/09/2025',
      price: 33000
    }
  ];

  const upcomingDeadlines = [
    {
      id: 1,
      projectId: 1,
      projectName: 'Conversión Mercedes Sprinter',
      client: 'Carlos Rodríguez',
      dueDate: '25/08/2025',
      daysLeft: 9,
      priority: 'high'
    },
    {
      id: 2,
      projectId: 2,
      projectName: 'Presupuesto Ford Transit',
      client: 'Ana García',
      dueDate: '30/08/2025',
      daysLeft: 14,
      priority: 'medium'
    },
    {
      id: 3,
      projectId: 4,
      projectName: 'Conversión Iveco Daily',
      client: 'Laura Martínez',
      dueDate: '05/09/2025',
      daysLeft: 20,
      priority: 'medium'
    },
    {
      id: 4,
      projectId: 5,
      projectName: 'Conversión Renault Master',
      client: 'David Sánchez',
      dueDate: '10/09/2025',
      daysLeft: 25,
      priority: 'low'
    }
  ];

  useEffect(() => {
    let filtered = mockProjects;

    // Apply search filter
    if (searchTerm?.trim()) {
      filtered = filtered?.filter(project =>
        project?.client?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        project?.vehicle?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        project?.type?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        project?.status?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      let aValue = a?.[sortField];
      let bValue = b?.[sortField];

      // Handle date sorting
      if (sortField === 'dueDate') {
        aValue = new Date(aValue.split('/').reverse().join('-'));
        bValue = new Date(bValue.split('/').reverse().join('-'));
      }

      // Handle price sorting
      if (sortField === 'price') {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }

      // Handle string sorting
      if (typeof aValue === 'string') {
        aValue = aValue?.toLowerCase();
        bValue = bValue?.toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredProjects(filtered);
  }, [searchTerm, sortField, sortDirection]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Panel de Control</h1>
            <p className="text-muted-foreground mt-2">
              Gestiona tus proyectos de camperización y supervisa el rendimiento del negocio
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {summaryData?.map((data, index) => (
              <SummaryCard
                key={index}
                title={data?.title}
                value={data?.value}
                icon={data?.icon}
                trend={data?.trend}
                trendValue={data?.trendValue}
                color={data?.color}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Projects Table Section */}
            <div className="lg:col-span-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4 sm:mb-0">
                    Proyectos Recientes
                  </h2>
                  <div className="w-full sm:w-80">
                    <SearchInput
                      placeholder="Buscar proyectos..."
                      onSearch={handleSearch}
                      onClear={handleClearSearch}
                      size="default"
                    />
                  </div>
                </div>
                
                <ProjectsTable
                  projects={filteredProjects}
                  onSort={handleSort}
                  sortField={sortField}
                  sortDirection={sortDirection}
                />
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <QuickActions />
              <UpcomingDeadlines deadlines={upcomingDeadlines} />
              <LowStockMaterials materials={lowStockMaterials} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;