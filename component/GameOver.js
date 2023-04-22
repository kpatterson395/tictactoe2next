import styles from "../styles/modal.module.css";

const GameOver = ({ winner, handleReset }) => {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <h1>Game Over</h1>
        <h2>{winner}</h2>
        <div className={styles.bottom}>
          <button className={styles.button} onClick={handleReset}>
            New Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOver;
