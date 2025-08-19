import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';

import FilterBar from './components/FilterBar';
import ProjectTable from './components/ProjectTable';
import ProjectCard from './components/ProjectCard';
import BulkActions from './components/BulkActions';
import Pagination from './components/Pagination';

const ProjectList = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'cards'
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [sortConfig, setSortConfig] = useState({ column: 'createdAt', direction: 'desc' });
  const [filters, setFilters] = useState({});
  const [filteredProjects, setFilteredProjects] = useState([]);

  // Mock data for projects
  const mockProjects = [
    {
      id: 'PRJ-2024-001',
      clientName: 'María García',
      clientEmail: 'maria.garcia@email.com',
      vehicleModel: 'Fiat Ducato L2H2',
      vehicleYear: '2023',
      conversionType: 'standard',
      status: 'en-progreso',
      price: 45000,
      createdAt: '2024-08-10T10:30:00Z',
      updatedAt: '2024-08-15T14:20:00Z'
    },
    {
      id: 'PRJ-2024-002',
      clientName: 'Carlos Rodríguez',
      clientEmail: 'carlos.rodriguez@email.com',
      vehicleModel: 'Mercedes Sprinter 314',
      vehicleYear: '2022',
      conversionType: 'personalizada',
      status: 'presupuesto',
      price: 62000,
      createdAt: '2024-08-12T09:15:00Z',
      updatedAt: '2024-08-12T09:15:00Z'
    },
    {
      id: 'PRJ-2024-003',
      clientName: 'Ana Martínez',
      clientEmail: 'ana.martinez@email.com',
      vehicleModel: 'Volkswagen Crafter',
      vehicleYear: '2023',
      conversionType: 'standard',
      status: 'completado',
      price: 38000,
      createdAt: '2024-07-28T16:45:00Z',
      updatedAt: '2024-08-14T11:30:00Z'
    },
    {
      id: 'PRJ-2024-004',
      clientName: 'David López',
      clientEmail: 'david.lopez@email.com',
      vehicleModel: 'Ford Transit Custom',
      vehicleYear: '2024',
      conversionType: 'personalizada',
      status: 'confirmado',
      price: 55000,
      createdAt: '2024-08-05T13:20:00Z',
      updatedAt: '2024-08-08T10:15:00Z'
    },
    {
      id: 'PRJ-2024-005',
      clientName: 'Laura Sánchez',
      clientEmail: 'laura.sanchez@email.com',
      vehicleModel: 'Iveco Daily 35S14',
      vehicleYear: '2023',
      conversionType: 'standard',
      status: 'cancelado',
      price: 42000,
      createdAt: '2024-07-15T08:30:00Z',
      updatedAt: '2024-07-20T15:45:00Z'
    },
    {
      id: 'PRJ-2024-006',
      clientName: 'Miguel Torres',
      clientEmail: 'miguel.torres@email.com',
      vehicleModel: 'Fiat Ducato L3H2',
      vehicleYear: '2024',
      conversionType: 'personalizada',
      status: 'en-progreso',
      price: 68000,
      createdAt: '2024-08-01T12:00:00Z',
      updatedAt: '2024-08-16T09:30:00Z'
    },
    {
      id: 'PRJ-2024-007',
      clientName: 'Carmen Ruiz',
      clientEmail: 'carmen.ruiz@email.com',
      vehicleModel: 'Mercedes Sprinter 316',
      vehicleYear: '2023',
      conversionType: 'standard',
      status: 'presupuesto',
      price: 41000,
      createdAt: '2024-08-14T14:15:00Z',
      updatedAt: '2024-08-14T14:15:00Z'
    },
    {
      id: 'PRJ-2024-008',
      clientName: 'Roberto Jiménez',
      clientEmail: 'roberto.jimenez@email.com',
      vehicleModel: 'Volkswagen Crafter L4H3',
      vehicleYear: '2022',
      conversionType: 'personalizada',
      status: 'completado',
      price: 59000,
      createdAt: '2024-07-10T11:45:00Z',
      updatedAt: '2024-08-12T16:20:00Z'
    }
  ];

  // Filter and sort projects
  useEffect(() => {
    let filtered = [...mockProjects];

    // Apply filters
    if (filters?.client) {
      filtered = filtered?.filter(project => 
        project?.clientName?.toLowerCase()?.includes(filters?.client?.toLowerCase())
      );
    }

    if (filters?.vehicleType) {
      filtered = filtered?.filter(project => 
        project?.vehicleModel?.toLowerCase()?.includes(filters?.vehicleType?.toLowerCase())
      );
    }

    if (filters?.conversionType) {
      filtered = filtered?.filter(project => project?.conversionType === filters?.conversionType);
    }

    if (filters?.status) {
      filtered = filtered?.filter(project => project?.status === filters?.status);
    }

    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter(project =>
        project?.id?.toLowerCase()?.includes(searchTerm) ||
        project?.clientName?.toLowerCase()?.includes(searchTerm) ||
        project?.clientEmail?.toLowerCase()?.includes(searchTerm) ||
        project?.vehicleModel?.toLowerCase()?.includes(searchTerm)
      );
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      let aValue = a?.[sortConfig?.column];
      let bValue = b?.[sortConfig?.column];

      if (sortConfig?.column === 'price') {
        aValue = Number(aValue);
        bValue = Number(bValue);
      } else if (sortConfig?.column === 'createdAt' || sortConfig?.column === 'updatedAt') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else {
        aValue = String(aValue)?.toLowerCase();
        bValue = String(bValue)?.toLowerCase();
      }

      if (aValue < bValue) {
        return sortConfig?.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig?.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setFilteredProjects(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredProjects?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProjects = filteredProjects?.slice(startIndex, startIndex + itemsPerPage);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  const handleSort = (newSortConfig) => {
    setSortConfig(newSortConfig);
  };

  const handleSelectProject = (projectId, isSelected) => {
    if (isSelected) {
      setSelectedProjects([...selectedProjects, projectId]);
    } else {
      setSelectedProjects(selectedProjects?.filter(id => id !== projectId));
    }
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedProjects(paginatedProjects?.map(project => project?.id));
    } else {
      setSelectedProjects([]);
    }
  };

  const handleBulkAction = (action, data) => {
    console.log('Bulk action:', action, 'Data:', data, 'Selected:', selectedProjects);
    // Implement bulk actions here
    setSelectedProjects([]);
  };

  const handleClearSelection = () => {
    setSelectedProjects([]);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedProjects([]); // Clear selection when changing pages
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    setSelectedProjects([]);
  };

  const handleNewProject = () => {
    navigate('/new-project');
  };

  const handleViewProject = (projectId) => {
    navigate(`/project-details?id=${projectId}`);
  };

  const handleEditProject = (projectId) => {
    navigate(`/new-project?edit=${projectId}`);
  };

  const handleDuplicateProject = (projectId) => {
    console.log('Duplicating project:', projectId);
    // Implement duplication logic
  };

  const handleDeleteProject = (projectId) => {
    console.log('Deleting project:', projectId);
    // Implement deletion logic
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <Breadcrumb />

          {/* Page Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Lista de Proyectos</h1>
              <p className="text-muted-foreground">
                Gestiona todos los proyectos de conversión de campers
              </p>
            </div>

            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              {/* View Mode Toggle */}
              <div className="flex items-center bg-muted rounded-lg p-1">
                <Button
                  variant={viewMode === 'table' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('table')}
                  iconName="Table"
                  className="h-8 px-3"
                />
                <Button
                  variant={viewMode === 'cards' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('cards')}
                  iconName="Grid3X3"
                  className="h-8 px-3"
                />
              </div>

              <Button
                variant="default"
                onClick={handleNewProject}
                iconName="Plus"
                iconPosition="left"
              >
                Nuevo Proyecto
              </Button>
            </div>
          </div>

          {/* Filter Bar */}
          <FilterBar
            onFiltersChange={handleFiltersChange}
            activeFilters={filters}
            onClearFilters={handleClearFilters}
          />

          {/* Bulk Actions */}
          <BulkActions
            selectedCount={selectedProjects?.length}
            onBulkAction={handleBulkAction}
            onClearSelection={handleClearSelection}
          />

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-muted-foreground">
              {filteredProjects?.length === mockProjects?.length ? (
                `${filteredProjects?.length} proyectos en total`
              ) : (
                `${filteredProjects?.length} de ${mockProjects?.length} proyectos`
              )}
            </div>
          </div>

          {/* Content */}
          {viewMode === 'table' ? (
            <ProjectTable
              projects={paginatedProjects}
              onSort={handleSort}
              sortConfig={sortConfig}
              onSelectProject={handleSelectProject}
              selectedProjects={selectedProjects}
              onSelectAll={handleSelectAll}
              onBulkAction={handleBulkAction}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedProjects?.map((project) => (
                <ProjectCard
                  key={project?.id}
                  project={project}
                  isSelected={selectedProjects?.includes(project?.id)}
                  onSelect={handleSelectProject}
                  onView={() => handleViewProject(project?.id)}
                  onEdit={() => handleEditProject(project?.id)}
                  onDuplicate={() => handleDuplicateProject(project?.id)}
                  onDelete={() => handleDeleteProject(project?.id)}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {filteredProjects?.length > 0 && (
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredProjects?.length}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
              />
            </div>
          )}

          {/* Floating Action Button for Mobile */}
          <div className="fixed bottom-6 right-6 sm:hidden">
            <Button
              variant="default"
              size="lg"
              onClick={handleNewProject}
              iconName="Plus"
              className="rounded-full w-14 h-14 shadow-lg"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectList;