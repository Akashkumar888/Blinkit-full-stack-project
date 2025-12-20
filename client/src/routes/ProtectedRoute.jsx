
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const isAuth = true; // later replace with JWT / context
  const userRole = "admin"; // from backend / token

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
