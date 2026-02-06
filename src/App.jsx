import "./App.css";
import { useState, useEffect, Suspense } from "react";
import ToDO from "./ToDo";
import { Routes, Route } from "react-router";
import RegLog from "./login/RegLog";
import PrivateRoute from "./login/PrivateRoute";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [token, setToken] = useState(() => {
    const saved = localStorage.getItem("token");

    return saved ? saved : "";
  });
  console.log(token);

  let filteredTasks = [];
  console.log("app");

  const filterTasks = (filter) => {
    if (filter === "all") {
      filteredTasks = tasks;
    } else if (filter === "active") {
      filteredTasks = tasks.filter((item) => !item.isCompleted);
    } else if (filter === "done") {
      filteredTasks = tasks.filter((item) => item.isCompleted);
    }
    return filteredTasks;
  };

  filterTasks(filter);

  const deleteTask = async (id) => {
    try {
      const response = await fetch(
        `https://todo-redev.herokuapp.com/api/todos/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      setTasks((tasks) => tasks.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const changeCheckbox = async (id) => {
    try {
      const response = await fetch(
        `https://todo-redev.herokuapp.com/api/todos/${id}/isCompleted`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      setTasks((tasks) =>
        tasks.map((item) =>
          item.id === id ? { ...item, isCompleted: !item.isCompleted } : item,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const changeTitle = async (id, newTitle) => {
    try {
      const response = await fetch(
        `https://todo-redev.herokuapp.com/api/todos/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title: newTitle }),
        },
      );
      const data = await response.json();
      setTasks((tasks) =>
        tasks.map((item) =>
          item.id === id ? { ...item, title: newTitle } : item,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const clearTasks = async () => {
    try {
      const completedTasks = tasks.filter((item) => item.isCompleted);
      await Promise.all(
        completedTasks.map((item) =>
          fetch(`https://todo-redev.herokuapp.com/api/todos/${item.id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ),
      );
      setTasks((tasks) => tasks.filter((item) => !item.isCompleted));
    } catch (error) {
      console.log(error);
    }
  };

  const countOfActive = tasks.filter(
    (item) => item.isCompleted === false,
  ).length;

  return (
    <>
      <Routes>
        <Route
          path="/ToDo-List-Api/reglog"
          element={
            <Suspense fallback={"Загрузка..."}>
              <RegLog setToken={setToken} />
            </Suspense>
          }
        />
        <Route
          path="/ToDo-List-Api/"
          element={
            <Suspense fallback={"Загрузка..."}>
              <PrivateRoute token={token} />
            </Suspense>
          }
        >
          <Route
            path="/ToDo-List-Api/todo"
            element={
              <Suspense fallback={"Загрузка..."}>
                <ToDO
                  filteredTasks={filteredTasks}
                  deleteTask={deleteTask}
                  changeCheckbox={changeCheckbox}
                  changeTitle={changeTitle}
                  setTasks={setTasks}
                  countOfActive={countOfActive}
                  clearTasks={clearTasks}
                  setFilter={setFilter}
                  token={token}
                  setToken={setToken}
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
