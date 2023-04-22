import Head from "next/head";
import styles from "../styles/index.module.css";
import { useEffect, useState } from "react";
import { checkForWinner, gameOver, pickRandomSquare } from "../lib/helpers";
import GameOver from "../component/GameOver";
import NewGame from "../component/NewGame";
import axios from "axios";
import BoardContainer from "../component/BoardContainer";

export default function TicTacToe() {
  const [player1Squares, setPlayer1Squares] = useState([]);
  const [player2Squares, setPlayer2Squares] = useState([]);
  const [turn, setTurn] = useState(1);
  const [alert, setAlert] = useState(false);
  const [winner, setWinner] = useState(false);
  const [gamePlay, setGamePlay] = useState("");
  const [gameCode, setGameCode] = useState("");
  const [intervalId, setIntervalId] = useState();

  useEffect(() => {
    if (gameCode) {
      let res = setInterval(() => {
        getInfo().then((data) => {
          const test = data.find((x) => x.code === gameCode);
          if (test && test.squares) {
            if (test.squares.player1Squares.length !== player1Squares.length) {
              setPlayer1Squares(test.squares.player1Squares);
              setTurn(test.turn);
            }

            if (test.squares.player2Squares.length !== player2Squares.length) {
              setPlayer2Squares(test.squares.player2Squares);
              setTurn(test.turn);
            }
          }
        });
      }, 5000);
      setIntervalId(res);
      setTimeout(() => {
        clearInterval(res);
        setIntervalId(null);
      }, 1000 * 60 * 60);
    }
  }, [gameCode]);

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    }
  }, [alert]);

  useEffect(() => {
    let code;
    if (gamePlay === "waiting") {
      axios.post("/api/gameplay").then(({ data }) => {
        code = data.code;
        setGameCode(data.code);
      });

      let res = setInterval(() => {
        getInfo().then((data) => {
          const test = data.find((x) => x.code === code);
          if (test.player === 2) {
            clearInterval(res);
            setGamePlay("player1");
          }
        });
      }, 5000);
      setTimeout(() => {
        clearInterval(res);
      }, 1000 * 60 * 60);
    }
  }, [gamePlay]);

  useEffect(() => {
    if (checkForWinner(player1Squares)) {
      setWinner("Player 1 wins!");
    } else if (checkForWinner(player2Squares)) {
      setWinner("Player 2 wins!");
    } else if (gameOver(player1Squares, player2Squares)) {
      setWinner("It's a tie! Try again");
    }
  }, [player1Squares, player2Squares]);

  useEffect(() => {
    if (turn === 2 && gamePlay === "computer") {
      console.log(player1Squares, player2Squares);
      let sq = pickRandomSquare(player1Squares, player2Squares);
      setPlayer2Squares((prevState) => [...prevState, sq]);
      setTurn(1);
    }
  }, [turn]);

  const handleClick = async (id) => {
    if (player1Squares.includes(id) || player2Squares.includes(id)) {
      setAlert(true);
    } else if (turn === 1 && gamePlay === "player1") {
      const result = await axios.post("/api/gameplayUpdates", {
        gameCode,
        turn: 2,
        squares: { player1Squares: [...player1Squares, id], player2Squares },
      });
      setPlayer1Squares((prevState) => [...prevState, id]);
      setTurn(2);
    } else if (turn === 2 && gamePlay === "player2") {
      const result = await axios.post("/api/gameplayUpdates", {
        gameCode,
        turn: 1,
        squares: { player2Squares: [...player2Squares, id], player1Squares },
      });
      setPlayer2Squares((prevState) => [...prevState, id]);
      setTurn(1);
    } else if (turn === 1 && gamePlay === "computer") {
      setPlayer1Squares((prevState) => [...prevState, id]);
      setTurn(2);
    }
  };

  const reset = () => {
    setTurn(1);
    setWinner(false);
    setPlayer1Squares([]);
    setPlayer2Squares([]);
    setGamePlay("");
    setGameCode("");
    clearInterval(intervalId);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>tic tac toe</h1>
      <h2>{`Welcome ${gamePlay}`}</h2>
      <h3>{`${turn === 1 ? "Player 1" : "Player 2"} - it's your turn!`}</h3>
      <BoardContainer
        handleClick={handleClick}
        player1Squares={player1Squares}
        player2Squares={player2Squares}
      />
      <button className={`reset ${styles.button}`} onClick={reset}>
        Reset
      </button>
      <div
        className={
          alert ? `${styles.alert} ${styles.alertAppear}` : styles.alert
        }
      >
        That square has been used, try again!
      </div>
      {winner && <GameOver winner={winner} handleReset={reset} />}
      {(!gamePlay || gamePlay === "waiting") && (
        <NewGame
          gamePlay={gamePlay}
          setGamePlay={setGamePlay}
          gameCode={gameCode}
          setGameCode={setGameCode}
        />
      )}
    </div>
  );
}

const getInfo = () => {
  return axios
    .get("/api/gameStatus")
    .then((output) => {
      return output.data.gameplay;
    })
    .catch((error) => console.log(error));
};

// export async function getServerSideProps() {
//   try {
//     const client = await clientPromise;
//     const db = client.db("tictactoe");
//     const gameplay = await db.collection("gameplay").find({}).toArray();

//     return {
//       props: { game: JSON.parse(JSON.stringify(gameplay)) },
//     };
//   } catch (e) {
//     console.error(e);
//   }
// }
