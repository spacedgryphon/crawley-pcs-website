import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './hooks/useAuth';
import { SupabaseProvider } from './context/SupabaseContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import BuildProcess from './components/BuildProcess';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ConsultationForm from './components/ConsultationForm';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}

function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <BuildProcess />
      <Testimonials />
    </>
  );
}

export default function App() {
  const { user } = useAuth();

  return (
    <SupabaseProvider>
      <Router>
        <div className="min-h-screen bg-gray-900 text-white">
          <Navbar isAdmin={!!user} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/consultation" element={<ConsultationForm />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
          <Toaster position="top-right" />
        </div>
      </Router>
    </SupabaseProvider>
  );
}