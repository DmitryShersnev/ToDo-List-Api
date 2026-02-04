const Cleaning = ({ countOfActive, clearTasks }) => {
  return (
    <div className="cleaning">
      <p>Осталось дел: {countOfActive} </p>
      <button onClick={() => clearTasks()}>Удалить выполненные</button>
    </div>
  );
};
export default Cleaning;
