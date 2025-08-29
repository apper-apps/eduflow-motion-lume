import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Sidebar = ({ isOpen, onClose, userRole = "user" }) => {
  const location = useLocation();

  const getNavigationItems = () => {
const baseItems = [
      { name: "Dashboard", icon: "LayoutDashboard", path: "/dashboard" },
      { name: "Courses", icon: "BookOpen", path: "/courses" },
      { name: "Assignments", icon: "ClipboardList", path: "/assignments" },
      { name: "Calendar", icon: "Calendar", path: "/calendar" }
    ];

    const roleSpecificItems = {
      admin: [
        { name: "Analytics", icon: "BarChart3", path: "/analytics" },
        { name: "Users", icon: "Users", path: "/users" },
        { name: "Settings", icon: "Settings", path: "/settings" }
      ],
      manager: [
        { name: "Analytics", icon: "BarChart3", path: "/analytics" },
        { name: "Team", icon: "Users", path: "/users" }
      ],
      user: []
    };

    return [...baseItems, ...(roleSpecificItems[userRole] || [])];
  };

  const navigationItems = getNavigationItems();

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:bg-surface/60 lg:backdrop-blur-md lg:border-r lg:border-white/10">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center px-6 py-4 border-b border-white/10">
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center mr-3">
            <ApperIcon name="GraduationCap" size={20} className="text-white" />
          </div>
          <h1 className="text-xl font-bold gradient-text">EduFlow Pro</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-primary/20 text-primary border border-primary/30 shadow-glow"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                )
              }
            >
              <ApperIcon name={item.icon} size={20} className="mr-3" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* AI Status */}
        <div className="px-6 py-4 border-t border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <div>
              <p className="text-sm font-medium text-white">AI Services</p>
              <p className="text-xs text-gray-400">Online & Ready</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Mobile Sidebar
  const MobileSidebar = () => (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-surface/95 backdrop-blur-md border-r border-white/10 transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center mr-3">
                <ApperIcon name="GraduationCap" size={20} className="text-white" />
              </div>
              <h1 className="text-xl font-bold gradient-text">EduFlow Pro</h1>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
            >
              <ApperIcon name="X" size={20} className="text-gray-400" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-primary/20 text-primary border border-primary/30 shadow-glow"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  )
                }
              >
                <ApperIcon name={item.icon} size={20} className="mr-3" />
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* AI Status */}
          <div className="px-6 py-4 border-t border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <div>
                <p className="text-sm font-medium text-white">AI Services</p>
                <p className="text-xs text-gray-400">Online & Ready</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};

export default Sidebar;