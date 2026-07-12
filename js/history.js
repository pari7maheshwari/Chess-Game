const history = document.getElementById("moveHistory");

let moveNumber = 1;

export function addMove(text) {
  const move = document.createElement("div");
  move.className = "move";
  move.textContent = `${moveNumber}. ${text}`;

  history.appendChild(move);

  history.scrollTop = history.scrollHeight;

  moveNumber++;
}

export function clearHistory() {
  history.innerHTML = "";
  moveNumber = 1;
}