import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Header = ({ onToggleSidebar, userRole = "user" }) => {
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
      case "/dashboard":
        return "Dashboard";
      case "/courses":
        return "Courses";
      case "/assignments":
        return "Assignments";
      case "/analytics":
        return "Analytics";
      case "/users":
        return "Users";
      case "/settings":
        return "Settings";
      default:
        return "EduFlow Pro";
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="lg:hidden"
          >
            <ApperIcon name="Menu" size={20} />
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-white">{getPageTitle()}</h1>
            <div className="flex items-center space-x-1 text-sm text-gray-400">
              <ApperIcon name="Home" size={14} />
              <span>/</span>
              <span>{getPageTitle()}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* AI Job Status Indicator */}
          <div className="hidden sm:flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-400">AI Ready</span>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <ApperIcon name="Bell" size={20} />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-white">3</span>
            </div>
          </Button>

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                <ApperIcon name="User" size={16} className="text-white" />
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-sm font-medium text-white">John Doe</div>
                <div className="text-xs text-gray-400 capitalize">{userRole}</div>
              </div>
              <ApperIcon name="ChevronDown" size={16} className="text-gray-400" />
            </Button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 glass-card border border-white/20 rounded-lg shadow-elevated z-50">
                <div className="p-2">
                  <div className="px-3 py-2 text-sm text-gray-300 border-b border-white/10">
                    <div className="font-medium text-white">John Doe</div>
                    <div className="text-xs text-gray-400">john.doe@eduflow.com</div>
                  </div>
                  <button className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-white/10 rounded-md transition-colors duration-200 flex items-center space-x-2">
                    <ApperIcon name="User" size={16} />
                    <span>Profile</span>
                  </button>
                  <button className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-white/10 rounded-md transition-colors duration-200 flex items-center space-x-2">
                    <ApperIcon name="Settings" size={16} />
                    <span>Settings</span>
                  </button>
                  <button className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-white/10 rounded-md transition-colors duration-200 flex items-center space-x-2">
                    <ApperIcon name="HelpCircle" size={16} />
                    <span>Help</span>
                  </button>
                  <div className="border-t border-white/10 mt-1 pt-1">
                    <button className="w-full px-3 py-2 text-left text-sm text-error hover:bg-error/10 rounded-md transition-colors duration-200 flex items-center space-x-2">
                      <ApperIcon name="LogOut" size={16} />
                      <span>Sign out</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;