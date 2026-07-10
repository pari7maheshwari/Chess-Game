import { board } from "./state.js";
import { isValidPawnMove } from "./pieces/pawn.js";
import { isValidKnightMove } from "./pieces/knight.js";
import { isValidRookMove } from "./pieces/rook.js";

export function isValidMove(fromRow, fromCol, toRow, toCol) {
  const piece = board[fromRow][fromCol];

  switch (piece[1]) {
    case "p":
      return isValidPawnMove(fromRow, fromCol, toRow, toCol, piece);

    case "n":
      return isValidKnightMove(fromRow, fromCol, toRow, toCol);

    case "r":
      return isValidRookMove(fromRow, fromCol, toRow, toCol);

    default:
      return false;
  }
}
