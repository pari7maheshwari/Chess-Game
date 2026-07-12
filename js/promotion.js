export function promotePawn(board, row, col) {
  if (board[row][col] === "wp" && row === 0) {
    board[row][col] = "wq";
  }

  if (board[row][col] === "bp" && row === 7) {
    board[row][col] = "bq";
  }
}