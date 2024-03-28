import { Navigate } from "react-router-dom";

function ProtectedRoutes({ children }) {
  const token = localStorage.getItem("userToken");
  if (!token) {
    return <Navigate to="/signin" replace />;
  }
  return children;
}

export default ProtectedRoutes;
