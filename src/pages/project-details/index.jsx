import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import ProjectOverview from './components/ProjectOverview';
import VehicleSpecs from './components/VehicleSpecs';
import CustomizationTab from './components/CustomizationTab';
import PricingTab from './components/PricingTab';
import ActionBar from './components/ActionBar';

const ProjectDetails = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const projectId = searchParams?.get('id') || '1';
  
  const [activeTab, setActiveTab] = useState('overview');
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock project data
  const mockProject = {
    id: projectId,
    name: "Conversión Mercedes Sprinter - Familia García",
    conversionType: "Personalizada",
    status: "En Progreso",
    priority: "Alta",
    progress: 65,
    startDate: "15/07/2024",
    estimatedEndDate: "20/09/2024",
    client: {
      name: "Carlos García Martínez",
      company: "García Aventuras S.L.",
      email: "carlos.garcia@garciaaventuras.es",
      phone: "+34 612 345 678",
      location: "Madrid, España",
      joinDate: "Marzo 2023"
    },
    vehicle: {
      make: "Mercedes-Benz",
      model: "Sprinter 319 CDI",
      year: "2022",
      fuelType: "Diésel",
      transmission: "Manual",
      mileage: "45.000 km",
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=400&fit=crop",
      description: "Furgoneta Mercedes Sprinter en excelente estado, ideal para conversión a camper de lujo con todas las comodidades.",
      dimensions: {
        length: "5.932 mm",
        width: "2.020 mm",
        height: "2.426 mm",
        wheelbase: "3.665 mm",
        interiorHeight: "1.940 mm",
        cargoArea: "10,5 m³"
      },
      technical: {
        engine: "2.1L CDI Turbo",
        power: "190 CV",
        grossWeight: "3.500 kg",
        payloadCapacity: "1.045 kg",
        fuelCapacity: "75 litros",
        fuelConsumption: "8,5 L/100km"
      },
      modificationOptions: [
        { name: "Techo elevable", description: "Compatible con instalación", available: true },
        { name: "Ventanas laterales", description: "Preparado para corte", available: true },
        { name: "Puerta trasera", description: "Doble hoja estándar", available: true },
        { name: "Refuerzo de suelo", description: "Necesario para peso adicional", available: true },
        { name: "Aislamiento térmico", description: "Paredes y techo", available: true },
        { name: "Sistema eléctrico", description: "12V/220V preparado", available: false }
      ],
      condition: {
        exterior: [
          { component: "Carrocería", status: "Excelente" },
          { component: "Pintura", status: "Bueno" },
          { component: "Neumáticos", status: "Excelente" },
          { component: "Cristales", status: "Excelente" }
        ],
        interior: [
          { component: "Asientos", status: "Bueno" },
          { component: "Tablero", status: "Excelente" },
          { component: "Suelo", status: "Bueno" },
          { component: "Techo", status: "Excelente" }
        ]
      }
    },
    customization: {
      customFeatures: [
        {
          id: 1,
          title: "Sistema de iluminación LED personalizado",
          description: `Instalación completa de sistema de iluminación LED de bajo consumo en todo el interior del vehículo.\n\nIncluye:\n- Tiras LED regulables en techo con control remoto\n- Focos LED direccionales para zona de lectura\n- Iluminación ambiental en muebles\n- Sistema de control inteligente con diferentes modos\n- Batería auxiliar de 200Ah para autonomía extendida`,
          createdAt: "12/08/2024"
        },
        {
          id: 2,
          title: "Cocina modular con electrodomésticos integrados",
          description: `Diseño y construcción de cocina compacta pero funcional con acabados de alta calidad.\n\nCaracterísticas:\n- Encimera de cuarzo resistente al calor\n- Fregadero de acero inoxidable con grifo extensible\n- Placa de inducción de 2 fuegos\n- Frigorífico compresor de 65L\n- Almacenamiento optimizado con cajones soft-close\n- Campana extractora silenciosa`,
          createdAt: "10/08/2024"
        }
      ],
      standardFeatures: [
        { id: 1, name: "Aislamiento térmico completo", description: "Paredes, suelo y techo", price: 1200, installationTime: "2 días", selected: true },
        { id: 2, name: "Suelo laminado resistente", description: "Acabado roble natural", price: 800, installationTime: "1 día", selected: true },
        { id: 3, name: "Ventanas laterales", description: "2 ventanas con mosquiteras", price: 1500, installationTime: "1 día", selected: false },
        { id: 4, name: "Claraboya con ventilador", description: "Ventilación automática", price: 600, installationTime: "0.5 días", selected: true },
        { id: 5, name: "Sistema eléctrico básico", description: "12V con convertidor 220V", price: 2000, installationTime: "2 días", selected: true },
        { id: 6, name: "Depósito de agua limpia", description: "100L con bomba", price: 900, installationTime: "1 día", selected: false }
      ],
      packages: [
        {
          name: "Paquete Básico",
          price: 15000,
          description: "Conversión esencial para aventuras de fin de semana",
          features: ["Aislamiento completo", "Suelo laminado", "Sistema eléctrico básico", "Cama plegable", "Almacenamiento básico"]
        },
        {
          name: "Paquete Confort",
          price: 25000,
          description: "Ideal para viajes largos con todas las comodidades",
          features: ["Todo del paquete básico", "Cocina completa", "Baño químico", "Calefacción estacionaria", "Agua corriente"]
        },
        {
          name: "Paquete Premium",
          price: 40000,
          description: "Máximo lujo y autonomía para vivir en la carretera",
          features: ["Todo del paquete confort", "Ducha interior", "Paneles solares", "Batería de litio", "Aire acondicionado", "TV y entretenimiento"]
        }
      ],
      notes: "El cliente solicita especial atención a la eficiencia energética y materiales sostenibles. Prefiere acabados en madera natural y colores neutros."
    },
    pricing: {
      items: [
        { id: 1, name: "Conversión base Mercedes Sprinter", price: 18000, quantity: 1, category: "Base" },
        { id: 2, name: "Sistema de iluminación LED personalizado", price: 2500, quantity: 1, category: "Personalizado" },
        { id: 3, name: "Cocina modular premium", price: 8500, quantity: 1, category: "Personalizado" },
        { id: 4, name: "Aislamiento térmico completo", price: 1200, quantity: 1, category: "Materiales" },
        { id: 5, name: "Mano de obra especializada", price: 5000, quantity: 1, category: "Mano de Obra" },
        { id: 6, name: "Certificación y homologación", price: 1500, quantity: 1, category: "Extras" }
      ],
      discount: 5,
      tax: 21
    },
    recentActivity: [
      {
        type: "update",
        description: "Se actualizó el diseño de la cocina según las preferencias del cliente",
        user: "Ana Rodríguez",
        timestamp: "Hace 2 horas"
      },
      {
        type: "comment",
        description: "Cliente aprobó el sistema de iluminación LED propuesto",
        user: "Carlos García",
        timestamp: "Hace 5 horas"
      },
      {
        type: "milestone",
        description: "Completada la instalación del aislamiento térmico",
        user: "Miguel Torres",
        timestamp: "Hace 1 día"
      },
      {
        type: "update",
        description: "Iniciada la fase de instalación eléctrica",
        user: "Luis Fernández",
        timestamp: "Hace 2 días"
      }
    ]
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setProject(mockProject);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [projectId]);

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: 'BarChart3' },
    { id: 'vehicle', label: 'Especificaciones', icon: 'Truck' },
    { id: 'customization', label: 'Personalización', icon: 'Settings' },
    { id: 'pricing', label: 'Precios', icon: 'Calculator' }
  ];

  const breadcrumbItems = [
    { label: 'Proyectos', path: '/project-list', icon: 'FolderOpen' },
    { label: project?.client?.name || 'Cargando...', path: '/project-details', icon: 'User', current: true }
  ];

  const handleSave = async () => {
    // Simulate save operation
    console.log('Saving project:', project);
    return new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleGenerateQuote = async () => {
    // Simulate quote generation
    console.log('Generating quote for project:', project);
    return new Promise(resolve => setTimeout(resolve, 1500));
  };

  const handleStatusChange = (newStatus) => {
    setProject(prev => ({ ...prev, status: newStatus }));
  };

  const handleUpdateCustomization = (updatedCustomization) => {
    setProject(prev => ({
      ...prev,
      customization: updatedCustomization
    }));
  };

  const handleUpdatePricing = (updatedPricing) => {
    setProject(prev => ({
      ...prev,
      pricing: updatedPricing
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16 pb-24">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
            <div className="flex items-center justify-center h-64">
              <div className="flex items-center space-x-3">
                <Icon name="Loader2" size={24} className="animate-spin text-primary" />
                <span className="text-lg text-muted-foreground">Cargando detalles del proyecto...</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16 pb-24">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
            <div className="text-center py-12">
              <Icon name="AlertCircle" size={48} className="text-error mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Proyecto no encontrado</h2>
              <p className="text-muted-foreground mb-6">
                El proyecto solicitado no existe o ha sido eliminado.
              </p>
              <button
                onClick={() => navigate('/project-list')}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Volver a Proyectos
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <ProjectOverview project={project} />;
      case 'vehicle':
        return <VehicleSpecs vehicle={project?.vehicle} />;
      case 'customization':
        return (
          <CustomizationTab 
            project={project} 
            onUpdateCustomization={handleUpdateCustomization}
          />
        );
      case 'pricing':
        return (
          <PricingTab 
            project={project} 
            onUpdatePricing={handleUpdatePricing}
          />
        );
      default:
        return <ProjectOverview project={project} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          <Breadcrumb customItems={breadcrumbItems} />
          
          {/* Project Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{project?.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="User" size={16} />
                  <span>{project?.client?.name}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Truck" size={16} />
                  <span>{project?.vehicle?.make} {project?.vehicle?.model}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={16} />
                  <span>Inicio: {project?.startDate}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Target" size={16} />
                  <span>Fin estimado: {project?.estimatedEndDate}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                project?.status === 'En Progreso' ? 'bg-warning text-warning-foreground' :
                project?.status === 'Completado' ? 'bg-success text-success-foreground' :
                'bg-muted text-muted-foreground'
              }`}>
                {project?.status}
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Progreso</div>
                <div className="text-lg font-bold text-primary">{project?.progress}%</div>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="border-b border-border mb-8">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="mb-8">
            {renderTabContent()}
          </div>
        </div>
      </main>
      {/* Action Bar */}
      <ActionBar
        project={project}
        onSave={handleSave}
        onGenerateQuote={handleGenerateQuote}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default ProjectDetails;