const cells = document.querySelectorAll('.cell');
const restartBtn = document.getElementById('restart-btn');
const status = document.getElementById('status');
const gameBoard = document.getElementById('game-board');
let currentPlayer = 'X';

// Função para iniciar o jogo
function startGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleClick);
    });
    currentPlayer = 'X'; // Define o jogador inicial
    status.textContent = `Jogador ${currentPlayer}'s vez`;
    gameBoard.classList.remove('win'); // Remove a classe de animação, se estiver presente
}

// Função para lidar com o clique nas células
function handleClick(event) {
    const cell = event.target;
    if (cell.textContent === '' && !checkWinner() && !isBoardFull()) {
        cell.textContent = currentPlayer;
        if (checkWinner()) {
            status.textContent = `Jogador ${currentPlayer} ganhou!`;
            gameBoard.classList.add('win'); // Adiciona a classe de animação
            cells.forEach(cell => cell.removeEventListener('click', handleClick));
        } else if (isBoardFull()) {
            status.textContent = 'Empate!';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.textContent = `Jogador ${currentPlayer}'s vez`;
        }
    }
}

// Função para verificar se alguém ganhou
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], // Linha superior
        [3, 4, 5], // Linha do meio
        [6, 7, 8], // Linha inferior
        [0, 3, 6], // Coluna esquerda
        [1, 4, 7], // Coluna do meio
        [2, 5, 8], // Coluna direita
        [0, 4, 8], // Diagonal principal
        [2, 4, 6]  // Diagonal secundária
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent;
    });
}

// Função para verificar se o tabuleiro está cheio
function isBoardFull() {
    return [...cells].every(cell => cell.textContent);
}

// Função para reiniciar o jogo
function restartGame() {
    startGame();
}

// Inicia o jogo quando a página é carregada
startGame();

// Adiciona o evento de clique ao botão de reinício
restartBtn.addEventListener('click', restartGame);
