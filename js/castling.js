import { board, state } from "./state.js";
import { isSquareAttacked } from "./attack.js";

export function isValidCastle(fromRow, fromCol, toRow, toCol, piece) {
  // White king
  if (piece === "wk" && fromRow === 7 && fromCol === 4) {
    // King side castle
    if (
      toRow === 7 &&
      toCol === 6 &&
      !state.moved.wk &&
      !state.moved.wrh &&
      board[7][5] === "" &&
      board[7][6] === "" &&
      !isSquareAttacked(7, 4, "black") &&
      !isSquareAttacked(7, 5, "black") &&
      !isSquareAttacked(7, 6, "black")
    ) {
      return true;
    }

    // Queen side castle
    if (
      toRow === 7 &&
      toCol === 2 &&
      !state.moved.wk &&
      !state.moved.wra &&
      board[7][1] === "" &&
      board[7][2] === "" &&
      board[7][3] === "" &&
      !isSquareAttacked(7, 4, "black") &&
      !isSquareAttacked(7, 3, "black") &&
      !isSquareAttacked(7, 2, "black")
    ) {
      return true;
    }
  }

  // Black king
  if (piece === "bk" && fromRow === 0 && fromCol === 4) {
    // King side
    if (
      toRow === 0 &&
      toCol === 6 &&
      !state.moved.bk &&
      !state.moved.brh &&
      board[0][5] === "" &&
      board[0][6] === "" &&
      !isSquareAttacked(0, 4, "white") &&
      !isSquareAttacked(0, 5, "white") &&
      !isSquareAttacked(0, 6, "white")
    ) {
      return true;
    }

    // Queen side
    if (
      toRow === 0 &&
      toCol === 2 &&
      !state.moved.bk &&
      !state.moved.bra &&
      board[0][1] === "" &&
      board[0][2] === "" &&
      board[0][3] === "" &&
      !isSquareAttacked(0, 4, "white") &&
      !isSquareAttacked(0, 3, "white") &&
      !isSquareAttacked(0, 2, "white")
    ) {
      return true;
    }
  }

  return false;
}
