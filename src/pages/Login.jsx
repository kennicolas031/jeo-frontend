// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  
  // Mock auth check - replace with your actual auth logic later
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check if user is logged in (e.g., check localStorage, context, etc.)
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const handleLogin = () => {
    // Mock login - replace with actual login logic
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/agent-console');
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  // If user is already logged in, show different UI
  if (isLoggedIn) {
    return (
      <div className="login-bg">
        <div className="login-card">
          {/* Top right circuit accent */}
          <div style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            zIndex: 1
          }}>
            <div style={{width: '30px', height: '2px', background: 'rgba(139, 92, 246, 0.5)'}}></div>
            <div style={{width: '6px', height: '6px', border: '2px solid rgba(139, 92, 246, 0.7)', borderRadius: '50%'}}></div>
            <div style={{width: '20px', height: '2px', background: 'rgba(139, 92, 246, 0.3)'}}></div>
          </div>
          
          {/* Bottom left circuit accent */}
          <div style={{
            position: 'absolute',
            bottom: '24px',
            left: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            zIndex: 1
          }}>
            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
              <div style={{width: '2px', height: '30px', background: 'rgba(139, 92, 246, 0.5)'}}></div>
              <div style={{width: '6px', height: '6px', border: '2px solid rgba(139, 92, 246, 0.7)', borderRadius: '50%'}}></div>
            </div>
          </div>

          <h1>Already Logged In</h1>
          <p>You are currently logged into your account</p>
          
          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            <button 
              className="google-btn"
              onClick={() => navigate('/agent-console')}
              style={{ flex: 1 }}
            >
              Go to Console
            </button>
            <button 
              className="google-btn"
              onClick={handleLogout}
              style={{ 
                flex: 1,
                background: 'rgba(239, 68, 68, 0.2)',
                borderColor: 'rgba(239, 68, 68, 0.5)'
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Regular login UI
  return (
    <div className="login-bg">
      <div className="login-card">
        {/* Top right circuit accent */}
        <div style={{
          position: 'absolute',
          top: '24px',
          right: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          zIndex: 1
        }}>
          <div style={{width: '30px', height: '2px', background: 'rgba(139, 92, 246, 0.5)'}}></div>
          <div style={{width: '6px', height: '6px', border: '2px solid rgba(139, 92, 246, 0.7)', borderRadius: '50%'}}></div>
          <div style={{width: '20px', height: '2px', background: 'rgba(139, 92, 246, 0.3)'}}></div>
        </div>
        
        {/* Bottom left circuit accent */}
        <div style={{
          position: 'absolute',
          bottom: '24px',
          left: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          zIndex: 1
        }}>
          <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <div style={{width: '2px', height: '30px', background: 'rgba(139, 92, 246, 0.5)'}}></div>
            <div style={{width: '6px', height: '6px', border: '2px solid rgba(139, 92, 246, 0.7)', borderRadius: '50%'}}></div>
          </div>
        </div>

        <h1>Welcome to JEO</h1>
        <p>Simplified Credit Management</p>
        <button 
          className="google-btn"
          onClick={handleLogin}
        >
          Login with Google
        </button>
      </div>
    </div>
  );
}