import React, { useState, useEffect } from "react";
import ApperIcon from "@/components/ApperIcon";
import StatCard from "@/components/molecules/StatCard";
import ProgressRing from "@/components/molecules/ProgressRing";
import AIJobStatus from "@/components/molecules/AIJobStatus";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import courseService from "@/services/api/courseService";
import assignmentService from "@/services/api/assignmentService";
import userService from "@/services/api/userService";
import aiJobService from "@/services/api/aiJobService";

const Dashboard = ({ userRole = "user" }) => {
  const [data, setData] = useState({
    courses: [],
    assignments: [],
    users: [],
    aiJobs: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [coursesData, assignmentsData, usersData, aiJobsData] = await Promise.all([
        courseService.getAll(),
        assignmentService.getAll(),
        userRole !== "user" ? userService.getAll() : Promise.resolve([]),
        aiJobService.getAll()
      ]);

      setData({
        courses: coursesData,
        assignments: assignmentsData,
        users: usersData,
        aiJobs: aiJobsData
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [userRole]);

  // Calculate stats based on user role
  const getStats = () => {
    if (userRole === "admin") {
      return [
        {
          title: "Total Students",
          value: data.users.filter(u => u.role === "user").length,
          change: 12,
          changeType: "positive",
          icon: "Users"
        },
        {
          title: "Active Courses",
          value: data.courses.filter(c => c.status === "active").length,
          change: 8,
          changeType: "positive",
          icon: "BookOpen"
        },
        {
          title: "Pending Assignments",
          value: data.assignments.filter(a => new Date(a.dueDate) > new Date()).length,
          change: -5,
          changeType: "negative",
          icon: "ClipboardList"
        },
        {
          title: "AI Jobs Today",
          value: data.aiJobs.filter(j => {
            const today = new Date().toDateString();
            return new Date(j.createdAt).toDateString() === today;
          }).length,
          change: 25,
          changeType: "positive",
          icon: "Sparkles"
        }
      ];
    } else if (userRole === "manager") {
      return [
        {
          title: "My Courses",
          value: data.courses.filter(c => c.instructorId === "current-user").length,
          change: 5,
          changeType: "positive",
          icon: "BookOpen"
        },
        {
          title: "Student Enrollments",
          value: data.courses.reduce((sum, c) => sum + (c.enrollments || 0), 0),
          change: 15,
          changeType: "positive",
          icon: "Users"
        },
        {
          title: "Assignments Created",
          value: data.assignments.length,
          change: 10,
          changeType: "positive",
          icon: "ClipboardList"
        },
        {
          title: "Avg. Completion Rate",
          value: "87%",
          change: 3,
          changeType: "positive",
          icon: "TrendingUp"
        }
      ];
    } else {
      return [
        {
          title: "Enrolled Courses",
          value: data.courses.length,
          change: 2,
          changeType: "positive",
          icon: "BookOpen"
        },
        {
          title: "Pending Assignments",
          value: data.assignments.filter(a => new Date(a.dueDate) > new Date()).length,
          change: -1,
          changeType: "negative",
          icon: "ClipboardList"
        },
        {
          title: "Completion Rate",
          value: "92%",
          change: 5,
          changeType: "positive",
          icon: "TrendingUp"
        },
        {
          title: "Study Streak",
          value: 12,
          change: 1,
          changeType: "positive",
          icon: "Flame"
        }
      ];
    }
  };

  if (loading) {
    return <Loading variant="dashboard" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadDashboardData} />;
  }

  const stats = getStats();
  const recentAiJobs = data.aiJobs.slice(0, 3);
  const upcomingAssignments = data.assignments
    .filter(a => new Date(a.dueDate) > new Date())
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {userRole === "admin" ? "Admin" : userRole === "manager" ? "Manager" : "Student"}!
          </h1>
          <p className="text-gray-400">
            Here's what's happening with your {userRole === "user" ? "learning" : "educational platform"} today.
          </p>
        </div>
        <div className="hidden lg:flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm font-medium text-white">
              {new Date().toLocaleDateString("en-US", { 
                weekday: "long", 
                year: "numeric", 
                month: "long", 
                day: "numeric" 
              })}
            </div>
            <div className="text-xs text-gray-400">
              {new Date().toLocaleTimeString("en-US", { 
                hour: "2-digit", 
                minute: "2-digit" 
              })}
            </div>
          </div>
          <ProgressRing progress={75} size={60} showLabel={false} />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* AI Jobs Status */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">AI Activity</h2>
            <Badge variant="success" size="sm">
              <ApperIcon name="Zap" size={12} className="mr-1" />
              Active
            </Badge>
          </div>
          
          {recentAiJobs.length > 0 ? (
            <div className="space-y-4">
              {recentAiJobs.map((job) => (
                <AIJobStatus key={job.Id} job={job} variant="inline" />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="Sparkles" size={24} className="text-primary/60" />
              </div>
              <p className="text-gray-400 text-sm mb-4">No AI jobs running</p>
              <Button variant="primary" size="sm">
                <ApperIcon name="Plus" size={16} className="mr-2" />
                Generate Content
              </Button>
            </div>
          )}
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-white mb-6">Quick Actions</h2>
          <div className="space-y-3">
            {userRole === "user" ? (
              <>
                <Button variant="secondary" className="w-full justify-start" size="sm">
                  <ApperIcon name="Search" size={16} className="mr-3" />
                  Browse Courses
                </Button>
                <Button variant="secondary" className="w-full justify-start" size="sm">
                  <ApperIcon name="Upload" size={16} className="mr-3" />
                  Submit Assignment
                </Button>
                <Button variant="secondary" className="w-full justify-start" size="sm">
                  <ApperIcon name="MessageCircle" size={16} className="mr-3" />
                  Ask AI Tutor
                </Button>
              </>
            ) : (
              <>
                <Button variant="secondary" className="w-full justify-start" size="sm">
                  <ApperIcon name="Plus" size={16} className="mr-3" />
                  Create Course
                </Button>
                <Button variant="secondary" className="w-full justify-start" size="sm">
                  <ApperIcon name="ClipboardList" size={16} className="mr-3" />
                  New Assignment
                </Button>
                <Button variant="secondary" className="w-full justify-start" size="sm">
                  <ApperIcon name="Sparkles" size={16} className="mr-3" />
                  Generate Content
                </Button>
                {userRole === "admin" && (
                  <Button variant="secondary" className="w-full justify-start" size="sm">
                    <ApperIcon name="UserPlus" size={16} className="mr-3" />
                    Invite Users
                  </Button>
                )}
              </>
            )}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-white mb-6">Upcoming Assignments</h2>
          <div className="space-y-4">
            {upcomingAssignments.length > 0 ? (
              upcomingAssignments.map((assignment) => (
                <div key={assignment.Id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-warning/20 rounded-lg flex items-center justify-center">
                      <ApperIcon name="Clock" size={14} className="text-warning" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white truncate">
                        {assignment.title}
                      </div>
                      <div className="text-xs text-gray-400">
                        Due {new Date(assignment.dueDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <Badge variant="warning" size="sm">
                    {Math.ceil((new Date(assignment.dueDate) - new Date()) / (1000 * 60 * 60 * 24))}d
                  </Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name="CheckCircle" size={24} className="text-success/60" />
                </div>
                <p className="text-gray-400 text-sm">All caught up!</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;