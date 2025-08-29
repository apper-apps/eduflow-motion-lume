import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import { cn } from "@/utils/cn";

const StatCard = ({ 
  title, 
  value, 
  change, 
  changeType = "neutral",
  icon,
  variant = "default",
  className 
}) => {
  const getChangeColor = () => {
    switch (changeType) {
      case "positive":
        return "text-success";
      case "negative":
        return "text-error";
      default:
        return "text-gray-400";
    }
  };

  const getChangeIcon = () => {
    switch (changeType) {
      case "positive":
        return "TrendingUp";
      case "negative":
        return "TrendingDown";
      default:
        return "Minus";
    }
  };

  return (
    <Card className={cn("p-6", className)} variant={variant}>
      <div className="flex items-center justify-between mb-4">
        {icon && (
          <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
            <ApperIcon name={icon} size={24} className="text-primary" />
          </div>
        )}
        {change !== undefined && (
          <div className={cn("flex items-center space-x-1", getChangeColor())}>
            <ApperIcon name={getChangeIcon()} size={16} />
            <span className="text-sm font-medium">{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-2xl font-bold gradient-text mb-2">
          {typeof value === "number" ? value.toLocaleString() : value}
        </h3>
        <p className="text-gray-400 text-sm font-medium">{title}</p>
      </div>
    </Card>
  );
};

export default StatCard;