import { board } from "../state.js";
import { isEnemyPiece } from "../utils.js";

export function isValidPawnMove(fromRow, fromCol, toRow, toCol, piece) {
  // White pawn
  if (piece === "wp") {
    // One step forward
    if (
      toCol === fromCol &&
      toRow === fromRow - 1 &&
      board[toRow][toCol] === ""
    ) {
      return true;
    }

    // White captures
    if (
      Math.abs(toCol - fromCol) === 1 &&
      toRow === fromRow - 1 &&
      isEnemyPiece(piece, board[toRow][toCol])
    ) {
      return true;
    }
    // First move (2 squares)
    if (
      fromRow === 6 &&
      toCol === fromCol &&
      toRow === 4 &&
      board[5][fromCol] === "" &&
      board[4][fromCol] === ""
    ) {
      return true;
    }
  }

  // Black pawn
  if (piece === "bp") {
    if (
      toCol === fromCol &&
      toRow === fromRow + 1 &&
      board[toRow][toCol] === ""
    ) {
      return true;
    }
    // Black captures
    if (
      Math.abs(toCol - fromCol) === 1 &&
      toRow === fromRow + 1 &&
      isEnemyPiece(piece, board[toRow][toCol])
    ) {
      return true;
    }
    if (
      fromRow === 1 &&
      toCol === fromCol &&
      toRow === 3 &&
      board[2][fromCol] === "" &&
      board[3][fromCol] === ""
    ) {
      return true;
    }
  }

  return false;
}
