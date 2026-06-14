import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b px-6 py-3 flex justify-between items-center shadow-sm">
      <div className="flex items-center space-x-4">
        <span className="font-bold text-xl text-blue-600">GoalPortal</span>
        <div className="hidden md:flex space-x-4 text-sm font-medium text-gray-600">
          {user?.role === 'employee' && (
            <>
              <Link to="/employee" className="hover:text-blue-600">My Dashboard</Link>
              <Link to="/employee/log" className="hover:text-blue-600">Update Progress</Link>
            </>
          )}
          {user?.role === 'manager' && <Link to="/manager" className="hover:text-blue-600">Team Approvals</Link>}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-500">{user?.name} ({user?.role})</span>
        <button onClick={handleLogout} className="text-sm bg-gray-100 px-3 py-1 rounded hover:bg-red-50 hover:text-red-600 transition">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;