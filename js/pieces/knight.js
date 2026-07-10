import { board } from "../state.js";
import { isEnemyPiece } from "../utils.js";

export function isValidKnightMove(fromRow, fromCol, toRow, toCol) {
  const rowDiff = Math.abs(toRow - fromRow);
  const colDiff = Math.abs(toCol - fromCol);

  // Knight must move in an L shape
  if (
    !(
      (rowDiff === 2 && colDiff === 1) ||
      (rowDiff === 1 && colDiff === 2)
    )
  ) {
    return false;
  }

  const piece = board[fromRow][fromCol];
  const destination = board[toRow][toCol];

  // Empty square
  if (destination === "") return true;

  // Enemy piece
  return isEnemyPiece(piece, destination);
}