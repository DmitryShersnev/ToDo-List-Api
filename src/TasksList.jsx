import { useState } from "react";
import Task from "./Task";

const TasksList = ({
  filteredTasks,
  deleteTask,
  changeCheckbox,
  changeTitle,
}) => {
  return (
    <>
      {filteredTasks.map((item) => (
        <Task
          key={item.id}
          item={item}
          deleteTask={deleteTask}
          changeCheckbox={changeCheckbox}
          changeTitle={changeTitle}
        />
      ))}
    </>
  );
};

export default TasksList;
