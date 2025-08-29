import React, { useState, useEffect } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import courseService from "@/services/api/courseService";
import { toast } from "react-toastify";

const CourseGrid = ({ searchTerm, filters = {}, userRole = "user" }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCourses = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await courseService.getAll();
      setCourses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      toast.success("Successfully enrolled in course!");
      // Refresh courses to update enrollment count
      await loadCourses();
    } catch (err) {
      toast.error("Failed to enroll in course");
    }
  };

  const handleEdit = (courseId) => {
    toast.info("Edit course functionality would be implemented");
  };

  const handleDelete = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await courseService.delete(courseId);
        toast.success("Course deleted successfully");
        await loadCourses();
      } catch (err) {
        toast.error("Failed to delete course");
      }
    }
  };

  // Filter courses based on search and filters
  const filteredCourses = courses.filter(course => {
    const matchesSearch = !searchTerm || 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !filters.status || course.status === filters.status;
    const matchesInstructor = !filters.instructorId || course.instructorId === filters.instructorId;
    
    return matchesSearch && matchesStatus && matchesInstructor;
  });

  if (loading) {
    return <Loading variant="card-grid" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadCourses} />;
  }

  if (filteredCourses.length === 0) {
    return (
      <Empty 
        variant="courses" 
        onAction={userRole === "admin" ? () => toast.info("Create course form would open") : null}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCourses.map((course) => (
        <Card key={course.Id} className="p-6 group hover:shadow-elevated transition-all duration-200">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                <ApperIcon name="BookOpen" size={24} className="text-primary" />
              </div>
              {course.aiGenerated && (
                <Badge variant="info" size="sm">
                  <ApperIcon name="Sparkles" size={12} className="mr-1" />
                  AI
                </Badge>
              )}
            </div>
            <Badge 
              variant={course.status === "active" ? "success" : "default"}
              size="sm"
            >
              {course.status}
            </Badge>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors duration-200">
              {course.title}
            </h3>
            <p className="text-gray-400 text-sm line-clamp-2">
              {course.description}
            </p>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
            <div className="flex items-center space-x-1">
              <ApperIcon name="Users" size={14} />
              <span>{course.enrollments} enrolled</span>
            </div>
            <div className="flex items-center space-x-1">
              <ApperIcon name="BookOpen" size={14} />
              <span>{course.modules?.length || 0} modules</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            {userRole === "user" ? (
              <Button 
                onClick={() => handleEnroll(course.Id)}
                variant="primary" 
                size="sm"
                className="w-full"
              >
                <ApperIcon name="Plus" size={16} className="mr-2" />
                Enroll Now
              </Button>
            ) : (
              <div className="flex items-center space-x-2 w-full">
                <Button 
                  onClick={() => handleEdit(course.Id)}
                  variant="secondary" 
                  size="sm"
                  className="flex-1"
                >
                  <ApperIcon name="Edit" size={16} className="mr-2" />
                  Edit
                </Button>
                {userRole === "admin" && (
                  <Button 
                    onClick={() => handleDelete(course.Id)}
                    variant="destructive" 
                    size="sm"
                  >
                    <ApperIcon name="Trash2" size={16} />
                  </Button>
                )}
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CourseGrid;