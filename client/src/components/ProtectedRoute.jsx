import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, adminOnly }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // Not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Admin-only route check
  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
}