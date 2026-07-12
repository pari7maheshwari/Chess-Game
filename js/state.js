export const initialBoard = [
  ["br", "bn", "bb", "bq", "bk", "bb", "bn", "br"],
  ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"],
  ["wr", "wn", "wb", "wq", "wk", "wb", "wn", "wr"],
];

export const board = structuredClone(initialBoard);
// or JSON.parse(JSON.stringify(initialBoard))

export const state = {
  selected: null,
  turn: "white",
  gameOver: false,

  moved: {
    wk: false,
    wra: false,
    wrh: false,
    bk: false,
    bra: false,
    brh: false,
  },

  lastMove: null,
};