import { useState, useRef, useEffect } from "react";

const Task = ({ item, deleteTask, changeCheckbox, changeTitle }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState(item.title);
  const [error, setError] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isEdit) return;
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsEdit(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEdit]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (editText.trim() !== "") {
        changeTitle(item.id, editText);
        setIsEdit(false);
        setError(false);
      } else {
        setError(true);
      }
    }
    if (e.key === "Escape") {
      setIsEdit(false);
    }
  };

  const handleClick = () => {
    if (editText.trim() !== "") {
      changeTitle(item.id, editText);
      setIsEdit(false);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <>
      <div className="task">
        <input
          type="checkbox"
          checked={item.completed}
          onChange={() => changeCheckbox(item.id)}
        />
        {isEdit ? (
          <>
            <div ref={inputRef}>
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleKeyDown}
              />{" "}
              <button onClick={handleClick}>💾</button>
            </div>
          </>
        ) : (
          <>
            <p className={item.completed ? "checked" : ""}>{item.title}</p>
            <button onClick={() => setIsEdit(true)}>🖊️</button>
          </>
        )}

        <button onClick={() => deleteTask(item.id)}>❌</button>
      </div>
      {error && (
        <p style={{ color: "red" }}>
          Строка не должна быть пустой или состоять только из пробелов
        </p>
      )}
    </>
  );
};

export default Task;
