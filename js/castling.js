import { board, state } from "./state.js";


export function isValidCastle(
  fromRow,
  fromCol,
  toRow,
  toCol,
  piece
) {

  // White king
  if (piece === "wk" && fromRow === 7 && fromCol === 4) {


    // King side castle
    if (
      toRow === 7 &&
      toCol === 6 &&
      !state.moved.wk &&
      !state.moved.wrh &&
      board[7][5] === "" &&
      board[7][6] === ""
    ) {
      return true;
    }


    // Queen side castle
    if (
      toRow === 7 &&
      toCol === 2 &&
      !state.moved.wk &&
      !state.moved.wra &&
      board[7][1] === "" &&
      board[7][2] === "" &&
      board[7][3] === ""
    ) {
      return true;
    }
  }



  // Black king
  if (piece === "bk" && fromRow === 0 && fromCol === 4) {


    // King side
    if (
      toRow === 0 &&
      toCol === 6 &&
      !state.moved.bk &&
      !state.moved.brh &&
      board[0][5] === "" &&
      board[0][6] === ""
    ) {
      return true;
    }


    // Queen side
    if (
      toRow === 0 &&
      toCol === 2 &&
      !state.moved.bk &&
      !state.moved.bra &&
      board[0][1] === "" &&
      board[0][2] === "" &&
      board[0][3] === ""
    ) {
      return true;
    }
  }


  return false;
}