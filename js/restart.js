import { board, initialBoard, state } from "./state.js";
import { renderBoard } from "./board.js";
import { clearCapturedPieces } from "./capture.js";
import { clearStatus } from "./status.js";
import { clearHistory } from "./history.js";

const turnText = document.getElementById("turn");

export function restartGame() {
  // Reset board
  clearHistory();
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      board[i][j] = initialBoard[i][j];
    }
  }

  // Reset state
  state.selected = null;
  state.turn = "white";
  state.gameOver = false;
  state.lastMove = null;

  state.moved = {
    wk: false,
    wra: false,
    wrh: false,
    bk: false,
    bra: false,
    brh: false,
  };

  clearCapturedPieces();
  clearStatus();

  turnText.innerHTML = "⚪ White's Turn";

  renderBoard();
}