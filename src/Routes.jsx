import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import NewProject from './pages/new-project';
import Dashboard from './pages/dashboard';
import ClientManagement from './pages/client-management';
import MaterialsManagement from './pages/materials-management';
import ProjectDetails from './pages/project-details';
import ProjectList from './pages/project-list';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ClientManagement />} />
        <Route path="/new-project" element={<NewProject />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/client-management" element={<ClientManagement />} />
        <Route path="/materials-management" element={<MaterialsManagement />} />
        <Route path="/project-details" element={<ProjectDetails />} />
        <Route path="/project-list" element={<ProjectList />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;