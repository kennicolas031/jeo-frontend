// src/App.jsx
import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Outlet /> {/* renders the page component based on the route */}
    </div>
  );
}
