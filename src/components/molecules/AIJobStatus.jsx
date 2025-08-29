import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import ProgressRing from "./ProgressRing";
import { cn } from "@/utils/cn";

const AIJobStatus = ({ 
  job, 
  className,
  variant = "card" 
}) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case "pending":
        return {
          icon: "Clock",
          color: "warning",
          text: "Pending",
          description: "Job is queued for processing"
        };
      case "processing":
        return {
          icon: "Loader2",
          color: "info",
          text: "Processing",
          description: "AI is generating content"
        };
      case "completed":
        return {
          icon: "CheckCircle",
          color: "success",
          text: "Completed",
          description: "Content generated successfully"
        };
      case "failed":
        return {
          icon: "XCircle",
          color: "error",
          text: "Failed",
          description: "An error occurred during processing"
        };
      default:
        return {
          icon: "HelpCircle",
          color: "default",
          text: "Unknown",
          description: "Status unknown"
        };
    }
  };

  const config = getStatusConfig(job.status);

  if (variant === "inline") {
    return (
      <div className={cn("flex items-center space-x-2", className)}>
        <div className="flex items-center">
          {job.status === "processing" ? (
            <ApperIcon 
              name={config.icon} 
              size={16} 
              className={cn(
                "animate-spin",
                config.color === "info" && "text-info"
              )} 
            />
          ) : (
            <ApperIcon 
              name={config.icon} 
              size={16} 
              className={cn(
                config.color === "success" && "text-success",
                config.color === "error" && "text-error",
                config.color === "warning" && "text-warning",
                config.color === "info" && "text-info"
              )} 
            />
          )}
        </div>
        <Badge variant={config.color} size="sm">
          {config.text}
        </Badge>
        {job.status === "processing" && job.progress && (
          <span className="text-sm text-gray-400">
            {Math.round(job.progress)}%
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={cn("glass-card p-4", className)}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center",
            config.color === "success" && "bg-success/20",
            config.color === "error" && "bg-error/20",
            config.color === "warning" && "bg-warning/20",
            config.color === "info" && "bg-info/20",
            config.color === "default" && "bg-white/10"
          )}>
            <ApperIcon 
              name={config.icon} 
              size={20} 
              className={cn(
                job.status === "processing" && "animate-spin",
                config.color === "success" && "text-success",
                config.color === "error" && "text-error",
                config.color === "warning" && "text-warning",
                config.color === "info" && "text-info",
                config.color === "default" && "text-gray-400"
              )} 
            />
          </div>
          <div>
            <h4 className="font-medium text-white">{job.type || "AI Job"}</h4>
            <p className="text-sm text-gray-400">{config.description}</p>
          </div>
        </div>
        <Badge variant={config.color}>
          {config.text}
        </Badge>
      </div>
      
      {job.status === "processing" && job.progress !== undefined && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-300">Progress</span>
            <span className="text-sm font-medium text-white">
              {Math.round(job.progress)}%
            </span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 ease-out relative"
              style={{ width: `${job.progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-progress-bar"></div>
            </div>
          </div>
        </div>
      )}
      
      {job.error && (
        <div className="mt-4 p-3 bg-error/10 border border-error/20 rounded-lg">
          <p className="text-sm text-error">{job.error}</p>
        </div>
      )}
      
      {job.result && job.status === "completed" && (
        <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg">
          <p className="text-sm text-success">
            Content generated successfully
          </p>
        </div>
      )}
    </div>
  );
};

export default AIJobStatus;