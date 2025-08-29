import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Button = forwardRef(({ 
  children, 
  variant = "primary", 
  size = "md", 
  disabled = false,
  loading = false,
  className,
  icon,
  iconPosition = "left",
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";
  
  const variants = {
    primary: "button-primary focus:ring-primary/20",
    secondary: "button-secondary focus:ring-white/20",
    destructive: "bg-error hover:bg-error/80 text-white shadow-lg hover:shadow-error/20 focus:ring-error/20",
    ghost: "hover:bg-white/10 text-gray-300 hover:text-white focus:ring-white/20",
    outline: "border border-white/20 hover:bg-white/5 text-white hover:border-white/40 focus:ring-white/20"
  };

  const sizes = {
    sm: "px-3 py-2 text-sm min-h-[32px]",
    md: "px-6 py-3 text-sm min-h-[44px]",
    lg: "px-8 py-4 text-base min-h-[48px]",
    xl: "px-10 py-5 text-lg min-h-[56px]"
  };

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        disabled && "hover:scale-100",
        !disabled && "hover:scale-[1.02] active:scale-[0.98]",
        className
      )}
      {...props}
    >
      {loading && (
        <ApperIcon name="Loader2" size={16} className="animate-spin mr-2" />
      )}
      {icon && iconPosition === "left" && !loading && (
        <ApperIcon name={icon} size={16} className="mr-2" />
      )}
      {children}
      {icon && iconPosition === "right" && !loading && (
        <ApperIcon name={icon} size={16} className="ml-2" />
      )}
    </button>
  );
});

Button.displayName = "Button";

export default Button;