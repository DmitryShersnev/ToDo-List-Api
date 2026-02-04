import { Outlet, Navigate } from "react-router";

const PrivateRoute = ({ setToken, token }) => {
  return token ? <Outlet /> : <Navigate to="/reglog" replace />;
};
export default PrivateRoute;
