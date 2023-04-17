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
    <div className={styles.modal}>
      {!gameCode && (
        <div>
          New Game!
          <br />
          Enter a game code here:
          <form>
            <input
              type="text"
              name="gameCode"
              id="gameCode"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button onClick={handleCode}>Submit</button>
          </form>
          <button onClick={() => setGamePlay("computer")}>
            Play against computer
          </button>
          or
          <button onClick={() => setGamePlay("waiting")}>
            Play against a friend
          </button>
        </div>
      )}
      {gamePlay === "waiting" && <h3>Waiting on player 2</h3>}
      {gameCode && <div>Your game code is: {gameCode}</div>}
    </div>
  );
};

export default NewGame;
