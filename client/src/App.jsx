import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './Component/ProtectedRoute';
import LoginPage from './Pages/LoginPage';
import ProductsPage from './Pages/ProductsPage';
import ProductDetailPage from './Pages/ProductDetailPage';
import NotFoundPage from './Pages/NotFoundPage';

const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductsPage /> 
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/:id"
          element={
            <ProtectedRoute>
              <ProductDetailPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;