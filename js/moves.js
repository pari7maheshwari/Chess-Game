import { board } from "./state.js";
import { isValidPawnMove } from "./pieces/pawn.js";
import { isValidKnightMove } from "./pieces/knight.js";
import { isValidRookMove } from "./pieces/rook.js";
import { isValidBishopMove } from "./pieces/bishop.js";
import { isValidQueenMove } from "./pieces/queen.js";
import { isValidKingMove } from "./pieces/king.js";

export function isValidMove(fromRow, fromCol, toRow, toCol) {
  const piece = board[fromRow][fromCol];

  switch (piece[1]) {
    case "p":
      return isValidPawnMove(fromRow, fromCol, toRow, toCol, piece);

    case "n":
      return isValidKnightMove(fromRow, fromCol, toRow, toCol);

    case "r":
      return isValidRookMove(fromRow, fromCol, toRow, toCol);

    case "b":
      return isValidBishopMove(fromRow, fromCol, toRow, toCol);

    case "q":
      return isValidQueenMove(fromRow, fromCol, toRow, toCol);

    case "k":
      return isValidKingMove(fromRow, fromCol, toRow, toCol);

    default:
      return false;
  }
}
