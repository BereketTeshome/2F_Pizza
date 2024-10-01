"use client";
import DashboardNav from "../components/DashboardNav";
import Sidebar from "../components/Sidebar";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  // Manage sidebar open/close state
  const component = useSelector((state) => state.component.component);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Toggle sidebar function using functional update
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };
  return (
    <div>
      {/* Pass toggleSidebar to DashboardNav */}
      <DashboardNav toggleSidebar={toggleSidebar} />

      {/* Pass isSidebarOpen state to Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} />

      <div
        className={`p-4 ${isSidebarOpen ? "sm:ml-64" : "ml-0"} transition-all`}
      >
        {component}
      </div>
    </div>
  );
};

export default Dashboard;
