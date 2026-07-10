import { board, state } from "./state.js";
import { renderBoard } from "./board.js";
import { isValidMove } from "./moves.js";
import { getPiece, getPieceColor } from "./utils.js";
import { getLegalMoves } from "./legalMoves.js";
import { highlightMoves, clearHighlights } from "./board.js";
import { isKingInCheck } from "./check.js";
import { setStatus, clearStatus } from "./status.js";

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
    selectPiece(row, col, elem);
    return;
  }

  // Click same square again
  if (state.selected.row === row && state.selected.col === col) {
    unselectPiece();
    return;
  }

  // Click another occupied square -> select that piece instead
  if (board[row][col] !== "") {
    const pieceColor = getPieceColor(board[row][col]);

    // Clicking your own piece changes the selection
    if (pieceColor === state.turn) {
      unselectPiece();

      selectPiece(row, col, elem);
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
  if (!tryMove(state.selected.row, state.selected.col, row, col)) {
    return;
  }

  // Move piece
  board[row][col] = piece;
  board[state.selected.row][state.selected.col] = "";

  renderBoard();

  unselectPiece();

  changeTurn();
  const opponent = state.turn;

  if (isKingInCheck(opponent)) {
    setStatus("Black is in check!");
  } else {
    clearStatus();
  }
}

export function changeTurn() {
  state.turn = state.turn === "white" ? "black" : "white";

  turnText.innerHTML =
    state.turn === "white" ? "⚪ White's Turn" : "⚫ Black's Turn";
}

function selectPiece(row, col, elem) {
  clearHighlights();

  state.selected = { row, col };

  const moves = getLegalMoves(row, col);
  highlightMoves(moves);

  elem.classList.add("selected");
}

function unselectPiece() {
  if (!state.selected) return;

  document
    .getElementById(`td-${state.selected.row}${state.selected.col}`)
    .classList.remove("selected");

  clearHighlights();

  state.selected = null;
}

function tryMove(fromRow, fromCol, toRow, toCol) {
  const piece = board[fromRow][fromCol];
  const capturedPiece = board[toRow][toCol];

  // Make temporary move
  board[toRow][toCol] = piece;
  board[fromRow][fromCol] = "";

  const color = getPieceColor(piece);

  // Check if own king is attacked
  if (isKingInCheck(color)) {
    // Undo move
    board[fromRow][fromCol] = piece;
    board[toRow][toCol] = capturedPiece;

    setStatus("Illegal move! Your king is in check.");

    renderBoard();

    return false;
  }

  clearStatus();

  return true;
}
