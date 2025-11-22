import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const name = localStorage.getItem('username');
    if (token) {
      setIsLoggedIn(true);
      setUsername(name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-6">Welcome to JEO</h1>

      {isLoggedIn ? (
        <>
          <p className="mb-8 text-lg text-gray-700 text-center">
            Hello, <span className="font-semibold">{username}</span>! You are logged in.
          </p>
          <div className="flex gap-4">
            <Link
              to="/dashboard"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Go to Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link
            to="/dashboard"
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Dashboard
          </Link>
        </div>
      )}
    </div>
  );
}
