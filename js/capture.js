import { pieces } from "./pieces.js";

const whiteCaptured = document.getElementById("whiteCaptured");
const blackCaptured = document.getElementById("blackCaptured");

export function addCapturedPiece(piece) {
  if (!piece) return;

  if (piece[0] === "w") {
    // White piece was captured
    blackCaptured.innerHTML += " " + pieces[piece];
  } else {
    // Black piece was captured
    whiteCaptured.innerHTML += " " + pieces[piece];
  }
}

export function clearCapturedPieces() {
  whiteCaptured.innerHTML = "White Captured:";
  blackCaptured.innerHTML = "Black Captured:";
}