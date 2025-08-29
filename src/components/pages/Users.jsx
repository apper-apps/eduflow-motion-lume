import React, { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import Select from "@/components/atoms/Select";
import UserTable from "@/components/organisms/UserTable";
import StatCard from "@/components/molecules/StatCard";
import { toast } from "react-toastify";

const Users = ({ userRole = "admin" }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    role: "",
    institutionId: "",
    status: "active"
  });

  const handleInviteUser = () => {
    toast.info("User invitation functionality would be implemented");
  };

  const handleBulkAction = () => {
    toast.info("Bulk user actions would be implemented");
  };

  const handleExportUsers = () => {
    toast.info("User export functionality would be implemented");
  };

  const roleOptions = [
    { value: "", label: "All Roles" },
    { value: "admin", label: "Admin" },
    { value: "manager", label: "Manager" },
    { value: "user", label: "Student" }
  ];

  const statusOptions = [
    { value: "", label: "All Statuses" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending" }
  ];

  const institutionOptions = [
    { value: "", label: "All Institutions" },
    { value: "stanford", label: "Stanford University" },
    { value: "mit", label: "MIT" },
    { value: "harvard", label: "Harvard University" }
  ];

  const userStats = [
    {
      title: "Total Users",
      value: 2547,
      change: 12,
      changeType: "positive",
      icon: "Users"
    },
    {
      title: "Active Students",
      value: 2156,
      change: 8,
      changeType: "positive",
      icon: "GraduationCap"
    },
    {
      title: "Instructors",
      value: 342,
      change: 15,
      changeType: "positive",
      icon: "UserCheck"
    },
    {
      title: "New This Month",
      value: 189,
      change: 23,
      changeType: "positive",
      icon: "UserPlus"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">
            {userRole === "admin" ? "User Management" : "Team Management"}
          </h1>
          <p className="text-gray-400">
            {userRole === "admin" 
              ? "Manage users, roles, and permissions across your platform" 
              : "View and manage your team members and their progress"
            }
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            onClick={handleBulkAction}
            variant="secondary"
            size="sm"
            icon="Settings"
          >
            Bulk Actions
          </Button>
          <Button
            onClick={handleExportUsers}
            variant="secondary"
            size="sm"
            icon="Download"
          >
            Export
          </Button>
          <Button
            onClick={handleInviteUser}
            variant="primary"
            icon="UserPlus"
          >
            Invite Users
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {userStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex-1 max-w-md">
          <SearchBar
            onSearch={setSearchTerm}
            placeholder="Search users by name or email..."
            className="w-full"
          />
        </div>
        
        <div className="flex items-center space-x-3">
          <Select
            value={filters.role}
            onChange={(e) => setFilters({ ...filters, role: e.target.value })}
            options={roleOptions}
            className="w-36"
          />
          
          <Select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            options={statusOptions}
            className="w-36"
          />
          
          {userRole === "admin" && (
            <Select
              value={filters.institutionId}
              onChange={(e) => setFilters({ ...filters, institutionId: e.target.value })}
              options={institutionOptions}
              className="w-48"
            />
          )}
        </div>
      </div>

      {/* User Table */}
      <UserTable 
        searchTerm={searchTerm}
        filters={filters}
      />
    </div>
  );
};

export default Users;