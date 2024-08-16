import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CropManagement from './pages/CropManagement';
import SensorSelection from './pages/SensorSelection';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import Home from "./pages/Home";

/**
 * The main application component that sets up routing and provides authentication context.
 * It includes the navigation bar, footer, and routes to different pages of the application.
 * Protected routes are wrapped with the `PrivateRoute` component to ensure authentication.
 *
 * @component
 * @returns {JSX.Element} A React component that renders the main application structure.
 */
function App() {
  return (
      <Router>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow">
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route element={<PrivateRoute />}>
                  <Route index element={<Dashboard />} />
                  <Route path="/crops" element={<CropManagement />} />
                  <Route path="/sensor-selection" element={<SensorSelection />} />
                </Route>
              </Routes>
            </div>
            <Footer />
          </div>
        </AuthProvider>
      </Router>
  );
}

export default App;
