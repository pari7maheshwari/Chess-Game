import { isValidMove } from "./moves.js";

export function getLegalMoves(fromRow, fromCol) {
  const moves = [];

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (isValidMove(fromRow, fromCol, row, col)) {
        moves.push({ row, col });
      }
    }
  }

  return moves;
}