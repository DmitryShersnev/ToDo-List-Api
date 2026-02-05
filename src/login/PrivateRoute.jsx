import { Outlet, Navigate } from "react-router";

const PrivateRoute = ({ token }) => {
  // const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/ToDo-List-Api/reglog" replace />;
};
export default PrivateRoute;
