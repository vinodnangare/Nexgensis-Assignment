import React from 'react'
import LoginPage from './pages/LoginPage';
import { Routes, Route } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <>
    

    <Routes>

      
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />

    </Routes>
 
    </>
  )
}

export default App  