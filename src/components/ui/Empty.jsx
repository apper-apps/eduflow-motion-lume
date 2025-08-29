import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  title, 
  description, 
  action, 
  onAction, 
  icon = "FileX",
  variant = "default" 
}) => {
  const getEmptyConfig = () => {
    switch (variant) {
      case "courses":
        return {
          title: "No courses found",
          description: "Get started by creating your first course or browse our course catalog.",
          action: "Create Course",
          icon: "BookOpen"
        };
      case "assignments":
        return {
          title: "No assignments yet",
          description: "Create assignments to engage your students and track their progress.",
          action: "Create Assignment",
          icon: "ClipboardList"
        };
      case "users":
        return {
          title: "No users found",
          description: "Invite users to join your educational platform and start collaborating.",
          action: "Invite Users",
          icon: "Users"
        };
      case "search":
        return {
          title: "No results found",
          description: "Try adjusting your search criteria or browse all available content.",
          action: "Clear Filters",
          icon: "Search"
        };
      default:
        return {
          title: title || "No data available",
          description: description || "There's nothing to show here yet.",
          action: action || "Get Started",
          icon: icon
        };
    }
  };

  const config = getEmptyConfig();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name={config.icon} size={40} className="text-primary/60" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{config.title}</h3>
      <p className="text-gray-400 mb-8 max-w-md">{config.description}</p>
      {onAction && (
        <Button onClick={onAction} variant="primary">
          <ApperIcon name="Plus" size={16} className="mr-2" />
          {config.action}
        </Button>
      )}
    </div>
  );
};

export default Empty;