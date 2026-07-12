import { createBoard, renderBoard } from "./board.js";
import { movePiece } from "./game.js";
import { restartGame } from "./restart.js";

createBoard();
renderBoard();

for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
        document
            .getElementById(`td-${row}${col}`)
            .addEventListener("click", function () {
                movePiece(this);
            });
    }
}

document
  .getElementById("restartBtn")
  .addEventListener("click", restartGame);