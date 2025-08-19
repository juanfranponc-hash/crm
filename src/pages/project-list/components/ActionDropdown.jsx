import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActionDropdown = ({ project, onView, onEdit, onDuplicate, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAction = (action) => {
    setIsOpen(false);
    action();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        iconName="MoreHorizontal"
        className="h-8 w-8 p-0"
      />

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-md shadow-dropdown z-50 animate-slide-down">
          <div className="py-1">
            <button
              onClick={() => handleAction(onView)}
              className="w-full px-3 py-2 text-left text-sm text-popover-foreground hover:bg-muted transition-colors flex items-center space-x-2"
            >
              <Icon name="Eye" size={16} />
              <span>Ver detalles</span>
            </button>
            
            <button
              onClick={() => handleAction(onEdit)}
              className="w-full px-3 py-2 text-left text-sm text-popover-foreground hover:bg-muted transition-colors flex items-center space-x-2"
            >
              <Icon name="Edit" size={16} />
              <span>Editar proyecto</span>
            </button>
            
            <button
              onClick={() => handleAction(onDuplicate)}
              className="w-full px-3 py-2 text-left text-sm text-popover-foreground hover:bg-muted transition-colors flex items-center space-x-2"
            >
              <Icon name="Copy" size={16} />
              <span>Duplicar proyecto</span>
            </button>
            
            <div className="border-t border-border my-1"></div>
            
            <button
              onClick={() => handleAction(onDelete)}
              className="w-full px-3 py-2 text-left text-sm text-error hover:bg-red-50 transition-colors flex items-center space-x-2"
            >
              <Icon name="Trash2" size={16} />
              <span>Eliminar proyecto</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionDropdown;