import { board } from "../state.js";
import { isEnemyPiece } from "../utils.js";

export function isValidKingMove(fromRow, fromCol, toRow, toCol) {
  const rowDiff = Math.abs(toRow - fromRow);
  const colDiff = Math.abs(toCol - fromCol);

  // King moves only one square
  if (rowDiff > 1 || colDiff > 1) {
    return false;
  }

  const piece = board[fromRow][fromCol];
  const destination = board[toRow][toCol];

  // Empty square
  if (destination === "") {
    return true;
  }

  // Capture enemy piece
  return isEnemyPiece(piece, destination);
}