import styles from "../styles/index.module.css";
import { squareNames } from "../lib/helpers";
import Box from "./Box";

const BoardContainer = ({ player1Squares, player2Squares, handleClick }) => {
  return (
    <div className={styles.boardContainer}>
      {squareNames.map((square, i) => {
        let color = "";
        if (player1Squares.includes(square)) {
          color = "#7a565b";
        } else if (player2Squares.includes(square)) {
          color = "#56677a";
        } else {
          color = "white";
        }
        return (
          <Box
            id={square}
            color={color}
            handleClick={handleClick}
            key={square}
          />
        );
      })}
    </div>
  );
};

export default BoardContainer;
