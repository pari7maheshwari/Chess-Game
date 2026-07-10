import { board } from "../state.js";
import { isEnemyPiece, isPathClear } from "../utils.js";

export function isValidRookMove(fromRow, fromCol, toRow, toCol) {
  // Must move in a straight line
  if (fromRow !== toRow && fromCol !== toCol) {
    return false;
  }

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