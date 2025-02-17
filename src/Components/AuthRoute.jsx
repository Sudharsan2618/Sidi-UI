import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default AuthRoute;
