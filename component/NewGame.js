import styles from "../styles/modal.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";

const NewGame = ({ gamePlay, setGamePlay, gameCode, setGameCode }) => {
  const [code, setCode] = useState("");
  const [option, setOption] = useState("");

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
        {!option && (
          <div>
            <h1>Welcome to tic tac toe</h1>
            <h3>Choose an option below to get started:</h3>
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
                onClick={() => setOption("friend")}
              >
                Play against a friend
              </button>
            </div>
          </div>
        )}
        {option === "friend" && (
          <div className={styles.friendDiv}>
            <button
              className={styles.button}
              onClick={() => {
                setGamePlay("waiting");
                setOption("newcode");
              }}
            >
              Start new game
            </button>

            <h5>or</h5>
            <button
              className={styles.button}
              onClick={() => setOption("hascode")}
            >
              Join existing game with code
            </button>
          </div>
        )}
        {option === "hascode" && (
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
        )}
        {option === "newcode" && (
          <div>
            <Loader />
            <h3>Waiting on player 2</h3>
            {gameCode && <div>Your game code is: {gameCode}</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewGame;
