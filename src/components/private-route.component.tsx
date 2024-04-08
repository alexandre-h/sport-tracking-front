import { Outlet, Navigate } from 'react-router-dom';
import AuthService from "../services/auth.service";

const PrivateRoute = () => {
  const currentUser = AuthService.getCurrentUser();

  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
