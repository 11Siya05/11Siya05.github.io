const gameBoard = document.getElementById("game");
const restartButton = document.getElementById("restart");
const messageDisplay = document.getElementById("message");
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;
let startingPlayer = 'X'; // Variable to track the starting player

// Create the grid
function createGrid() {
    board.forEach((cell, index) => {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('cell', 'bg-white', 'border', 'border-gray-300', 'flex', 'items-center', 'justify-center');
        cellDiv.setAttribute('data-index', index);
        cellDiv.addEventListener('click', handleCellClick);
        gameBoard.appendChild(cellDiv);
    });
}

// Handle cell click
function handleCellClick(event) {
    const clickedCell = event.target;
    const cellIndex = clickedCell.getAttribute('data-index');

    if (board[cellIndex] !== '' || !isGameActive) {
        return; // Ignore click if cell is already filled or game is not active
    }

    // Update board
    board[cellIndex] = currentPlayer;
    clickedCell.classList.add(currentPlayer);
    clickedCell.innerText = currentPlayer;

    // Check for win or draw
    checkWin();
}

// Check for win or draw conditions
function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            displayMessage(`Player ${currentPlayer} wins!`);
            isGameActive = false;
            return;
        }
    }

    if (!board.includes('')) {
        displayMessage("It's a draw!");
        isGameActive = false;
    }

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Display message
function displayMessage(message) {
    messageDisplay.innerText = message;
}

// Restart game
function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    messageDisplay.innerText = '';
    gameBoard.innerHTML = ''; // Clear the game board
    createGrid(); // Recreate the grid

    // Switch starting player for the next game
    currentPlayer = startingPlayer; // Set the current player to the starting player
    startingPlayer = startingPlayer === 'X' ? 'O' : 'X'; // Toggle the starting player
}

// Event listeners
restartButton.addEventListener('click', restartGame);
createGrid(); // Initialize the game
