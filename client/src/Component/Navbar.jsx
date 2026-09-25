import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { clearAuth, getUsername } from '../utils/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const username = getUsername() || 'admin';

  const handleLogout = () => {
    clearAuth();
    toast.success('Logged out');
    navigate('/login', { replace: true });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/products" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-indigo-600 to-purple-600 font-bold text-white">
            P
          </span>
          <span className="text-lg font-bold text-gray-900">Product Admin</span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 sm:flex">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold uppercase text-indigo-700">
              {username[0]}
            </span>
            <span className="text-sm text-gray-700">{username}</span>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;