import { board } from "./state.js";
import { pieces } from "./pieces.js";

export function createBoard() {
  const table = document.getElementById("table");

  for (let i = 0; i < 8; i++) {
    const tr = document.createElement("tr");

    for (let j = 0; j < 8; j++) {
      const td = document.createElement("td");

      td.id = `td-${i}${j}`;

      if ((i + j) % 2 === 0) {
        td.classList.add("light");
        td.style.textShadow = "0 0 5px #000000";
      } else {
        td.classList.add("dark");
        td.style.textShadow = "0 0 5px #FFFFFF";
      }

      tr.appendChild(td);
    }

    table.appendChild(tr);
  }
}

export function renderBoard() {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const cell = document.getElementById(`td-${row}${col}`);
      const piece = board[row][col];

      cell.innerHTML = piece ? pieces[piece] : "";
    }
  }
}
