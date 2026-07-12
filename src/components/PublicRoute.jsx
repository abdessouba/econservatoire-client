import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PublicRoute({ children }) {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (authenticated) {
    return <Navigate to="/tableau-de-bord" replace />;
  }

  return children;
}