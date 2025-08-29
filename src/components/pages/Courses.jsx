import React, { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import Select from "@/components/atoms/Select";
import CourseGrid from "@/components/organisms/CourseGrid";
import { toast } from "react-toastify";

const Courses = ({ userRole = "user" }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [filters, setFilters] = useState({
    status: "",
    instructorId: "",
    sortBy: "title"
  });

  const handleCreateCourse = () => {
    toast.info("Create course functionality would be implemented");
  };

  const handleImportCourse = () => {
    toast.info("Import course functionality would be implemented");
  };

  const handleGenerateWithAI = () => {
    toast.info("AI course generation would be implemented");
  };

  const statusOptions = [
    { value: "", label: "All Statuses" },
    { value: "active", label: "Active" },
    { value: "draft", label: "Draft" },
    { value: "archived", label: "Archived" }
  ];

  const sortOptions = [
    { value: "title", label: "Title" },
    { value: "created", label: "Date Created" },
    { value: "enrollments", label: "Enrollments" },
    { value: "updated", label: "Last Updated" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">
            {userRole === "user" ? "My Courses" : "Course Management"}
          </h1>
          <p className="text-gray-400">
            {userRole === "user" 
              ? "Explore and enroll in courses to expand your knowledge" 
              : "Create, manage, and monitor your educational content"
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
              onClick={handleImportCourse}
              variant="secondary"
              size="sm"
              icon="Upload"
            >
              Import
            </Button>
            <Button
              onClick={handleCreateCourse}
              variant="primary"
              icon="Plus"
            >
              Create Course
            </Button>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex-1 max-w-md">
          <SearchBar
            onSearch={setSearchTerm}
            placeholder="Search courses..."
            className="w-full"
          />
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Filters */}
          <div className="flex items-center space-x-3">
            <Select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              options={statusOptions}
              className="w-40"
            />
            
            <Select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
              options={sortOptions}
              className="w-40"
            />
          </div>

          {/* View Toggle */}
          <div className="flex items-center bg-surface/60 backdrop-blur-sm border border-white/20 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded transition-all duration-200 ${
                viewMode === "grid"
                  ? "bg-primary text-white shadow-glow"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <ApperIcon name="Grid3X3" size={16} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded transition-all duration-200 ${
                viewMode === "list"
                  ? "bg-primary text-white shadow-glow"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <ApperIcon name="List" size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <CourseGrid 
        searchTerm={searchTerm}
        filters={filters}
        userRole={userRole}
      />
    </div>
  );
};

export default Courses;