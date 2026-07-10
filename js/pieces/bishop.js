import { board } from "../state.js";
import { isEnemyPiece, isPathClear } from "../utils.js";

export function isValidBishopMove(fromRow, fromCol, toRow, toCol) {
  // Bishop must move diagonally
  if (Math.abs(toRow - fromRow) !== Math.abs(toCol - fromCol)) {
    return false;
  }

  // Can't jump over pieces
  if (!isPathClear(fromRow, fromCol, toRow, toCol)) {
    return false;
  }

  const piece = board[fromRow][fromCol];
  const destination = board[toRow][toCol];

  if (destination === "") {
    return true;
  }

  return isEnemyPiece(piece, destination);
}