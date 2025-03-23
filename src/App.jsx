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

        </Route>
        <Route
          path="profile"
          element={
            <ProtectedRoute allowedRoles={["user"]} redirectPath="/login">
              <UserProfile />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<>Page not found</>}>

        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
