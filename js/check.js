import { board } from "./state.js";
import { isValidMove } from "./moves.js";

export function findKing(color) {
  const king = color === "white" ? "wk" : "bk";

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (board[row][col] === king) {
        return { row, col };
      }
    }
  }

  return null;
}

export function isKingInCheck(color) {
  const king = findKing(color);

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];

      if (piece === "") continue;

      // Skip same-colored pieces
      if (
        (color === "white" && piece[0] === "w") ||
        (color === "black" && piece[0] === "b")
      ) {
        continue;
      }

      if (isValidMove(row, col, king.row, king.col)) {
        return true;
      }
    }
  }

  return false;
}