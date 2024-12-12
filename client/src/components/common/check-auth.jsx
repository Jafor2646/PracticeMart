import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  // Redirect unauthenticated users to login
  if (
    !isAuthenticated &&
    !location.pathname.startsWith("/auth")
  ) {
    return <Navigate to="/auth/login" replace />;
  }

  // Redirect authenticated users away from login/register
  if (
    isAuthenticated &&
    location.pathname.startsWith("/auth")
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/shop/home" replace />;
    }
  }

  // Restrict admin pages to admins only
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.startsWith("/admin")
  ) {
    return <Navigate to="/unauth-page" replace />;
  }

  // Restrict shopping pages to non-admin users
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.startsWith("/shop")
  ) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // If none of the above conditions are met, allow access to the page
  return <>{children}</>;
}

export default CheckAuth;
