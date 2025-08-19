import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ProgressIndicator from './components/ProgressIndicator';
import ClientInfoStep from './components/ClientInfoStep';
import VehicleSelectionStep from './components/VehicleSelectionStep';
import ConversionTypeStep from './components/ConversionTypeStep';
import SummaryStep from './components/SummaryStep';
import ProjectSummaryPanel from './components/ProjectSummaryPanel';
import Icon from '../../components/AppIcon';

const NewProject = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [formData, setFormData] = useState({
    // Client Info
    clientId: '',
    clientType: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientCompany: '',
    clientAddress: '',
    clientNotes: '',
    
    // Vehicle Info
    vehicleType: '',
    vehicleName: '',
    vehicleSpecs: null,
    vehiclePrice: '',
    
    // Conversion Info
    conversionType: '',
    conversionName: '',
    conversionPrice: '',
    conversionDuration: '',
    customFeatures: [''],
    
    // Project Info
    projectPrice: '',
    projectNotes: '',
    createdAt: new Date()?.toISOString()
  });

  const totalSteps = 4;

  useEffect(() => {
    // Load saved draft from localStorage
    const savedDraft = localStorage.getItem('newProjectDraft');
    if (savedDraft) {
      try {
        const parsedData = JSON.parse(savedDraft);
        setFormData(parsedData);
        setHasUnsavedChanges(true);
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }

    // Warn user about unsaved changes when leaving
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e?.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const updateFormData = (updates) => {
    setFormData(prev => {
      const newData = { ...prev, ...updates };
      // Auto-save to localStorage
      localStorage.setItem('newProjectDraft', JSON.stringify(newData));
      setHasUnsavedChanges(true);
      return newData;
    });
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveProject = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Clear draft from localStorage
      localStorage.removeItem('newProjectDraft');
      setHasUnsavedChanges(false);
      
      // Navigate to project details or project list
      navigate('/project-list', { 
        state: { 
          message: 'Proyecto creado exitosamente',
          type: 'success'
        }
      });
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ClientInfoStep
            formData={formData}
            onUpdate={updateFormData}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <VehicleSelectionStep
            formData={formData}
            onUpdate={updateFormData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <ConversionTypeStep
            formData={formData}
            onUpdate={updateFormData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 4:
        return (
          <SummaryStep
            formData={formData}
            onUpdate={updateFormData}
            onSave={handleSaveProject}
            onPrevious={handlePrevious}
          />
        );
      default:
        return null;
    }
  };

  const breadcrumbItems = [
    { label: 'Proyectos', path: '/project-list', icon: 'FolderOpen' },
    { label: 'Nuevo Proyecto', path: '/new-project', icon: 'Plus', current: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb customItems={breadcrumbItems} />
          
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Plus" size={16} color="white" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Nuevo Proyecto de Camperización</h1>
            </div>
            <p className="text-muted-foreground">
              Cree un nuevo proyecto siguiendo los pasos del asistente
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div className="xl:col-span-3 space-y-6">
              <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
              {renderCurrentStep()}
            </div>

            <div className="xl:col-span-1">
              <div className="sticky top-24">
                <ProjectSummaryPanel formData={formData} currentStep={currentStep} />
                
                {hasUnsavedChanges && (
                  <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Icon name="AlertTriangle" size={16} className="text-warning" />
                      <div>
                        <div className="text-sm font-medium text-warning">Cambios sin guardar</div>
                        <div className="text-xs text-muted-foreground">
                          Sus cambios se guardan automáticamente como borrador
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewProject;