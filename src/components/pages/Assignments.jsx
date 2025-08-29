import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
import AssignmentList from "@/components/organisms/AssignmentList";

const Assignments = ({ userRole = "user" }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
const [filters, setFilters] = useState({
    courseId: "",
    type: "",
    status: "",
    sortBy: "dueDate"
  });

  const handleCreateAssignment = () => {
    navigate('/assignments/create');
  };

  const handleBulkGrade = () => {
    toast.info("Bulk grading functionality would be implemented");
  };

  const handleGenerateWithAI = () => {
    toast.info("AI assignment generation would be implemented");
  };

  const typeOptions = [
    { value: "", label: "All Types" },
    { value: "essay", label: "Essay" },
    { value: "quiz", label: "Quiz" },
    { value: "project", label: "Project" },
    { value: "discussion", label: "Discussion" }
  ];

  const statusOptions = [
    { value: "", label: "All Statuses" },
    { value: "active", label: "Active" },
    { value: "draft", label: "Draft" },
    { value: "closed", label: "Closed" }
  ];

  const sortOptions = [
    { value: "dueDate", label: "Due Date" },
    { value: "created", label: "Date Created" },
    { value: "title", label: "Title" },
    { value: "submissions", label: "Submissions" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">
            {userRole === "user" ? "My Assignments" : "Assignment Management"}
          </h1>
          <p className="text-gray-400">
            {userRole === "user" 
              ? "View and submit your assignments on time" 
              : "Create, manage, and grade student assignments"
            }
          </p>
        </div>
        
        {userRole !== "user" && (
          <div className="flex items-center space-x-3">
            <Button
              onClick={handleGenerateWithAI}
              variant="secondary"
              size="sm"
              icon="Sparkles"
            >
              AI Generate
            </Button>
            <Button
              onClick={handleBulkGrade}
              variant="secondary"
              size="sm"
              icon="GraduationCap"
            >
              Bulk Grade
            </Button>
<Button
              onClick={handleCreateAssignment}
              variant="primary"
              icon="Plus"
            >
              Create Assignment
            </Button>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex-1 max-w-md">
          <SearchBar
            onSearch={setSearchTerm}
            placeholder="Search assignments..."
            className="w-full"
          />
        </div>
        
        <div className="flex items-center space-x-3">
          <Select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            options={typeOptions}
            className="w-36"
          />
          
          {userRole !== "user" && (
            <Select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              options={statusOptions}
              className="w-36"
            />
          )}
          
          <Select
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
            options={sortOptions}
            className="w-36"
          />
        </div>
      </div>

      {/* Assignment Statistics */}
      {userRole !== "user" && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="glass-card p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <ApperIcon name="ClipboardList" size={20} className="text-primary" />
              </div>
              <div>
                <div className="text-lg font-semibold text-white">24</div>
                <div className="text-sm text-gray-400">Active</div>
              </div>
            </div>
          </div>
          <div className="glass-card p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center">
                <ApperIcon name="Clock" size={20} className="text-warning" />
              </div>
              <div>
                <div className="text-lg font-semibold text-white">156</div>
                <div className="text-sm text-gray-400">Pending</div>
              </div>
            </div>
          </div>
          <div className="glass-card p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
                <ApperIcon name="CheckCircle" size={20} className="text-success" />
              </div>
              <div>
                <div className="text-lg font-semibold text-white">89</div>
                <div className="text-sm text-gray-400">Graded</div>
              </div>
            </div>
          </div>
          <div className="glass-card p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-error/20 rounded-lg flex items-center justify-center">
                <ApperIcon name="AlertTriangle" size={20} className="text-error" />
              </div>
              <div>
                <div className="text-lg font-semibold text-white">12</div>
                <div className="text-sm text-gray-400">Overdue</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assignments List */}
      <AssignmentList 
        searchTerm={searchTerm}
        filters={filters}
        userRole={userRole}
      />
    </div>
  );
};

export default Assignments;