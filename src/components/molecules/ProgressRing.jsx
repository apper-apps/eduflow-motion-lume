import React from "react";
import { cn } from "@/utils/cn";

const ProgressRing = ({ 
  progress = 0, 
  size = 80, 
  strokeWidth = 8,
  className,
  showLabel = true,
  color = "primary" 
}) => {
  const normalizedRadius = (size - strokeWidth) / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const colors = {
    primary: "#7C3AED",
    secondary: "#4F46E5",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444"
  };

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        height={size}
        width={size}
        className="transform -rotate-90"
      >
        <circle
          stroke="rgba(255, 255, 255, 0.1)"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke={colors[color]}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={size / 2}
          cy={size / 2}
          className="transition-all duration-500 ease-out drop-shadow-sm"
          style={{
            filter: `drop-shadow(0 0 6px ${colors[color]}40)`
          }}
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-semibold text-white">
            {Math.round(progress)}%
          </span>
        </div>
      )}
    </div>
  );
};

export default ProgressRing;