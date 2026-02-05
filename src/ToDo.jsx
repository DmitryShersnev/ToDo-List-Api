import Header from "./Header";
import InputTask from "./InputTask";
import TasksList from "./TasksList";
import Filtrarion from "./Filtration";
import Cleaning from "./Cleaning";
import { useEffect } from "react";

const ToDO = ({
  filteredTasks,
  setTasks,
  deleteTask,
  changeCheckbox,
  changeTitle,
  setFilter,
  countOfActive,
  clearTasks,
  token,
  setToken,
}) => {
  useEffect(() => {
    getAllTasks();
  }, []);

  const getAllTasks = async () => {
    try {
      const response = await fetch(
        "https://todo-redev.herokuapp.com/api/todos",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };
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
      <button onClick={() => setToken("")}>Разлогиниться</button>
    </>
  );
};
export default ToDO;
