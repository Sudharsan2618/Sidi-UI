// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";

// const ProtectedRoute = ({ redirectPath = "/login", allowedRoles = [], children }) => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     const hasCompletedQuestions = JSON.parse(localStorage.getItem("hasCompletedQuestions") || "false"); // Ensure boolean conversion

//     if (!user) {
//         return <Navigate to={redirectPath} replace />;
//     }


//     if (!hasCompletedQuestions) {
//         return <Navigate to="/questions" replace />;
//     }

//     return children;
// };

// export default ProtectedRoute;


import React, { Children } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ redirectPath = "/login", allowedRoles = [], children }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const hasCompletedQuestions = JSON.parse(localStorage.getItem("hasCompletedQuestions") || "false");

    if (!user) {
        return <Navigate to={redirectPath} replace />;
    }

    // if (!hasCompletedQuestions && window.location.pathname !== "/questions") {
    //     return <Navigate to="/questions" replace />;
    // }

    return children;
};

export default ProtectedRoute;
