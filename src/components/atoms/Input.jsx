import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  label,
  error,
  helperText,
  className,
  type = "text",
  ...props 
}, ref) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-200 mb-2">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={cn(
          "input-field w-full",
          error && "border-error focus:border-error focus:ring-error/20",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-error mt-1">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-gray-400 mt-1">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;