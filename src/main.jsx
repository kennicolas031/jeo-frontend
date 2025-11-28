// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Login from './pages/Login'
import AgentConsole from './pages/AgentConsole'
import CustomerSearch from './pages/CustomerSearch'
import CustomerProfile from './pages/CustomerProfile'
import AddCustomer from './pages/AddCustomer'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="agent-console" element={<AgentConsole />} />
          <Route path="customer-search" element={<CustomerSearch />} />
          <Route path="customer/:customerId" element={<CustomerProfile />} />
          <Route path="add-customer" element={<AddCustomer />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)