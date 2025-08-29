import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Error = ({ message, onRetry, title = "Something went wrong" }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="w-16 h-16 bg-error/20 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name="AlertCircle" size={32} className="text-error" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 mb-6 max-w-md">
        {message || "We encountered an unexpected error. Please try again or contact support if the problem persists."}
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="primary" className="mb-4">
          <ApperIcon name="RefreshCw" size={16} className="mr-2" />
          Try Again
        </Button>
      )}
      <button 
        onClick={() => window.location.reload()} 
        className="text-primary hover:text-primary/80 text-sm transition-colors duration-200"
      >
        Refresh Page
      </button>
    </div>
  );
};

export default Error;