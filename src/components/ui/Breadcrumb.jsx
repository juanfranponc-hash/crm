import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ customItems = null }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeMap = {
    '/': { label: 'Dashboard', icon: 'BarChart3' },
    '/dashboard': { label: 'Dashboard', icon: 'BarChart3' },
    '/project-list': { label: 'Projects', icon: 'FolderOpen' },
    '/project-details': { label: 'Project Details', icon: 'FileText', parent: '/project-list' },
    '/new-project': { label: 'New Project', icon: 'Plus', parent: '/project-list' },
    '/client-management': { label: 'Clients', icon: 'Users' },
  };

  const generateBreadcrumbs = () => {
    if (customItems) {
      return customItems;
    }

    const currentPath = location?.pathname;
    const currentRoute = routeMap?.[currentPath];
    
    if (!currentRoute) {
      return [{ label: 'Dashboard', path: '/dashboard', icon: 'BarChart3' }];
    }

    const breadcrumbs = [];
    
    // Add parent if exists
    if (currentRoute?.parent) {
      const parentRoute = routeMap?.[currentRoute?.parent];
      if (parentRoute) {
        breadcrumbs?.push({
          label: parentRoute?.label,
          path: currentRoute?.parent,
          icon: parentRoute?.icon
        });
      }
    }
    
    // Add current route
    breadcrumbs?.push({
      label: currentRoute?.label,
      path: currentPath,
      icon: currentRoute?.icon,
      current: true
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs?.length <= 1 && location?.pathname === '/dashboard') {
    return null;
  }

  const handleNavigation = (path, isCurrent) => {
    if (!isCurrent && path) {
      navigate(path);
    }
  };

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6" aria-label="Breadcrumb">
      <div className="flex items-center space-x-2">
        {breadcrumbs?.map((item, index) => (
          <React.Fragment key={item?.path || index}>
            {index > 0 && (
              <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
            )}
            <button
              onClick={() => handleNavigation(item?.path, item?.current)}
              className={`breadcrumb-item flex items-center space-x-1 ${
                item?.current ? 'current' : 'hover:text-foreground cursor-pointer'
              }`}
              disabled={item?.current}
            >
              <Icon name={item?.icon} size={14} />
              <span>{item?.label}</span>
            </button>
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};

export default Breadcrumb;