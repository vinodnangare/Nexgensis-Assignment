import React from 'react'
import LoginPage from './pages/LoginPage';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './Component/ProtectedRoute';
const App = () => {
  return (
    <>
     <Toaster position="top-right" />
<BrowserRouter>
    <Routes>

      
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
 </BrowserRouter>
    </>
  )
}

export default App  