import styles from "../styles/modal.module.css";

const GameOver = ({ winner, handleReset }) => {
  return (
    <div className={styles.modal}>
      Game Over!
      {winner}
      <br />
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default GameOver;
