import { board, state } from "./state.js";
import { renderBoard } from "./board.js";
import { isValidMove } from "./moves.js";
import { getPiece, getPieceColor } from "./utils.js";

const turnText = document.getElementById("turn");

export function movePiece(elem) {
  console.log("Clicked:", elem.id);
  const row = Number(elem.id[3]);
  const col = Number(elem.id[4]);
  // First click
  if (state.selected === null) {
    if (board[row][col] === "") return;

    const pieceColor = getPieceColor(board[row][col]);

    console.log("Piece Color:", pieceColor);
    console.log("Current Turn:", state.turn);

    if (pieceColor !== state.turn) return;

    state.selected = {
      row,
      col,
    };

    elem.classList.add("selected");

    return;
  }

  // Click same square again
  if (state.selected.row === row && state.selected.col === col) {
    document
      .getElementById(`td-${state.selected.row}${state.selected.col}`)
      .classList.remove("selected");
    state.selected = null;
    return;
  }

  // Click another occupied square -> select that piece instead
  if (board[row][col] !== "") {
    const pieceColor = getPieceColor(board[row][col]);

    // Clicking your own piece changes the selection
    if (pieceColor === state.turn) {
      document
        .getElementById(`td-${state.selected.row}${state.selected.col}`)
        .classList.remove("selected");

      state.selected = { row, col };

      elem.classList.add("selected");

      return;
    }

    // Clicking an opponent piece -> continue to move validation
  }
  console.log("Selected:", state.selected);
  console.log("Moving piece...");
  const piece = getPiece(state.selected.row, state.selected.col);

  if (!isValidMove(state.selected.row, state.selected.col, row, col)) {
    return;
  }

  // Move piece
  board[row][col] = piece;
  board[state.selected.row][state.selected.col] = "";

  document
    .getElementById(`td-${state.selected.row}${state.selected.col}`)
    .classList.remove("selected");

  renderBoard();

  state.selected = null;

  changeTurn();
}

export function changeTurn() {
  state.turn = state.turn === "white" ? "black" : "white";

  turnText.innerHTML =
    state.turn === "white" ? "⚪ White's Turn" : "⚫ Black's Turn";
}
