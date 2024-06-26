import { Navigate } from "react-router-dom";

function UnProtectedRoutes({ children }) {
  /* const navigate= useNavigate();*/
  const token = localStorage.getItem("userToken");
  if (token) {
    /*navigate('/signin')*/
    return <Navigate to="/signin" />;
  }
  return children;
}

export default UnProtectedRoutes;
