const Filtrarion = ({ setFilter }) => {
  const handleClickAll = () => {
    setFilter("all");
  };
  const handleClickActive = () => {
    setFilter("active");
  };
  const handleClickDone = () => {
    setFilter("done");
  };
  return (
    <>
      <button onClick={handleClickAll}>Все</button>
      <button onClick={handleClickActive}>Активные</button>
      <button onClick={handleClickDone}>Завершённые</button>
    </>
  );
};
export default Filtrarion;
