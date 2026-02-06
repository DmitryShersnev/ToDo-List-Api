import "./App.css";
import { useState, Suspense } from "react";
import ToDO from "./ToDo";
import { Routes, Route } from "react-router";
import RegLog from "./login/RegLog";
import PrivateRoute from "./login/PrivateRoute";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  console.log("app");

  return (
    <>
      <Routes>
        <Route
          path="/reglog"
          element={
            <Suspense fallback={"Загрузка..."}>
              <RegLog />
            </Suspense>
          }
        />
        <Route
          element={
            <Suspense fallback={"Загрузка..."}>
              <PrivateRoute />
            </Suspense>
          }
        >
          <Route
            path="/"
            element={
              <Suspense fallback={"Загрузка..."}>
                <ToDO
                  tasks={tasks}
                  setTasks={setTasks}
                  filter={filter}
                  setFilter={setFilter}
                />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
