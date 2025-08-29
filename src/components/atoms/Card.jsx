import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Card = forwardRef(({ 
  children, 
  className, 
  variant = "default",
  interactive = false,
  ...props 
}, ref) => {
  const baseClasses = "glass-card";
  
  const variants = {
    default: "",
    elevated: "shadow-elevated",
    bordered: "border-2 border-white/20",
    gradient: "bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30"
  };

  return (
    <div
      ref={ref}
      className={cn(
        baseClasses,
        variants[variant],
        interactive && "hover:scale-[1.01] hover:shadow-elevated transition-all duration-200 cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;