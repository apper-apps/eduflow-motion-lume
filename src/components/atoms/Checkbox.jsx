import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = forwardRef(({ 
  label,
  description,
  error,
  className,
  checked,
  ...props 
}, ref) => {
  return (
    <div className="space-y-1">
      <div className="flex items-start space-x-3">
        <div className="relative flex items-center">
          <input
            ref={ref}
            type="checkbox"
            checked={checked}
            className="sr-only"
            {...props}
          />
          <div 
            className={cn(
              "w-5 h-5 rounded border-2 transition-all duration-200 cursor-pointer flex items-center justify-center",
              checked 
                ? "bg-primary border-primary shadow-glow" 
                : "border-white/30 hover:border-white/50",
              error && "border-error",
              className
            )}
          >
            {checked && (
              <ApperIcon name="Check" size={12} className="text-white" />
            )}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          {label && (
            <label className="block text-sm font-medium text-white cursor-pointer">
              {label}
            </label>
          )}
          {description && (
            <p className="text-sm text-gray-400 mt-1">{description}</p>
          )}
        </div>
      </div>
      {error && (
        <p className="text-sm text-error ml-8">{error}</p>
      )}
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;