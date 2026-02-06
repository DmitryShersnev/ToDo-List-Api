import { Outlet, Navigate } from "react-router";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");

  console.log("privateRoute");

  if (!token) {
    return <Navigate to="/ToDo-List-Api/reglog" replace />;
  }
  return <Outlet />;
};
export default PrivateRoute;
