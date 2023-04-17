export const winningSquares = [
  ["top-left", "top-middle", "top-right"],
  ["middle-left", "middle-middle", "middle-right"],
  ["bottom-left", "bottom-middle", "bottom-right"],
  ["top-left", "middle-left", "bottom-left"],
  ["top-middle", "middle-middle", "bottom-middle"],
  ["top-right", "middle-right", "bottom-right"],
  ["top-left", "middle-middle", "bottom-right"],
  ["top-right", "middle-middle", "bottom-left"],
];

export const squareNames = [
  "top-left",
  "top-middle",
  "top-right",
  "middle-left",
  "middle-middle",
  "middle-right",
  "bottom-left",
  "bottom-middle",
  "bottom-right",
];

export function checkForWinner(playerArr) {
  let winning = false;
  if (playerArr.length < 2) {
    return winning;
  } else {
    winningSquares.forEach((i) => {
      let checker = i.every((v) => playerArr.includes(v));
      if (checker) {
        winning = true;
      }
    });
  }
  return winning;
}

export function gameOver(player1Squares, player2Squares) {
  let totalLength = player1Squares.length + player2Squares.length;
  if (totalLength === 9) {
    return true;
  }
  return false;
}
