import React, { useState, useEffect } from "react";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Select from "@/components/atoms/Select";
import StatCard from "@/components/molecules/StatCard";
import ProgressRing from "@/components/molecules/ProgressRing";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ReactApexChart from "react-apexcharts";
import courseService from "@/services/api/courseService";
import assignmentService from "@/services/api/assignmentService";
import userService from "@/services/api/userService";

const Analytics = ({ userRole = "manager" }) => {
  const [data, setData] = useState({
    courses: [],
    assignments: [],
    users: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [timeRange, setTimeRange] = useState("30d");

  const loadAnalyticsData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [coursesData, assignmentsData, usersData] = await Promise.all([
        courseService.getAll(),
        assignmentService.getAll(),
        userRole === "admin" ? userService.getAll() : Promise.resolve([])
      ]);

      setData({
        courses: coursesData,
        assignments: assignmentsData,
        users: usersData
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalyticsData();
  }, [userRole]);

  const timeRangeOptions = [
    { value: "7d", label: "Last 7 days" },
    { value: "30d", label: "Last 30 days" },
    { value: "90d", label: "Last 3 months" },
    { value: "1y", label: "Last year" }
  ];

  // Chart configurations
  const enrollmentChartOptions = {
    chart: {
      type: "line",
      background: "transparent",
      toolbar: { show: false },
      zoom: { enabled: false }
    },
    theme: { mode: "dark" },
    colors: ["#7C3AED", "#4F46E5", "#10B981"],
    stroke: { curve: "smooth", width: 3 },
    grid: {
      borderColor: "rgba(255, 255, 255, 0.1)",
      strokeDashArray: 3
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      labels: { style: { colors: "#9CA3AF" } }
    },
    yaxis: {
      labels: { style: { colors: "#9CA3AF" } }
    },
    tooltip: {
      theme: "dark",
      style: { backgroundColor: "#18181B" }
    },
    legend: {
      labels: { colors: "#9CA3AF" }
    }
  };

  const enrollmentChartSeries = [
    { name: "New Enrollments", data: [30, 40, 35, 50, 49, 60] },
    { name: "Course Completions", data: [25, 30, 28, 35, 40, 45] },
    { name: "Active Students", data: [85, 90, 88, 95, 92, 98] }
  ];

  const performanceChartOptions = {
    chart: {
      type: "donut",
      background: "transparent"
    },
    theme: { mode: "dark" },
    colors: ["#10B981", "#F59E0B", "#EF4444", "#6B7280"],
    labels: ["Excellent", "Good", "Needs Improvement", "Poor"],
    legend: {
      position: "bottom",
      labels: { colors: "#9CA3AF" }
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
              label: "Performance",
              fontSize: "14px",
              color: "#9CA3AF"
            }
          }
        }
      }
    },
    tooltip: {
      theme: "dark",
      style: { backgroundColor: "#18181B" }
    }
  };

  const performanceChartSeries = [45, 30, 20, 5];

  if (loading) {
    return <Loading variant="dashboard" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadAnalyticsData} />;
  }

  const stats = [
    {
      title: "Total Enrollment",
      value: data.courses.reduce((sum, c) => sum + (c.enrollments || 0), 0),
      change: 15,
      changeType: "positive",
      icon: "Users"
    },
    {
      title: "Course Completion Rate",
      value: "87%",
      change: 5,
      changeType: "positive",
      icon: "TrendingUp"
    },
    {
      title: "Average Grade",
      value: "B+",
      change: 3,
      changeType: "positive",
      icon: "Award"
    },
    {
      title: "Student Satisfaction",
      value: "4.6/5",
      change: 8,
      changeType: "positive",
      icon: "Star"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Analytics Dashboard</h1>
          <p className="text-gray-400">
            Track performance, engagement, and learning outcomes across your platform
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            options={timeRangeOptions}
            className="w-40"
          />
          <button className="px-4 py-2 bg-primary/20 border border-primary/30 rounded-lg text-primary hover:bg-primary/30 transition-colors duration-200 flex items-center space-x-2">
            <ApperIcon name="Download" size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Trends */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Enrollment Trends</h3>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-sm text-gray-400">Growing 15%</span>
            </div>
          </div>
          <ReactApexChart
            options={enrollmentChartOptions}
            series={enrollmentChartSeries}
            type="line"
            height={300}
          />
        </Card>

        {/* Performance Distribution */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Performance Distribution</h3>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-sm text-gray-400">75% Above Average</span>
            </div>
          </div>
          <ReactApexChart
            options={performanceChartOptions}
            series={performanceChartSeries}
            type="donut"
            height={300}
          />
        </Card>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course Performance */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Top Performing Courses</h3>
          <div className="space-y-4">
            {data.courses.slice(0, 5).map((course, index) => (
              <div key={course.Id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">#{index + 1}</span>
                  </div>
                  <div>
                    <div className="font-medium text-white text-sm">{course.title}</div>
                    <div className="text-xs text-gray-400">{course.enrollments || 0} students</div>
                  </div>
                </div>
                <ProgressRing 
                  progress={85 - (index * 5)} 
                  size={40} 
                  showLabel={false}
                  color="primary"
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Student Engagement */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Student Engagement</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-300">Daily Active Users</span>
                <span className="text-sm font-medium text-white">892</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full" style={{ width: "78%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-300">Assignment Submission Rate</span>
                <span className="text-sm font-medium text-white">94%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-gradient-to-r from-success to-info h-2 rounded-full" style={{ width: "94%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-300">Discussion Participation</span>
                <span className="text-sm font-medium text-white">67%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-gradient-to-r from-warning to-error h-2 rounded-full" style={{ width: "67%" }}></div>
              </div>
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
                <ApperIcon name="UserPlus" size={14} className="text-success" />
              </div>
              <div>
                <div className="text-sm text-white">25 new students enrolled</div>
                <div className="text-xs text-gray-400">2 hours ago</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <ApperIcon name="BookOpen" size={14} className="text-primary" />
              </div>
              <div>
                <div className="text-sm text-white">New course published</div>
                <div className="text-xs text-gray-400">4 hours ago</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-warning/20 rounded-full flex items-center justify-center">
                <ApperIcon name="Award" size={14} className="text-warning" />
              </div>
              <div>
                <div className="text-sm text-white">Achievement unlocked</div>
                <div className="text-xs text-gray-400">6 hours ago</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-info/20 rounded-full flex items-center justify-center">
                <ApperIcon name="MessageCircle" size={14} className="text-info" />
              </div>
              <div>
                <div className="text-sm text-white">15 new discussions</div>
                <div className="text-xs text-gray-400">8 hours ago</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;