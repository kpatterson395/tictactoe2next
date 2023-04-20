import styles from "../styles/modal.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

const NewGame = ({ gamePlay, setGamePlay, gameCode, setGameCode }) => {
  const [code, setCode] = useState("");

  const handleCode = async (e) => {
    e.preventDefault();
    const result = await axios
      .post("/api/gamecode", { gameCode: code })
      .then((data) => data);
    if (result.data === "success") {
      setCode("");
      setGamePlay("player2");
      setGameCode(code);
    } else {
      alert("incorrect code try again");
      setCode("");
    }
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        {!gameCode && (
          <div>
            <h1>Start a New Game</h1>
            <div>
              <button
                className={styles.button}
                onClick={() => setGamePlay("computer")}
              >
                Play against computer
              </button>
              or
              <button
                className={styles.button}
                onClick={() => setGamePlay("waiting")}
              >
                Play against a friend
              </button>
            </div>
            <div className={styles.newGameDiv}>
              Have a game code? Enter here:
              <form className={styles.form}>
                <input
                  className={styles.input}
                  type="text"
                  name="gameCode"
                  id="gameCode"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <button className={styles.button} onClick={handleCode}>
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
        {gamePlay === "waiting" && <h3>Waiting on player 2</h3>}
        {gameCode && <div>Your game code is: {gameCode}</div>}
      </div>
    </div>
  );
};

export default NewGame;
