import { useNavigate, Routes, Route } from "react-router";
import Login from "./Login";
import Registration from "./Registration";

const RegLog = ({ setToken, token }) => {
  console.log("reglog");

  return (
    <>
      <Login setToken={setToken} token={token} />
      <Registration />
    </>
  );
};
export default RegLog;
