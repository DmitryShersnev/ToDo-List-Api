import Header from "./Header";
import InputTask from "./InputTask";
import TasksList from "./TasksList";
import Filtrarion from "./Filtration";
import Cleaning from "./Cleaning";

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
}) => {
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
    </>
  );
};
export default ToDO;
