import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'BarChart3' },
    { label: 'Projects', path: '/project-list', icon: 'FolderOpen' },
    { label: 'New Project', path: '/new-project', icon: 'Plus' },
    { label: 'Clients', path: '/client-management', icon: 'Users' },
    { label: 'Materials', path: '/materials-management', icon: 'Package' },
  ];

  const userInfo = {
    name: 'John Smith',
    role: 'Project Manager',
    email: 'john.smith@campercrm.com',
    avatar: null
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef?.current && !userMenuRef?.current?.contains(event?.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    if (path === '/dashboard') {
      return location?.pathname === '/' || location?.pathname === '/dashboard';
    }
    return location?.pathname?.startsWith(path);
  };

  const Logo = () => (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <Icon name="Truck" size={20} color="white" />
      </div>
      <span className="text-xl font-bold text-primary">CamperCRM</span>
    </div>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`nav-item flex items-center space-x-2 ${
                isActivePath(item?.path) ? 'active' : ''
              }`}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
            </button>
          ))}
        </nav>

        {/* Right Side - User Menu & Mobile Toggle */}
        <div className="flex items-center space-x-4">
          {/* User Profile Dropdown */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted transition-colors duration-150 ease-in-out"
            >
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-sm font-medium text-foreground">{userInfo?.name}</div>
                <div className="text-xs text-muted-foreground">{userInfo?.role}</div>
              </div>
              <Icon 
                name="ChevronDown" 
                size={16} 
                className={`transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* User Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-md shadow-dropdown animate-slide-down">
                <div className="p-3 border-b border-border">
                  <div className="text-sm font-medium text-popover-foreground">{userInfo?.name}</div>
                  <div className="text-xs text-muted-foreground">{userInfo?.email}</div>
                </div>
                <div className="py-1">
                  <button className="dropdown-item w-full text-left flex items-center space-x-2">
                    <Icon name="User" size={16} />
                    <span>Profile</span>
                  </button>
                  <button className="dropdown-item w-full text-left flex items-center space-x-2">
                    <Icon name="Settings" size={16} />
                    <span>Settings</span>
                  </button>
                  <button className="dropdown-item w-full text-left flex items-center space-x-2">
                    <Icon name="HelpCircle" size={16} />
                    <span>Help</span>
                  </button>
                  <div className="border-t border-border my-1"></div>
                  <button className="dropdown-item w-full text-left flex items-center space-x-2 text-error">
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-muted transition-colors duration-150 ease-in-out"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border animate-slide-down">
          <nav className="px-4 py-2 space-y-1">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`w-full nav-item flex items-center space-x-3 ${
                  isActivePath(item?.path) ? 'active' : ''
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;