import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import FluidBackground from './components/FluidBackground';
import Footer from './components/Footer';
import { getBackendUrl, fetchWithAuth } from './lib/api';

// Pages
import Home from './pages/Home';
import Product from './pages/Product';
import HowItWorks from './pages/HowItWorks';
import AIAgents from './pages/AIAgents';
import CareerIntelligenceEngine from './pages/CareerIntelligenceEngine';
import Features from './pages/Features';
import Dashboard from './pages/Dashboard';
import Stories from './pages/Stories';
import Launch from './pages/Launch';
import About from './pages/About';
import LoginSignup from './pages/LoginSignup';

type RequireAuthProps = {
  children: JSX.Element;
};

function RequireAuth({ children }: RequireAuthProps) {
  const location = useLocation();
  const token = typeof window !== 'undefined' ? localStorage.getItem('remiro_token') : null;

  // Validate token when accessing a protected route (e.g. expired after 7d → 401 → clear & redirect)
  useEffect(() => {
    if (!token) return;
    fetchWithAuth(`${getBackendUrl()}/api/auth/me`).catch(() => {
      // 401 already handled by fetchWithAuth (clear + redirect)
    });
  }, [token]);

  if (!token) {
    return <Navigate to="/register" replace state={{ from: location }} />;
  }

  return children;
}

function App() {
  const location = useLocation();
  const hideNavbar =
    location.pathname === '/register' ||
    location.pathname === '/login' ||
    location.pathname === '/signup';

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen text-text-sec selection:bg-dawn/30 selection:text-phoenix bg-base-bg font-body">
      <FluidBackground />
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/product" element={<Product />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/agents" element={<AIAgents />} />
        <Route path="/engine" element={<CareerIntelligenceEngine />} />
        <Route path="/features" element={<Features />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route path="/stories" element={<Stories />} />
        <Route path="/launch" element={<Launch />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<LoginSignup />} />
        <Route path="/login" element={<Navigate to="/register" replace />} />
        <Route path="/signup" element={<Navigate to="/register" replace />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;