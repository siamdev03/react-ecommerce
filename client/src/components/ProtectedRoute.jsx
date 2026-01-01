import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ adminOnly = false, children }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // Not logged in → login page
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  // Admin route but user is not admin → home
  if (adminOnly && !userInfo.isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Works with both children and nested routes
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
