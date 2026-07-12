import { board } from "./state.js";
import { isValidMove } from "./moves.js";


export function isSquareAttacked(row, col, enemyColor) {

  for (let r = 0; r < 8; r++) {

    for (let c = 0; c < 8; c++) {

      const piece = board[r][c];

      if (piece === "") continue;


      if (
        (enemyColor === "white" && piece[0] !== "w") ||
        (enemyColor === "black" && piece[0] !== "b")
      ) {
        continue;
      }


      if (isValidMove(r, c, row, col)) {
        return true;
      }
    }
  }


  return false;
}