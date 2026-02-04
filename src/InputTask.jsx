import { useState } from "react";

const InputTask = ({ filteredTasks, setTasks }) => {
  const [inputText, setInputText] = useState("");
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const addNewTask = async () => {
    try {
      const response = await fetch(
        "https://todo-redev.herokuapp.com/api/todos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RkaW1hQGdtYWlsLmNvbSIsImlkIjoyMTQxLCJpYXQiOjE3NzAwMzk1OTJ9.bquZQSqhMH3mchqPoKsgejoaMrtvQmhfo3T-fvFZhRM",
          },
          body: JSON.stringify({ title: inputText }),
        },
      );
      const data = await response.json();
      setTasks((tasks) => [...tasks, data]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    if (inputText.length === 0 || inputText.trim() === "") {
      setError(true);
    } else {
      addNewTask();
      setInputText("");
      setError(false);
    }
  };
  return (
    <>
      <input value={inputText} onChange={handleChange} />
      <button onClick={handleClick}>Добавить</button>
      <br />
      {error && (
        <p style={{ color: "red" }}>
          Строка не должна быть пустой или состоять только из пробелов
        </p>
      )}
    </>
  );
};

export default InputTask;
