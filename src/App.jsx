import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";
import SignUp from "./Pages/Signup";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./Components/ProtectedRoute";
import Layout from "./Pages/Layout";
import AuthRoute from "./Components/AuthRoute";
import UserProfile from "./Pages/UserProfile";
import EconomyMap from "./Pages/EconomyMap";
import EconomyDashboard from "./Pages/EconomyDashboard";
import MarketMap from "./Pages/MarketMap";
import MarketDashboard from "./Pages/MarketDashboard";
import InvestmentMap from "./Pages/InvestmentMap";
import InvestmentDashboard from "./Pages/InvestmentDashboard";
import About from "./Pages/About";
import Contact from "./Pages/Contact";

function App() {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route element={<AuthRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        {/* Protected routes */}
        <Route path="/" element={<Layout />}>
          {/* Index route */}
          <Route
            index
            element={
              <ProtectedRoute redirectPath="/login">
                <Navigate to="/economy/map" replace />
              </ProtectedRoute>
            }
          />

          {/* Economy Routes */}
          <Route
            path="economy/map"
            element={
              <ProtectedRoute redirectPath="/login">
                <EconomyMap />
              </ProtectedRoute>
            }
          />
          <Route
            path="economy/dashboard"
            element={
              <ProtectedRoute redirectPath="/login">
                <EconomyDashboard />
              </ProtectedRoute>
            }
          />

          {/* Market Routes */}
          <Route
            path="market/map"
            element={
              <ProtectedRoute redirectPath="/login">
                <MarketMap />
              </ProtectedRoute>
            }
          />
          <Route
            path="market/dashboard"
            element={
              <ProtectedRoute redirectPath="/login">
                <MarketDashboard />
              </ProtectedRoute>
            }
          />

          {/* Investment Routes */}
          <Route
            path="investment/map"
            element={
              <ProtectedRoute redirectPath="/login">
                <InvestmentMap />
              </ProtectedRoute>
            }
          />
          <Route
            path="investment/dashboard"
            element={
              <ProtectedRoute redirectPath="/login">
                <InvestmentDashboard />
              </ProtectedRoute>
            }
          />

          {/* Profile Route */}
          <Route
            path="profile"
            element={
              <ProtectedRoute redirectPath="/login">
                <UserProfile />
              </ProtectedRoute>
            }
          />

          {/* About Route */}
          <Route
            path="about"
            element={
              <ProtectedRoute redirectPath="/login">
                <About />
              </ProtectedRoute>
            }
          />

          {/* Contact Route */}
          <Route
            path="contact"
            element={
              <ProtectedRoute redirectPath="/login">
                <Contact />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="*" element={<>Page not found</>} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
