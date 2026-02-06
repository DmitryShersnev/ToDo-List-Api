import Header from "./Header";
import InputTask from "./InputTask";
import TasksList from "./TasksList";
import Filtrarion from "./Filtration";
import Cleaning from "./Cleaning";
import { useEffect } from "react";

const ToDO = ({ setTasks, tasks, filter, setFilter, token, setToken }) => {
  useEffect(() => {
    getAllTasks();
  }, []);

  console.log("todo");

  const getAllTasks = async () => {
    try {
      const response = await fetch(
        "https://todo-redev.herokuapp.com/api/todos",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTask = async (id) => {
    try {
      const response = await fetch(
        `https://todo-redev.herokuapp.com/api/todos/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      const data = await response.json();
      setTasks((tasks) => tasks.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  let filteredTasks = [];

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
  const changeCheckbox = async (id) => {
    try {
      const response = await fetch(
        `https://todo-redev.herokuapp.com/api/todos/${id}/isCompleted`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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

  const countOfActive = tasks.filter(
    (item) => item.isCompleted === false,
  ).length;

  filterTasks(filter);
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
      <button onClick={() => localStorage.removeItem("token")}>
        Разлогиниться
      </button>
    </>
  );
};
export default ToDO;
