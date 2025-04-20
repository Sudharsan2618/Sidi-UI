import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/Signup";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./Components/ProtectedRoute";
import Questions from "./Pages/Questions";
import Courses from "./Pages/Courses";
import Course from "./Pages/Course";
import Enroll from "./Pages/Enroll";
import Layout from "./Pages/Layout";
import AuthRoute from "./Components/AuthRoute";
import Ebooks from "./Pages/Ebooks";
import UserProfile from "./Pages/UserProfile";
import EconomyMap from "./Pages/EconomyMap";
import EconomyDashboard from "./Pages/EconomyDashboard";
import MarketMap from "./Pages/MarketMap";
import MarketDashboard from "./Pages/MarketDashboard";
import InvestmentMap from "./Pages/InvestmentMap";
import InvestmentDashboard from "./Pages/InvestmentDashboard";

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
          {/* Role-based protected routes */}
          <Route
            index
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]} redirectPath="/login">
                <Home />
              </ProtectedRoute>
            }
          />

          {/* Economy Routes */}
          <Route
            path="economy/map"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]} redirectPath="/login">
                <EconomyMap />
              </ProtectedRoute>
            }
          />
          <Route
            path="economy/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]} redirectPath="/login">
                <EconomyDashboard />
              </ProtectedRoute>
            }
          />

          {/* Market Routes */}
          <Route
            path="market/map"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]} redirectPath="/login">
                <MarketMap />
              </ProtectedRoute>
            }
          />
          <Route
            path="market/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]} redirectPath="/login">
                <MarketDashboard />
              </ProtectedRoute>
            }
          />

          {/* Investment Routes */}
          <Route
            path="investment/map"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]} redirectPath="/login">
                <InvestmentMap />
              </ProtectedRoute>
            }
          />
          <Route
            path="investment/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]} redirectPath="/login">
                <InvestmentDashboard />
              </ProtectedRoute>
            }
          />

          {/* Profile Route */}
          <Route
            path="profile"
            element={
              <ProtectedRoute allowedRoles={["user"]} redirectPath="/login">
                <UserProfile />
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
