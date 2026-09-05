import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';

import Home from './pages/Home';
import Transportation from './pages/Transportation';
import RealEstate from './pages/RealEstate';
import CyberCafe from './pages/CyberCafe';
import Enquiry from './pages/Enquiry';

// Protected route for admin
const ProtectedAdmin = ({ children }) => {
  const { user, isAdmin, loading } = useAuth();
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-gold"></div>
      </div>
    );
  }
  if (!user || !isAdmin) {
    return <Navigate to="/admin" replace />;
  }
  return children;
};

function AppContent() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transport" element={<Transportation />} />
        <Route path="/realestate" element={<RealEstate />} />
        <Route path="/cybercafe" element={<CyberCafe />} />
        <Route path="/enquiry" element={<Enquiry />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdmin>
              <AdminDashboard />
            </ProtectedAdmin>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;