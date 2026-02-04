import { useNavigate, Routes, Route } from "react-router";
import Login from "./Login";
import Registration from "./Registration";

const RegLog = ({ setToken }) => {
  return (
    <>
      <Login setToken={setToken} />
      <Registration />
    </>
  );
};
export default RegLog;
