import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children, userRole = "user" }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        userRole={userRole}
      />
      
      <div className="flex flex-col flex-1 lg:ml-64">
        <Header 
          onToggleSidebar={() => setSidebarOpen(true)} 
          userRole={userRole}
        />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;