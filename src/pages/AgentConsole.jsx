// src/pages/AgentConsole.jsx
import React, { useState } from "react";
import { Search, UserPlus, LayoutDashboard, Users, UserCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AgentConsole() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("console");
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
    <div className="agent-console">
      {/* Sidebar */}
      <aside 
        className={`sidebar ${isSidebarExpanded ? 'expanded' : 'collapsed'}`}
        onMouseEnter={() => setIsSidebarExpanded(true)}
        onMouseLeave={() => setIsSidebarExpanded(false)}
      >
        <div className="sidebar-header">
          <h2>JEO</h2>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === "console" ? "active" : ""}`}
            onClick={() => setActiveTab("console")}
          >
            <Users size={22} />
            <span className="nav-text">Agent Console</span>
          </button>

          <button
            className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => navigate('/dashboard')}
          >
            <LayoutDashboard size={22} />
            <span className="nav-text">Dashboard</span>
          </button>

          <button
            className={`nav-item ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => navigate('/profile')}
          >
            <UserCircle size={22} />
            <span className="nav-text">Profile</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={() => {localStorage.removeItem('isLoggedIn'); navigate('/login')}}>
            <LogOut size={20} />
            <span className="nav-text">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-header">
          <h1>Welcome back, Agent</h1>
          <p>Manage your customers and track credit applications</p>
        </div>

        <div className="action-cards">
          <button className="action-card" onClick={() => navigate('/customer-search')}>
            <div className="card-icon">
              <Search size={32} />
            </div>
            <h3>Search Customer</h3>
            <p>Find existing customer records</p>
          </button>

          <button className="action-card" onClick={() => navigate('/add-customer')}>
            <div className="card-icon">
              <UserPlus size={32} />
            </div>
            <h3>Add New Customer</h3>
            <p>Create a new customer profile</p>
          </button>
        </div>
      </main>
    </div>
  );
}