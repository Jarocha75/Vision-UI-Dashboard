import { useAuth } from "@/context/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoutes = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
