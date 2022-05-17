import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth);
  return user.user ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
