import React, { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";
import { cn } from "@/utils/cn";

const SearchBar = ({ 
  onSearch, 
  placeholder = "Search...", 
  className,
  showFilters = false,
  filters = [],
  onFilterChange,
  debounceMs = 300 
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      onSearch?.(searchTerm);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch, debounceMs]);

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <ApperIcon name="Search" size={16} className="text-gray-400" />
        </div>
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="pl-10 pr-12"
        />
        {showFilters && (
          <button
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-white text-gray-400 transition-colors duration-200"
          >
            <ApperIcon name="SlidersHorizontal" size={16} />
          </button>
        )}
      </div>
      
      {showFilterDropdown && filters.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-card p-4 z-50">
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-white">Filters</h4>
            {filters.map((filter, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-300">{filter.label}</span>
                <button
                  onClick={() => onFilterChange?.(filter.key, !filter.active)}
                  className={cn(
                    "px-3 py-1 text-xs rounded-full transition-all duration-200",
                    filter.active 
                      ? "bg-primary text-white" 
                      : "bg-white/10 text-gray-400 hover:bg-white/20"
                  )}
                >
                  {filter.active ? "Active" : "Inactive"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;