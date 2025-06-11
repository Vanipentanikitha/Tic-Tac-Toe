const board = document.getElementById("board");
const statusText = document.getElementById("status");

let currentPlayer = "X";
let gameActive = true;
let cells = Array(9).fill("");

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columns
  [0, 4, 8],
  [2, 4, 6], // Diagonals
];

function checkWinner() {
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (cells[a] && cells[a] === cells[b] && cells[b] === cells[c]) {
      statusText.textContent = `Player ${cells[a]} wins! 🎉`;
      gameActive = false;
      return;
    }
  }
  if (!cells.includes("")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
  }
}

function handleCellClick(index) {
  if (!gameActive || cells[index]) return;

  cells[index] = currentPlayer;
  renderBoard();
  checkWinner();

  if (gameActive) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function renderBoard() {
  board.innerHTML = "";
  cells.forEach((cell, index) => {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.textContent = cell;
    div.addEventListener("click", () => handleCellClick(index));
    board.appendChild(div);
  });
}

function resetGame() {
  currentPlayer = "X";
  gameActive = true;
  cells = Array(9).fill("");
  statusText.textContent = "Player X's turn";
  renderBoard();
}

renderBoard();
