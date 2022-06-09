import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedAdmin = ({ children }) => {
  const user = useSelector((state) => state.auth);
  return user.user && user.user.role === 'Admin' ? children : <Navigate to="/" />;
};

export default ProtectedAdmin;
