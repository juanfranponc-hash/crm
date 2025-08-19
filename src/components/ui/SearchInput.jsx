import React, { useState, useEffect, useRef } from 'react';
import Icon from '../AppIcon';

const SearchInput = ({ 
  placeholder = "Search...", 
  onSearch, 
  onClear,
  debounceMs = 300,
  showResults = false,
  results = [],
  onResultClick,
  className = "",
  size = "default"
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isResultsOpen, setIsResultsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const resultsRef = useRef(null);

  const sizeClasses = {
    sm: 'h-8 text-sm',
    default: 'h-10 text-sm',
    lg: 'h-12 text-base'
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm?.trim()) {
        setIsLoading(true);
        onSearch?.(searchTerm);
        setTimeout(() => setIsLoading(false), 200);
      } else {
        onClear?.();
      }
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, debounceMs, onSearch, onClear]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef?.current && 
        !searchRef?.current?.contains(event?.target) &&
        resultsRef?.current &&
        !resultsRef?.current?.contains(event?.target)
      ) {
        setIsResultsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setSearchTerm(value);
    
    if (showResults && value?.trim()) {
      setIsResultsOpen(true);
    } else {
      setIsResultsOpen(false);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setIsResultsOpen(false);
    onClear?.();
  };

  const handleResultClick = (result) => {
    setSearchTerm(result?.label || result?.name || '');
    setIsResultsOpen(false);
    onResultClick?.(result);
  };

  const handleKeyDown = (e) => {
    if (e?.key === 'Escape') {
      setIsResultsOpen(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative" ref={searchRef}>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {isLoading ? (
            <Icon name="Loader2" size={16} className="animate-spin text-muted-foreground" />
          ) : (
            <Icon name="Search" size={16} className="text-muted-foreground" />
          )}
        </div>
        
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => showResults && searchTerm?.trim() && setIsResultsOpen(true)}
          placeholder={placeholder}
          className={`search-input pl-10 pr-10 ${sizeClasses?.[size]}`}
        />
        
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-foreground transition-colors duration-150 ease-in-out"
          >
            <Icon name="X" size={16} className="text-muted-foreground" />
          </button>
        )}
      </div>
      {/* Search Results Dropdown */}
      {showResults && isResultsOpen && results?.length > 0 && (
        <div 
          ref={resultsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-dropdown z-50 max-h-60 overflow-y-auto animate-slide-down"
        >
          {results?.map((result, index) => (
            <button
              key={result?.id || index}
              onClick={() => handleResultClick(result)}
              className="w-full px-3 py-2 text-left hover:bg-muted transition-colors duration-150 ease-in-out flex items-center space-x-2 border-b border-border last:border-b-0"
            >
              {result?.icon && <Icon name={result?.icon} size={16} className="text-muted-foreground" />}
              <div className="flex-1">
                <div className="text-sm font-medium text-popover-foreground">
                  {result?.label || result?.name}
                </div>
                {result?.description && (
                  <div className="text-xs text-muted-foreground">
                    {result?.description}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
      {/* No Results Message */}
      {showResults && isResultsOpen && searchTerm?.trim() && results?.length === 0 && !isLoading && (
        <div 
          ref={resultsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-dropdown z-50 animate-slide-down"
        >
          <div className="px-3 py-4 text-center text-sm text-muted-foreground">
            No results found for "{searchTerm}"
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInput;