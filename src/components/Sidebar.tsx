import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export default function Sidebar() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside>
      {/* Menu lainnya */}
      <button onClick={handleLogout}>Logout</button>
    </aside>
  );
}