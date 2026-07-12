import { board, state } from "../state.js";
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

    // Capture
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

    // En Passant
    if (
      fromRow === 3 &&
      toRow === 2 &&
      Math.abs(toCol - fromCol) === 1 &&
      board[toRow][toCol] === ""
    ) {
      const last = state.lastMove;

      if (
        last &&
        last.piece === "bp" &&
        last.fromRow === 1 &&
        last.toRow === 3 &&
        last.toCol === toCol
      ) {
        return true;
      }
    }
  }

  // Black pawn
  if (piece === "bp") {
    // One step forward
    if (
      toCol === fromCol &&
      toRow === fromRow + 1 &&
      board[toRow][toCol] === ""
    ) {
      return true;
    }

    // Capture
    if (
      Math.abs(toCol - fromCol) === 1 &&
      toRow === fromRow + 1 &&
      isEnemyPiece(piece, board[toRow][toCol])
    ) {
      return true;
    }

    // First move (2 squares)
    if (
      fromRow === 1 &&
      toCol === fromCol &&
      toRow === 3 &&
      board[2][fromCol] === "" &&
      board[3][fromCol] === ""
    ) {
      return true;
    }

    // En Passant
    if (
      fromRow === 4 &&
      toRow === 5 &&
      Math.abs(toCol - fromCol) === 1 &&
      board[toRow][toCol] === ""
    ) {
      const last = state.lastMove;

      if (
        last &&
        last.piece === "wp" &&
        last.fromRow === 6 &&
        last.toRow === 4 &&
        last.toCol === toCol
      ) {
        return true;
      }
    }
  }

  return false;
}