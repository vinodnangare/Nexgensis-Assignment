import React from 'react'
import LoginPage from './pages/LoginPage';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './Component/ProtectedRoute';
import ProductsPage from './pages/ProductsPage';
const App = () => {
  return (
    <>
     <Toaster position="top-right" />
<BrowserRouter>
    <Routes>

         <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductsPage /> 
            </ProtectedRoute>
          }
        />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
 </BrowserRouter>
    </>
  )
}

export default App  