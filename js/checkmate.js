import { board } from "./state.js";
import { getPieceColor } from "./utils.js";
import { isValidMove } from "./moves.js";
import { isKingInCheck } from "./check.js";


export function hasLegalMoves(color) {

  for (let fromRow = 0; fromRow < 8; fromRow++) {
    for (let fromCol = 0; fromCol < 8; fromCol++) {

      const piece = board[fromRow][fromCol];

      if (piece === "") continue;

      if (getPieceColor(piece) !== color) continue;


      for (let toRow = 0; toRow < 8; toRow++) {
        for (let toCol = 0; toCol < 8; toCol++) {

          if (!isValidMove(fromRow, fromCol, toRow, toCol)) {
            continue;
          }


          // save old position
          const capturedPiece = board[toRow][toCol];


          // simulate move
          board[toRow][toCol] = piece;
          board[fromRow][fromCol] = "";


          const stillInCheck = isKingInCheck(color);


          // undo move
          board[fromRow][fromCol] = piece;
          board[toRow][toCol] = capturedPiece;


          if (!stillInCheck) {
            return true;
          }
        }
      }
    }
  }


  return false;
}