import { useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { login } from '../api/authApi';
import { getToken, saveAuth } from '../utils/auth';

const inputClass =
  'w-full rounded-lg border border-gray-300 px-3 py-2 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200';

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isSubmitting = useRef(false); // stops many quick clicks

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fillDemo = () => {
    setForm({ username: 'emilys', password: 'emilyspass' });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting.current) return;

    if (!form.username.trim() || !form.password.trim()) {
      setError('Please enter username and password');
      return;
    }

    isSubmitting.current = true;
    setLoading(true);
    setError('');
    try {
      const data = await login(form.username.trim(), form.password);
      saveAuth(data.accessToken, data.username);
      toast.success('Welcome back!');
      navigate('/products', { replace: true });
    } catch (err) {
      setError(err.message); // e.g. "Invalid credentials"
    } finally {
      isSubmitting.current = false;
      setLoading(false);
    }
  };

  // Already logged in? Skip the login page and redierect to products page
  if (getToken()) {
    return <Navigate to="/products" replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-indigo-600 via-indigo-500 to-purple-600 p-4">
      <form onSubmit={handleSubmit} className="animate-pop w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 to-purple-600 text-xl font-bold text-white">
          P
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
        <p className="mb-5 text-sm text-gray-500">Log in to manage your products</p>

        {error && (
          <p className="mb-4 rounded-lg border border-red-200 bg-red-50 p-2.5 text-sm text-red-700">{error}</p>
        )}

        <label className="mb-1 block text-sm font-medium text-gray-700">Username</label>
        <input name="username" value={form.username} onChange={handleChange} className={`${inputClass} mb-3`} />

        <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
        <div className="relative mb-5">
          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={form.password}
            onChange={handleChange}
            className={`${inputClass} pr-16`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-indigo-600 hover:underline"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-indigo-600 py-2.5 font-medium text-white transition hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <button
          type="button"
          onClick={fillDemo}
          className="mt-3 w-full rounded-lg border border-gray-300 py-2 text-sm text-gray-600 transition hover:bg-gray-50"
        >
          Use demo credentials
        </button>
      </form>
    </div>
  );
};

export default LoginPage;