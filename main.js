
const board = document.getElementById("board");
const winnerDisplay = document.getElementById("winner");
let cells = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

function createBoard() {
    board.innerHTML = "";
    cells.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.dataset.index = index;
        cellElement.textContent = cell;
        cellElement.addEventListener("click", handleClick);
        board.appendChild(cellElement);
    });
}

function handleClick(event) {
    const index = event.target.dataset.index;
    if (cells[index] === "" && gameActive) {
        cells[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            winnerDisplay.textContent = `Winner: ${cells[a]}`;
            gameActive = false;
            return;
        }
    }

    if (!cells.includes("")) {
        winnerDisplay.textContent = "It's a Draw!";
        gameActive = false;
    }
}

function resetGame() {
    cells = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    winnerDisplay.textContent = "";
    createBoard();
}

createBoard();
