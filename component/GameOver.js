import styles from "../styles/modal.module.css";
import { useEffect, useState } from "react";
import Confetti from "./Confetti";
import Sound from "react-sound";

const GameOver = ({ gamePlay, winner, handleReset }) => {
  console.log(gamePlay, winner);
  const [lost, setLost] = useState(true);
  useEffect(() => {
    if (
      winner.split("").includes("1") &&
      (gamePlay === "player1" || gamePlay === "computer")
    ) {
      setLost(false);
    } else if (winner.split("").includes("2") && gamePlay === "player2") {
      setLost(false);
    }
  }, []);
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
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
