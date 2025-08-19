import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';

import MaterialsTable from './components/MaterialsTable';
import MaterialDetails from './components/MaterialDetails';
import MaterialFilters from './components/MaterialFilters';
import AddMaterialModal from './components/AddMaterialModal';

const MaterialsManagement = () => {
  const [materials, setMaterials] = useState([]);
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    supplier: 'all',
    stockLevel: 'all'
  });

  // Mock data for materials
  const mockMaterials = [
    {
      id: 1,
      name: 'Madera Contrachapada 15mm',
      category: 'Wood',
      supplier: 'Maderas García S.L.',
      supplierContact: '+34 912 345 678',
      currentStock: 25,
      minimumThreshold: 10,
      unitCost: 45.50,
      lastUpdated: '2025-08-14T10:30:00Z',
      specifications: 'Contrachapado de abedul, 15mm grosor, 2.5x1.25m',
      reorderPoint: 10,
      location: 'Almacén A - Estante 3',
      usageRate: 8 // per month
    },
    {
      id: 2,
      name: 'Panel Solar 100W Monocristalino',
      category: 'Solar',
      supplier: 'Solar Tech España',
      supplierContact: '+34 965 123 456',
      currentStock: 2,
      minimumThreshold: 5,
      unitCost: 125.00,
      lastUpdated: '2025-08-15T14:20:00Z',
      specifications: '100W, 12V, dimensiones: 1200x540x35mm',
      reorderPoint: 5,
      location: 'Almacén B - Estante 1',
      usageRate: 3
    },
    {
      id: 3,
      name: 'Conversor 12V a 220V 1500W',
      category: 'Electrical',
      supplier: 'ElectroSuministros Madrid',
      supplierContact: '+34 917 654 321',
      currentStock: 8,
      minimumThreshold: 3,
      unitCost: 185.75,
      lastUpdated: '2025-08-13T09:15:00Z',
      specifications: 'Inversor de onda sinusoidal pura, eficiencia >90%',
      reorderPoint: 3,
      location: 'Almacén A - Estante 5',
      usageRate: 4
    },
    {
      id: 4,
      name: 'Cuadro Eléctrico Autocaravana',
      category: 'Electrical',
      supplier: 'ElectroSuministros Madrid',
      supplierContact: '+34 917 654 321',
      currentStock: 1,
      minimumThreshold: 3,
      unitCost: 245.00,
      lastUpdated: '2025-08-12T16:45:00Z',
      specifications: 'Cuadro con fusibles, relés y protecciones IP65',
      reorderPoint: 3,
      location: 'Almacén A - Estante 6',
      usageRate: 2
    },
    {
      id: 5,
      name: 'Baño Portátil Thetford C200',
      category: 'Plumbing',
      supplier: 'Accesorios Camper S.L.',
      supplierContact: '+34 933 456 789',
      currentStock: 12,
      minimumThreshold: 4,
      unitCost: 325.50,
      lastUpdated: '2025-08-14T11:00:00Z',
      specifications: 'Inodoro portátil con cisterna 21L y depósito 21L',
      reorderPoint: 4,
      location: 'Almacén C - Área 2',
      usageRate: 5
    },
    {
      id: 6,
      name: 'Aislante Térmico Reflexivo',
      category: 'Hardware',
      supplier: 'Materiales Construcción López',
      supplierContact: '+34 954 321 987',
      currentStock: 15,
      minimumThreshold: 8,
      unitCost: 12.75,
      lastUpdated: '2025-08-15T08:30:00Z',
      specifications: 'Rollo 10m x 1.5m, espesor 10mm, con adhesivo',
      reorderPoint: 8,
      location: 'Almacén A - Estante 1',
      usageRate: 12
    },
    {
      id: 7,
      name: 'Tablero OSB 18mm',
      category: 'Wood',
      supplier: 'Maderas García S.L.',
      supplierContact: '+34 912 345 678',
      currentStock: 0,
      minimumThreshold: 6,
      unitCost: 32.25,
      lastUpdated: '2025-08-10T14:15:00Z',
      specifications: 'Tablero OSB/3, resistente a humedad, 2.5x1.25m',
      reorderPoint: 6,
      location: 'Almacén A - Estante 2',
      usageRate: 6
    },
    {
      id: 8,
      name: 'Batería AGM 100Ah',
      category: 'Electrical',
      supplier: 'Baterías Industriales S.A.',
      supplierContact: '+34 976 543 210',
      currentStock: 6,
      minimumThreshold: 4,
      unitCost: 198.00,
      lastUpdated: '2025-08-14T13:22:00Z',
      specifications: 'Batería AGM 12V 100Ah, ciclo profundo',
      reorderPoint: 4,
      location: 'Almacén B - Área 1',
      usageRate: 3
    }
  ];

  useEffect(() => {
    setMaterials(mockMaterials);
    setFilteredMaterials(mockMaterials);
  }, []);

  useEffect(() => {
    let filtered = materials;

    // Apply search filter
    if (searchTerm?.trim()) {
      filtered = filtered?.filter(material =>
        material?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        material?.category?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        material?.supplier?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    // Apply filters
    if (filters?.category !== 'all') {
      filtered = filtered?.filter(material => material?.category?.toLowerCase() === filters?.category);
    }

    if (filters?.supplier !== 'all') {
      filtered = filtered?.filter(material => 
        material?.supplier?.toLowerCase() === filters?.supplier?.toLowerCase()
      );
    }

    if (filters?.stockLevel !== 'all') {
      switch (filters?.stockLevel) {
        case 'low':
          filtered = filtered?.filter(material => material?.currentStock < material?.minimumThreshold);
          break;
        case 'medium':
          filtered = filtered?.filter(material => 
            material?.currentStock >= material?.minimumThreshold && 
            material?.currentStock <= material?.minimumThreshold * 2
          );
          break;
        case 'high':
          filtered = filtered?.filter(material => material?.currentStock > material?.minimumThreshold * 2);
          break;
        case 'out':
          filtered = filtered?.filter(material => material?.currentStock === 0);
          break;
      }
    }

    setFilteredMaterials(filtered);
  }, [materials, searchTerm, filters]);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleFilterChange = (filterKey, value) => {
    setFilters(prev => ({ ...prev, [filterKey]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      category: 'all',
      supplier: 'all',
      stockLevel: 'all'
    });
    setSearchTerm('');
  };

  const handleMaterialSelect = (material) => {
    setSelectedMaterial(material);
  };

  const handleEditMaterial = (material) => {
    console.log('Edit material:', material);
  };

  const handleAdjustStock = (material, adjustment) => {
    setMaterials(prev => 
      prev?.map(m => 
        m?.id === material?.id 
          ? { ...m, currentStock: Math.max(0, m?.currentStock + adjustment) }
          : m
      )
    );
  };

  const handleAddMaterial = (newMaterial) => {
    const material = {
      ...newMaterial,
      id: Math.max(...materials?.map(m => m?.id)) + 1,
      lastUpdated: new Date()?.toISOString()
    };
    setMaterials(prev => [...prev, material]);
  };

  const handleBulkImport = () => {
    console.log('Bulk import materials');
  };

  const handleGenerateReport = () => {
    console.log('Generate inventory report');
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
                <h1 className="text-3xl font-bold text-foreground">Gestión de Materiales</h1>
                <p className="text-muted-foreground mt-2">
                  Controla tu inventario de materiales para conversiones de campers
                </p>
              </div>
              
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  iconName="Upload"
                  iconPosition="left"
                  onClick={handleBulkImport}
                >
                  Importar
                </Button>
                <Button
                  variant="outline"
                  iconName="FileText"
                  iconPosition="left"
                  onClick={handleGenerateReport}
                >
                  Reporte
                </Button>
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={() => setIsAddModalOpen(true)}
                >
                  Añadir Material
                </Button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <MaterialFilters
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            materials={materials}
          />

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Materials Table */}
            <div className="xl:col-span-8">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">
                  Inventario de Materiales ({filteredMaterials?.length})
                </h2>
              </div>
              
              <MaterialsTable
                materials={filteredMaterials}
                onMaterialSelect={handleMaterialSelect}
                selectedMaterial={selectedMaterial}
                onEditMaterial={handleEditMaterial}
                onAdjustStock={handleAdjustStock}
              />
            </div>

            {/* Material Details */}
            <div className="xl:col-span-4">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-foreground">Detalles del Material</h2>
              </div>
              
              <MaterialDetails
                material={selectedMaterial}
                onEditMaterial={handleEditMaterial}
                onAdjustStock={handleAdjustStock}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Add Material Modal */}
      <AddMaterialModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddMaterial}
      />
    </div>
  );
};

export default MaterialsManagement;