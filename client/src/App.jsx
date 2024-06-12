import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import ProductsList from './components/ProductsList';
import ProductDetail from './components/ProductDetail';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/products/:id" element={<PrivateRoute component={ProductDetail} />} />
          <Route path="/products" element={<PrivateRoute component={ProductsList} />} />
          <Route path="/" element={<Navigate to="/products" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
