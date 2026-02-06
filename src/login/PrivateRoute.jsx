import { Outlet, Navigate } from "react-router";

const PrivateRoute = ({ token }) => {
  // const token = localStorage.getItem("token");

  console.log("privateRoute");

  return token ? <Outlet /> : <Navigate to="/ToDo-List-Api/reglog" />;
};
export default PrivateRoute;
