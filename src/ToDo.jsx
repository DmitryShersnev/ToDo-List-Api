import Header from "./Header";
import InputTask from "./InputTask";
import TasksList from "./TasksList";
import Filtrarion from "./Filtration";
import Cleaning from "./Cleaning";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

const ToDO = ({ setTasks, tasks, filter, setFilter, token, setToken }) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const fetchTasks = async () => {
    const response = await fetch(`${apiUrl}/todos`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Ошибка при загрузке данных");
    }
    const json = await response.json();

    return json.data;
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  useEffect(() => {
    if (Array.isArray(data)) {
      setTasks(data);
    } else {
      setTasks([]);
    }
  }, [data, setTasks]);

  const fetchDeleteTask = async (id) => {
    const response = await fetch(`${apiUrl}/todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      throw new Error("Не удалось удалить задачу");
    }
  };

  const deleteTaskMutation = useMutation({
    mutationFn: fetchDeleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const deleteTask = (id) => {
    deleteTaskMutation.mutate(id);
  };

  const fetchChangeCheckbox = async (id) => {
    const response = await fetch(`${apiUrl}/todos/${id}/toggle`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      throw new Error("Не удалось изменить статус задачи");
    }
    const data = await response.json();
    return data;
  };

  const changeCheckboxMutation = useMutation({
    mutationFn: fetchChangeCheckbox,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const changeCheckbox = (id) => {
    changeCheckboxMutation.mutate(id);
  };

  const fetchChangeTitle = async ({ id, newTitle }) => {
    const response = await fetch(`${apiUrl}/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title: newTitle }),
    });
    if (!response.ok) {
      throw new Error("Не удалось изменить задачу");
    }
    return await response.json();
  };

  const changeTitleMutation = useMutation({
    mutationFn: fetchChangeTitle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const changeTitle = (id, newTitle) => {
    changeTitleMutation.mutate({ id, newTitle });
  };

  const fetchClearTasks = async () => {
    const completedTasks = tasks.filter((item) => item.completed);
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
    if (!response.ok) {
      throw new Error("Не удалось удалить задачи");
    }
    const data = await response.json();
    return data;
  };

  const clearTasksMutation = useMutation({
    mutationFn: fetchClearTasks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const clearTasks = () => {
    clearTasksMutation.mutate();
  };

  const filteredTasks = tasks.filter((item) => {
    if (filter === "all") return true;

    if (filter === "active") return !item.completed;

    if (filter === "done") return item.completed;
  });

  const countOfActive = tasks.filter((item) => item.completed === false).length;

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return <p>Ошибка: {error?.message}</p>;

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
