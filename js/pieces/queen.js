import { isValidRookMove } from "./rook.js";
import { isValidBishopMove } from "./bishop.js";

export function isValidQueenMove(fromRow, fromCol, toRow, toCol) {
  return (
    isValidRookMove(fromRow, fromCol, toRow, toCol) ||
    isValidBishopMove(fromRow, fromCol, toRow, toCol)
  );
}