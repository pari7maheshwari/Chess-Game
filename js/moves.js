import { board } from "./state.js";
import { isValidPawnMove } from "./pieces/pawn.js";

export function isValidMove(fromRow, fromCol, toRow, toCol) {
  const piece = board[fromRow][fromCol];

  switch (piece[1]) {
    case "p":
      return isValidPawnMove(fromRow, fromCol, toRow, toCol, piece);

    default:
      return false;
  }
}
