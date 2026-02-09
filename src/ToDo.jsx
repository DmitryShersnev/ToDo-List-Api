import Header from "./Header";
import InputTask from "./InputTask";
import TasksList from "./TasksList";
import Filtrarion from "./Filtration";
import Cleaning from "./Cleaning";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const ToDO = ({ setTasks, tasks, filter, setFilter, token, setToken }) => {
  useEffect(() => {
    getAllTasks();
  }, []);

  console.log("todo");
  const apiUrl = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const getAllTasks = async () => {
    try {
      const response = await fetch(`${apiUrl}/todos`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/todos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setTasks((tasks) => tasks.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const changeCheckbox = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/todos/${id}/isCompleted`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
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
      const response = await fetch(`${apiUrl}/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title: newTitle }),
      });
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
          fetch(`${apiUrl}/todos/${item.id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
        ),
      );
      setTasks((tasks) => tasks.filter((item) => !item.isCompleted));
    } catch (error) {
      console.log(error);
    }
  };

  const filteredTasks = tasks.filter((item) => {
    if (filter === "all") return true;

    if (filter === "active") return !item.isCompleted;

    if (filter === "done") return item.isCompleted;
  });

  const countOfActive = tasks.filter(
    (item) => item.isCompleted === false,
  ).length;

  return (
    <>
      <Header />
      <InputTask
        filteredTasks={filteredTasks}
        setTasks={setTasks}
        token={token}
      />
      <hr />
      <TasksList
        filteredTasks={filteredTasks}
        deleteTask={deleteTask}
        changeCheckbox={changeCheckbox}
        changeTitle={changeTitle}
      />
      <hr />
      <Filtrarion setFilter={setFilter} />
      <hr />
      <Cleaning countOfActive={countOfActive} clearTasks={clearTasks} />
      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate(0);
        }}
      >
        Разлогиниться
      </button>
    </>
  );
};
export default ToDO;
