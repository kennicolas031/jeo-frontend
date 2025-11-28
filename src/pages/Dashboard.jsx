// src/pages/Dashboard.jsx
import React, { useState } from "react";
import { 
  Users, CreditCard, DollarSign, Calendar, FileText,
  TrendingUp, ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function Dashboard() {
  const navigate = useNavigate();

  // KPI Data
const kpiData = [
  {
    title: "Total Customers",
    value: "1,234",
    icon: Users,
    color: "#8b5cf6",
    bgColor: "rgba(139, 92, 246, 0.1)",
    trend: "+12% from last month"
  },
  {
    title: "Active Loans",
    value: "856",
    icon: CreditCard,
    color: "#6366f1",
    bgColor: "rgba(99, 102, 241, 0.1)",
    trend: "+8% from last month"
  },
  {
    title: "Total Outstanding",
    value: "R 4.2M",
    icon: DollarSign,
    color: "#ec4899",
    bgColor: "rgba(236, 72, 153, 0.1)",
    trend: "+15% from last month"
  },
  {
    title: "Outstanding This Month",
    value: "R 342K",
    icon: Calendar,
    color: "#f59e0b",
    bgColor: "rgba(245, 158, 11, 0.1)",
    trend: "-5% from last month"
  },
  {
    title: "Collected This Month",
    value: "R 287K",
    icon: TrendingUp,
    color: "#10b981",
    bgColor: "rgba(16, 185, 129, 0.1)",
    trend: "+18% from last month"
  },
  {
    title: "Pending Applications",
    value: "47",
    icon: FileText,
    color: "#a855f7",
    bgColor: "rgba(168, 85, 247, 0.1)",
    trend: "23 need urgent review"
  }
];

  // Last 90 days applications data
  const applicationsData = [
    { date: 'Jan 1', accepted: 12, rejected: 3 },
    { date: 'Jan 8', accepted: 15, rejected: 5 },
    { date: 'Jan 15', accepted: 18, rejected: 4 },
    { date: 'Jan 22', accepted: 14, rejected: 6 },
    { date: 'Jan 29', accepted: 20, rejected: 7 },
    { date: 'Feb 5', accepted: 22, rejected: 8 },
    { date: 'Feb 12', accepted: 19, rejected: 5 },
    { date: 'Feb 19', accepted: 25, rejected: 9 },
    { date: 'Feb 26', accepted: 23, rejected: 6 },
    { date: 'Mar 5', accepted: 28, rejected: 7 },
    { date: 'Mar 12', accepted: 30, rejected: 10 },
    { date: 'Mar 19', accepted: 27, rejected: 8 }
  ];

  // Active vs Inactive customers
  const customerStatusData = [
    { name: 'Active', value: 856, color: '#10b981' },
    { name: 'Inactive', value: 378, color: '#ef4444' }
  ];

  // New customers per month
  const newCustomersData = [
    { month: 'Aug', customers: 45 },
    { month: 'Sep', customers: 52 },
    { month: 'Oct', customers: 68 },
    { month: 'Nov', customers: 71 },
    { month: 'Dec', customers: 89 },
    { month: 'Jan', customers: 94 },
    { month: 'Feb', customers: 102 },
    { month: 'Mar', customers: 115 }
  ];

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="dashboard-header">
        <button className="back-btn" onClick={() => navigate('/agent-console')}>
          <ArrowLeft size={20} />
          <span>Back to Console</span>
        </button>
        <div className="header-content">
          <div>
            <h1>Dashboard</h1>
            <p>Overview of your credit management system</p>
          </div>
          <div className="header-date">
            <Calendar size={18} />
            <span>{new Date().toLocaleDateString('en-ZA', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        {kpiData.map((kpi, index) => (
          <div key={index} className="kpi-card" style={{ borderColor: kpi.color + '40' }}>
            <div className="kpi-icon" style={{ 
              backgroundColor: kpi.bgColor,
              color: kpi.color 
            }}>
              <kpi.icon size={24} />
            </div>
            <div className="kpi-content">
              <p className="kpi-title">{kpi.title}</p>
              <h3 className="kpi-value">{kpi.value}</h3>
              <p className="kpi-trend">
                <TrendingUp size={14} />
                {kpi.trend}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        
        {/* Applications Line Chart */}
        <div className="chart-card full-width">
          <div className="chart-header">
            <h3>Application Trends (Last 90 Days)</h3>
            <p>Track accepted vs rejected applications</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={applicationsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 92, 246, 0.1)" />
              <XAxis 
                dataKey="date" 
                stroke="rgba(255, 255, 255, 0.5)"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="rgba(255, 255, 255, 0.5)"
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 12, 41, 0.9)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="accepted" 
                stroke="#10b981" 
                strokeWidth={3}
                name="Accepted"
                dot={{ fill: '#10b981', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="rejected" 
                stroke="#ef4444" 
                strokeWidth={3}
                name="Rejected"
                dot={{ fill: '#ef4444', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart - Customer Status */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>Customer Status</h3>
            <p>Active vs Inactive customers</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={customerStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {customerStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 12, 41, 0.9)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="chart-legend">
            {customerStatusData.map((item, index) => (
              <div key={index} className="legend-item">
                <div className="legend-color" style={{ backgroundColor: item.color }}></div>
                <span>{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart - New Customers */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>New Customers Per Month</h3>
            <p>Customer acquisition trend</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={newCustomersData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 92, 246, 0.1)" />
              <XAxis 
                dataKey="month" 
                stroke="rgba(255, 255, 255, 0.5)"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="rgba(255, 255, 255, 0.5)"
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 12, 41, 0.9)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Bar 
                dataKey="customers" 
                fill="#8b5cf6"
                radius={[8, 8, 0, 0]}
                name="New Customers"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}