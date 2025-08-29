import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Components
import Layout from "@/components/organisms/Layout";

// Pages
import Landing from "@/components/pages/Landing";
import Dashboard from "@/components/pages/Dashboard";
import Courses from "@/components/pages/Courses";
import Assignments from "@/components/pages/Assignments";
import Calendar from "@/components/pages/Calendar";
import Analytics from "@/components/pages/Analytics";
import Users from "@/components/pages/Users";
import Settings from "@/components/pages/Settings";
// Modals
import CourseCreateModal from "@/components/organisms/CourseCreateModal";
import AssignmentCreateModal from "@/components/organisms/AssignmentCreateModal";
function App() {
  // Mock user role - in a real app this would come from authentication context
  const [userRole] = useState("admin"); // Can be: "admin", "manager", "user"

  return (
    <BrowserRouter>
      <div className="App">
<Routes>
          {/* Landing page */}
          <Route path="/" element={<Landing />} />
          
          {/* Modal routes */}
          <Route path="/courses/create" element={<CourseCreateModal />} />
          <Route path="/assignments/create" element={<AssignmentCreateModal />} />
          
          {/* Main application routes */}
          <Route
            path="/dashboard"
            element={
              <Layout userRole={userRole}>
                <Dashboard userRole={userRole} />
              </Layout>
            }
          />
<Route
            path="/courses"
            element={
              <Layout userRole={userRole}>
                <Courses userRole={userRole} />
              </Layout>
            }
          />
          <Route
            path="/assignments"
            element={
              <Layout userRole={userRole}>
                <Assignments userRole={userRole} />
              </Layout>
            }
          />
          <Route
            path="/calendar"
            element={
              <Layout userRole={userRole}>
                <Calendar userRole={userRole} />
              </Layout>
            }
          />
          {/* Role-based routes */}
          {(userRole === "admin" || userRole === "manager") && (
            <Route
              path="/analytics"
              element={
                <Layout userRole={userRole}>
                  <Analytics userRole={userRole} />
                </Layout>
              }
            />
          )}
          
          {(userRole === "admin" || userRole === "manager") && (
            <Route
              path="/users"
              element={
                <Layout userRole={userRole}>
                  <Users userRole={userRole} />
                </Layout>
              }
            />
          )}
          
          <Route
            path="/settings"
            element={
              <Layout userRole={userRole}>
                <Settings userRole={userRole} />
              </Layout>
            }
          />
          
{/* Redirect unknown routes to dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>

        {/* Toast notifications */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;