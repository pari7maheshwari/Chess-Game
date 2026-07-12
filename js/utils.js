import { board } from "./state.js";

export function getPieceColor(piece) {
  if (piece === "") return null;

  return piece[0] === "w" ? "white" : "black";
}

export function getPiece(row, col) {
  return board[row][col];
}

export function isEnemyPiece(piece1, piece2) {
  if (piece1 === "" || piece2 === "") return false;

  return piece1[0] !== piece2[0];
}

export function isPathClear(fromRow, fromCol, toRow, toCol) {
  const rowStep = Math.sign(toRow - fromRow);
  const colStep = Math.sign(toCol - fromCol);

  let row = fromRow + rowStep;
  let col = fromCol + colStep;

  while (row !== toRow || col !== toCol) {
    if (board[row][col] !== "") {
      return false;
    }

    row += rowStep;
    col += colStep;
  }

  return true;
}

export function squareName(row, col) {
    const files = "abcdefgh";
    return files[col] + (8 - row);
}