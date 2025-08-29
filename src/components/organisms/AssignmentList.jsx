import React, { useState, useEffect } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import assignmentService from "@/services/api/assignmentService";
import { toast } from "react-toastify";
import { format, isAfter } from "date-fns";

const AssignmentList = ({ searchTerm, filters = {}, userRole = "user" }) => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAssignments = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await assignmentService.getAll();
      setAssignments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssignments();
  }, []);

  const handleSubmit = (assignmentId) => {
    toast.info("Assignment submission functionality would be implemented");
  };

  const handleGrade = (assignmentId) => {
    toast.info("Grading interface would be implemented");
  };

  const handleEdit = (assignmentId) => {
    toast.info("Edit assignment functionality would be implemented");
  };

  const handleDelete = async (assignmentId) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      try {
        await assignmentService.delete(assignmentId);
        toast.success("Assignment deleted successfully");
        await loadAssignments();
      } catch (err) {
        toast.error("Failed to delete assignment");
      }
    }
  };

  // Filter assignments
  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = !searchTerm || 
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCourse = !filters.courseId || assignment.courseId === filters.courseId;
    const matchesType = !filters.type || assignment.type === filters.type;
    
    return matchesSearch && matchesCourse && matchesType;
  });

  const getAssignmentStatus = (assignment) => {
    const now = new Date();
    const dueDate = new Date(assignment.dueDate);
    const isOverdue = isAfter(now, dueDate);
    
    if (userRole === "user") {
      const userSubmission = assignment.submissions?.find(sub => sub.userId === "current-user");
      if (userSubmission) {
        return { status: "submitted", color: "success", text: "Submitted" };
      }
      if (isOverdue) {
        return { status: "overdue", color: "error", text: "Overdue" };
      }
      return { status: "pending", color: "warning", text: "Pending" };
    } else {
      const submissionCount = assignment.submissions?.length || 0;
      return { 
        status: "active", 
        color: "info", 
        text: `${submissionCount} submissions` 
      };
    }
  };

  if (loading) {
    return <Loading variant="card-grid" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadAssignments} />;
  }

  if (filteredAssignments.length === 0) {
    return (
      <Empty 
        variant="assignments" 
        onAction={userRole !== "user" ? () => toast.info("Create assignment form would open") : null}
      />
    );
  }

  return (
    <div className="space-y-4">
      {filteredAssignments.map((assignment) => {
        const status = getAssignmentStatus(assignment);
        const isOverdue = isAfter(new Date(), new Date(assignment.dueDate));
        
        return (
          <Card key={assignment.Id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  status.status === "overdue" 
                    ? "bg-error/20" 
                    : status.status === "submitted" 
                    ? "bg-success/20" 
                    : "bg-primary/20"
                }`}>
                  <ApperIcon 
                    name={
                      status.status === "submitted" ? "CheckCircle" :
                      status.status === "overdue" ? "Clock" : "ClipboardList"
                    } 
                    size={24} 
                    className={
                      status.status === "overdue" 
                        ? "text-error" 
                        : status.status === "submitted" 
                        ? "text-success" 
                        : "text-primary"
                    } 
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {assignment.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>Course ID: {assignment.courseId}</span>
                    <span>•</span>
                    <span>{assignment.type}</span>
                    <span>•</span>
                    <span>{assignment.maxPoints} points</span>
                  </div>
                </div>
              </div>
              <Badge variant={status.color}>
                {status.text}
              </Badge>
            </div>

            <div className="mb-4">
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Calendar" size={16} className="text-gray-400" />
                  <span className={`${isOverdue ? "text-error" : "text-gray-300"}`}>
                    Due {format(new Date(assignment.dueDate), "MMM d, yyyy 'at' h:mm a")}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <ApperIcon name="FileText" size={16} className="text-gray-400" />
                  <span className="text-gray-300">
                    {assignment.submissions?.length || 0} submissions
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              {userRole === "user" ? (
                <div className="flex items-center space-x-3">
                  {status.status !== "submitted" && (
                    <Button 
                      onClick={() => handleSubmit(assignment.Id)}
                      variant={isOverdue ? "destructive" : "primary"}
                      size="sm"
                    >
                      <ApperIcon name="Upload" size={16} className="mr-2" />
                      {isOverdue ? "Submit Late" : "Submit"}
                    </Button>
                  )}
                  <Button variant="secondary" size="sm">
                    <ApperIcon name="Eye" size={16} className="mr-2" />
                    View Details
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Button 
                    onClick={() => handleGrade(assignment.Id)}
                    variant="primary" 
                    size="sm"
                  >
                    <ApperIcon name="GraduationCap" size={16} className="mr-2" />
                    Grade
                  </Button>
                  <Button 
                    onClick={() => handleEdit(assignment.Id)}
                    variant="secondary" 
                    size="sm"
                  >
                    <ApperIcon name="Edit" size={16} className="mr-2" />
                    Edit
                  </Button>
                  {userRole === "admin" && (
                    <Button 
                      onClick={() => handleDelete(assignment.Id)}
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
        );
      })}
    </div>
  );
};

export default AssignmentList;