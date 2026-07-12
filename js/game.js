import { board, state } from "./state.js";
import { renderBoard } from "./board.js";
import { isValidMove } from "./moves.js";
import { getPiece, getPieceColor } from "./utils.js";
import { getLegalMoves } from "./legalMoves.js";
import { highlightMoves, clearHighlights } from "./board.js";
import { isKingInCheck } from "./check.js";
import { setStatus, clearStatus } from "./status.js";
import { hasLegalMoves } from "./checkmate.js";
import { promotePawn } from "./promotion.js";
import { addCapturedPiece } from "./capture.js";
import { addMove } from "./history.js";
import { squareName } from "./utils.js";

const turnText = document.getElementById("turn");

export function movePiece(elem) {
  if (state.gameOver) {
    return;
  }
  const row = Number(elem.id[3]);
  const col = Number(elem.id[4]);
  // First click
  if (state.selected === null) {
    if (board[row][col] === "") return;

    const pieceColor = getPieceColor(board[row][col]);

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

  const piece = getPiece(state.selected.row, state.selected.col);
  const capturedPiece = board[row][col];

  if (!isValidMove(state.selected.row, state.selected.col, row, col)) {
    return;
  }
  if (!tryMove(state.selected.row, state.selected.col, row, col)) {
    return;
  }
  if (
    piece[1] === "p" &&
    board[row][col] === "" &&
    col !== state.selected.col
  ) {
    if (piece === "wp") {
      addCapturedPiece(board[row + 1][col]);
      board[row + 1][col] = "";
    } else {
      addCapturedPiece(board[row - 1][col]);
      board[row - 1][col] = "";
    }
  }
  // Move piece
  if (piece === "wk" && state.selected.col === 4 && col === 6) {
    board[7][5] = "wr";
    board[7][7] = "";
  }

  if (piece === "wk" && state.selected.col === 4 && col === 2) {
    board[7][3] = "wr";
    board[7][0] = "";
  }
  // Black king side castling
  if (piece === "bk" && state.selected.col === 4 && col === 6) {
    board[0][5] = "br";
    board[0][7] = "";
  }

  // Black queen side castling
  if (piece === "bk" && state.selected.col === 4 && col === 2) {
    board[0][3] = "br";
    board[0][0] = "";
  }
  board[row][col] = piece;
  board[state.selected.row][state.selected.col] = "";

  if (capturedPiece !== "") {
    addCapturedPiece(capturedPiece);
  }

  // Update castling flags
  if (piece === "wk") state.moved.wk = true;
  if (piece === "bk") state.moved.bk = true;

  if (piece === "wr") {
    if (state.selected.row === 7 && state.selected.col === 0) {
      state.moved.wra = true;
    }
    if (state.selected.row === 7 && state.selected.col === 7) {
      state.moved.wrh = true;
    }
  }

  if (piece === "br") {
    if (state.selected.row === 0 && state.selected.col === 0) {
      state.moved.bra = true;
    }
    if (state.selected.row === 0 && state.selected.col === 7) {
      state.moved.brh = true;
    }
  }

  const from = squareName(state.selected.row, state.selected.col);
  const to = squareName(row, col);

  addMove(`${piece} : ${from} → ${to}`);

  state.lastMove = {
    piece,
    fromRow: state.selected.row,
    fromCol: state.selected.col,
    toRow: row,
    toCol: col,
  };

  promotePawn(board, row, col);

  renderBoard();

  unselectPiece();

  changeTurn();

  const currentPlayer = state.turn;

  if (isKingInCheck(currentPlayer)) {
    if (!hasLegalMoves(currentPlayer)) {
      setStatus("♟ Checkmate! Game Over");
      state.gameOver = true;
    } else {
      setStatus("⚠ Check!");
    }
  } else {
    if (!hasLegalMoves(currentPlayer)) {
      setStatus("🤝 Draw! Stalemate");
      state.gameOver = true;
    } else {
      clearStatus();
    }
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

  // Temporary move
  board[toRow][toCol] = piece;
  board[fromRow][fromCol] = "";

  const color = getPieceColor(piece);
  const illegal = isKingInCheck(color);

  // Always restore the board
  board[fromRow][fromCol] = piece;
  board[toRow][toCol] = capturedPiece;

  if (illegal) {
    setStatus("Illegal move! Your king is in check.");
    return false;
  }

  clearStatus();
  return true;
}
