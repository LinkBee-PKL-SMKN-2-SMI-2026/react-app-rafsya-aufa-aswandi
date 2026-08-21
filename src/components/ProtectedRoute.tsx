import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export default function ProtectedRoute() {
  const token = useAuthStore((state) => state.token);
  
  // Jika tidak ada token, tendang ke halaman login
  if (!token) return <Navigate to="/login" replace />;
  
  // Jika ada, render anak rutenya (outlet)
  return <Outlet />;
}