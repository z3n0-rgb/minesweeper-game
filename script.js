class MinesweeperGame {
    constructor() {
        this.board = [];
        this.revealed = [];
        this.flagged = [];
        this.gameOver = false;
        this.gameWon = false;
        this.startTime = null;
        this.timerInterval = null;
        this.mines = 10;
        this.rows = 10;
        this.cols = 10;
        
        this.stats = {
            bestTime: localStorage.getItem('bestTime') || null,
            wins: parseInt(localStorage.getItem('wins')) || 0,
            losses: parseInt(localStorage.getItem('losses')) || 0,
            currentStreak: parseInt(localStorage.getItem('currentStreak')) || 0,
            longestStreak: parseInt(localStorage.getItem('longestStreak')) || 0
        };
        
        this.init();
    }
    
    init() {
        this.createBoard();
        this.renderBoard();
        this.updateStats();
        this.bindEvents();
    }
    
    createBoard() {
        this.board = [];
        this.revealed = [];
        this.flagged = [];
        
        for (let row = 0; row < this.rows; row++) {
            this.board[row] = [];
            this.revealed[row] = [];
            this.flagged[row] = [];
            for (let col = 0; col < this.cols; col++) {
                this.board[row][col] = 0;
                this.revealed[row][col] = false;
                this.flagged[row][col] = false;
            }
        }
        
        this.placeMines();
        this.calculateNumbers();
    }
    
    placeMines() {
        let minesPlaced = 0;
        while (minesPlaced < this.mines) {
            const row = Math.floor(Math.random() * this.rows);
            const col = Math.floor(Math.random() * this.cols);
            
            if (this.board[row][col] !== -1) {
                this.board[row][col] = -1;
                minesPlaced++;
            }
        }
    }
    
    calculateNumbers() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (this.board[row][col] === -1) continue;
                
                let count = 0;
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        if (i === 0 && j === 0) continue;
                        const newRow = row + i;
                        const newCol = col + j;
                        
                        if (newRow >= 0 && newRow < this.rows && 
                            newCol >= 0 && newCol < this.cols &&
                            this.board[newRow][newCol] === -1) {
                            count++;
                        }
                    }
                }
                this.board[row][col] = count;
            }
        }
    }
    
    renderBoard() {
        const gameBoard = document.getElementById('game-board');
        gameBoard.innerHTML = '';
        
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const cell = document.createElement('button');
                cell.className = 'cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                
                if (this.revealed[row][col]) {
                    cell.classList.add('revealed');
                    if (this.board[row][col] === -1) {
                        cell.classList.add('mine');
                    } else if (this.board[row][col] > 0) {
                        cell.textContent = this.board[row][col];
                        cell.classList.add(`number-${this.board[row][col]}`);
                    }
                }
                
                if (this.flagged[row][col]) {
                    cell.classList.add('flagged');
                }
                
                gameBoard.appendChild(cell);
            }
        }
    }
    
    bindEvents() {
        const gameBoard = document.getElementById('game-board');
        const newGameBtn = document.getElementById('new-game');
        
        gameBoard.addEventListener('click', (e) => {
            if (this.gameOver) return;
            
            const cell = e.target;
            if (!cell.classList.contains('cell')) return;
            
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            
            if (!this.revealed[row][col] && !this.flagged[row][col]) {
                this.revealCell(row, col);
            }
        });
        
        gameBoard.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            if (this.gameOver) return;
            
            const cell = e.target;
            if (!cell.classList.contains('cell')) return;
            
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            
            if (!this.revealed[row][col]) {
                this.toggleFlag(row, col);
            }
        });
        
        newGameBtn.addEventListener('click', () => {
            this.resetGame();
        });
    }
    
    revealCell(row, col) {
        if (this.revealed[row][col] || this.flagged[row][col]) return;
        
        this.revealed[row][col] = true;
        
        if (this.board[row][col] === -1) {
            this.gameOver = true;
            this.revealAllMines();
            this.endGame(false);
        } else if (this.board[row][col] === 0) {
            this.revealAdjacentEmptyCells(row, col);
        }
        
        this.renderBoard();
        
        if (this.checkWin()) {
            this.gameOver = true;
            this.gameWon = true;
            this.endGame(true);
        }
    }
    
    revealAdjacentEmptyCells(row, col) {
        const stack = [[row, col]];
        
        while (stack.length > 0) {
            const [r, c] = stack.pop();
            
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    const newRow = r + i;
                    const newCol = c + j;
                    
                    if (newRow >= 0 && newRow < this.rows && 
                        newCol >= 0 && newCol < this.cols &&
                        !this.revealed[newRow][newCol] &&
                        !this.flagged[newRow][newCol]) {
                        
                        this.revealed[newRow][newCol] = true;
                        
                        if (this.board[newRow][newCol] === 0) {
                            stack.push([newRow, newCol]);
                        }
                    }
                }
            }
        }
    }
    
    toggleFlag(row, col) {
        if (this.revealed[row][col]) return;
        
        this.flagged[row][col] = !this.flagged[row][col];
        this.renderBoard();
    }
    
    revealAllMines() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (this.board[row][col] === -1) {
                    this.revealed[row][col] = true;
                }
            }
        }
    }
    
    checkWin() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (this.board[row][col] !== -1 && !this.revealed[row][col]) {
                    return false;
                }
            }
        }
        return true;
    }
    
    startTimer() {
        this.startTime = Date.now();
        this.timerInterval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            document.getElementById('timer').textContent = elapsed;
        }, 1000);
    }
    
    stopTimer() {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
    }
    
    resetGame() {
        this.stopTimer();
        document.getElementById('timer').textContent = '0';
        document.getElementById('mines-left').textContent = this.mines;
        
        this.gameOver = false;
        this.gameWon = false;
        this.startTime = null;
        
        this.createBoard();
        this.renderBoard();
        this.startTimer();
    }
    
    endGame(won) {
        this.stopTimer();
        
        if (won) {
            const time = Math.floor((Date.now() - this.startTime) / 1000);
            this.updateScore(time);
            this.animateWin();
        } else {
            this.animateLoss();
        }
    }
    
    updateScore(time) {
        if (!this.stats.bestTime || time < this.stats.bestTime) {
            this.stats.bestTime = time;
            localStorage.setItem('bestTime', time);
            document.getElementById('best-time').textContent = time;
        }
        
        if (this.gameWon) {
            this.stats.wins++;
            this.stats.currentStreak++;
            if (this.stats.currentStreak > this.stats.longestStreak) {
                this.stats.longestStreak = this.stats.currentStreak;
                localStorage.setItem('longestStreak', this.stats.longestStreak);
            }
        } else {
            this.stats.losses++;
            this.stats.currentStreak = 0;
        }
        
        localStorage.setItem('wins', this.stats.wins);
        localStorage.setItem('losses', this.stats.losses);
        localStorage.setItem('currentStreak', this.stats.currentStreak);
        
        this.updateStats();
    }
    
    updateStats() {
        document.getElementById('best-time').textContent = 
            this.stats.bestTime ? this.stats.bestTime : '--';
        
        const totalGames = this.stats.wins + this.stats.losses;
        const winRate = totalGames > 0 ? 
            Math.round((this.stats.wins / totalGames) * 100) : 0;
        document.getElementById('win-rate').textContent = `${winRate}%`;
        
        document.getElementById('streak').textContent = this.stats.currentStreak;
    }
    
    animateWin() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell, index) => {
            setTimeout(() => {
                cell.style.animation = 'winSparkle 0.5s ease-out';
                cell.style.animationFillMode = 'forwards';
            }, index * 20);
        });
    }
    
    animateLoss() {
        const cells = document.querySelectorAll('.cell.mine');
        cells.forEach((cell, index) => {
            setTimeout(() => {
                cell.style.animation = 'explode 0.6s ease-out';
                cell.style.animationFillMode = 'forwards';
            }, index * 50);
        });
    }
}

const game = new MinesweeperGame();