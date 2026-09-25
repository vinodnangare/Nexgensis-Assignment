import { Navigate } from 'react-router-dom';
import { getToken } from '../utils/auth';
import Navbar from './Navbar';

// No token = go to login. Otherwise show the navbar and the page.
const ProtectedRoute = ({ children }) => {
  if (!getToken()) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default ProtectedRoute;