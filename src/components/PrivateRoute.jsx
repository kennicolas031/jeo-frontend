/*src/components/PrivateRoute.jsx*/
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem('authToken'); // or context/state
  return isLoggedIn ? children : <Navigate to="/login" />;
}
