import { Navigate, useLocation } from "react-router-dom"
import { useAuthContext } from "../contexts/AuthContext"

const RutaProtegida = ({ children, onlyAdmin=false }) => {
  const { usuario } = useAuthContext();
  const location = useLocation();

  if (!usuario) {
    return <Navigate to="/login" replace state={{ from: location }} />;
    
  }

  if (onlyAdmin && usuario.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RutaProtegida;
