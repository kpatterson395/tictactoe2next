import styles from "../styles/modal.module.css";
import { useEffect, useState } from "react";
import Confetti from "./Confetti";
import Sound from "react-sound";

const GameOver = ({ gamePlay, winner, handleReset, handleClose }) => {
  console.log(gamePlay, winner);
  const [lost, setLost] = useState(true);
  useEffect(() => {
    if (winner) {
      if (
        winner.includes("1") &&
        (gamePlay === "player1" || gamePlay === "computer")
      ) {
        setLost(false);
      } else if (winner.includes("2") && gamePlay === "player2") {
        setLost(false);
      }
    }
  }, []);
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          onClick={() => handleClose(false)}
        >
          <svg
            fill="none"
            viewBox="0 0 24 24"
            height="24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
              fill="#bbb"
            ></path>
          </svg>
        </button>
        {lost && <Sound url="./sad.wav" playStatus={Sound.status.PLAYING} />}
        {!lost && <Confetti />}
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
