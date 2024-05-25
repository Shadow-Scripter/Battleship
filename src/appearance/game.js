import StartScreen from "./startScreen";

class Game {
    constructor (leftBoardLogic, rightBoardLogic, player1, player2) {
        this.leftBoardLogic = leftBoardLogic;
        this.rightBoardLogic = rightBoardLogic;
        this.player1 = player1;
        this.player2 = player2;

        const body = document.querySelector('body');

        this.gameDiv = document.createElement('div');

        this.leftBoard = document.createElement('div');
        this.rightBoard = document.createElement('div');

        this.leftInput = document.createElement('div');
        this.rightInput = document.createElement('div');

        this.gameDiv.setAttribute('id', 'game-container');
        
        this.leftInput.setAttribute('id', 'left-input');
        this.rightInput.setAttribute('id', 'right-input');
        
        this.leftBoard.setAttribute('id', 'left-board');
        this.rightBoard.setAttribute('id', 'right-board');
        
        this.gameDiv.appendChild(this.leftInput);
        this.gameDiv.appendChild(this.rightInput);

        this.start();
        
        body.appendChild(this.gameDiv);
    }

    start() {
        const startContainerHide = document.getElementById('start-screen-container');
        startContainerHide.parentNode.removeChild(startContainerHide);

        this.displayPlayerName();
        this.displayLeftBoard();

        let isBot = document.getElementById('player-vs-bot');
        if (!isBot) {
            isBot = false;
        } else {
            isBot = true;
        }

        this.displayRightBoard(isBot);

        if (this.player2.name !== 'Computer') {
            this.createLeftHideShowBtn();
            this.createRightHideShowBtn();
        }
    }

    displayPlayerName () {
        const leftPlayerName = document.createElement('div'); 
        const rightPlayerName = document.createElement('div'); 

        leftPlayerName.classList.add('player-name');
        rightPlayerName.classList.add('player-name');

        leftPlayerName.textContent = this.player1.name;
        rightPlayerName.textContent = this.player2.name;

        this.leftInput.appendChild(leftPlayerName);
        this.rightInput.appendChild(rightPlayerName);
    }

    displayLeftBoard () {
        this.leftBoard.innerHTML = ''; // Clear previous board display

        this.leftBoard.classList.add('active-move');
        this.leftBoard.style.pointerEvents = 'none';

        if (this.player2.name === 'Optimus Prime') {
            this.leftBoard.style.pointerEvents = 'none';
        }
        
        this.leftBoardLogic.board.forEach((row, rowIndex) => {
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('board-row');
    
            row.forEach((cell, colIndex) => {
                const cellDiv = document.createElement('div');
                cellDiv.classList.add('board-cell');
    
                if (cell) {
                    cellDiv.classList.add('ship-cell'); // Ship is present
                }

                if (this.player2.name !== 'Optimus Prime') {
                    cellDiv.classList.add('disable-all-board');
                }

                cellDiv.addEventListener('click', (clickedCell) => {
                    

                    if (this.leftBoardLogic.receiveAttack(rowIndex, colIndex)) {
                        cellDiv.classList.remove('ship-cell');
                        cellDiv.classList.add('ship-hit');
                        cellDiv.textContent = 'x';
                    }

                    this.changeTurnToRightPlayer(clickedCell);

                    this.leftBoardLogic.missedShots.forEach((missedRow, missedRowIndex) => {
                        missedRow.forEach((missedCell, missedColIndex) => {
                            if (missedCell) {
                                const missedCellDiv = this.leftBoard.querySelector(`.board-row:nth-child(${missedRowIndex + 1}) .board-cell:nth-child(${missedColIndex + 1})`);
                                if (missedCellDiv) {
                                    missedCellDiv.classList.remove('disable-all-board');
                                    missedCellDiv.classList.add('missed-cell');
                                }
                            }
                        });
                    });

                    if (this.leftBoardLogic.missedShots[rowIndex][colIndex]) {
                        cellDiv.classList.add('missed-cell'); // Missed shot
                    }

                    cellDiv.classList.remove('disable-all-board');

                    if (this.leftBoardLogic.isGameOver()) {
                        this.END(this.player2.name);
                    }
                });
    
                rowDiv.appendChild(cellDiv);
            });
    
            this.leftBoard.appendChild(rowDiv);
        });

        this.leftInput.appendChild(this.leftBoard);
    }

    displayRightBoard (isBot) {
        this.rightBoard.innerHTML = ''; // Clear previous board display
        
        if (isBot) {
            this.rightBoardLogic.placeShipRandomly();
        }
        
        this.rightBoard.classList.add('not-active-move');

        this.rightBoardLogic.board.forEach((row, rowIndex) => {
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('board-row');

            row.forEach((cell, colIndex) => {
                const cellDiv = document.createElement('div');
                cellDiv.classList.add('board-cell');
    
                if (cell) {
                    cellDiv.classList.add('ship-cell'); // Ship is present
                }

                cellDiv.classList.add('disable-all-board');

                cellDiv.addEventListener('click', (cellClicked) => {
                    if (this.rightBoardLogic.receiveAttack(rowIndex, colIndex)) {
                        cellDiv.classList.remove('ship-cell');
                        cellDiv.classList.add('ship-hit');
                        cellDiv.textContent = 'x';
                    }

                    this.changeTurnToLeftPlayer(cellClicked, rowIndex, colIndex);

                    this.rightBoardLogic.missedShots.forEach((missedRow, missedRowIndex) => {
                        missedRow.forEach((missedCell, missedColIndex) => {
                            if (missedCell) {
                                const missedCellDiv = this.rightBoard.querySelector(`.board-row:nth-child(${missedRowIndex + 1}) .board-cell:nth-child(${missedColIndex + 1})`);
                                if (missedCellDiv) {
                                    missedCellDiv.classList.remove('disable-all-board');
                                    missedCellDiv.classList.add('missed-cell');
                                }
                            }
                        });
                    });

                    if (this.rightBoardLogic.missedShots[rowIndex][colIndex]) {
                        cellDiv.classList.add('missed-cell'); // Missed shot
                    }

                    cellDiv.classList.remove('disable-all-board');

                    if (this.rightBoardLogic.isGameOver()) {
                        this.END(this.player1.name);
                    }
                });
    
                rowDiv.appendChild(cellDiv);
            });
    
            this.rightBoard.appendChild(rowDiv);
        });

        this.rightInput.appendChild(this.rightBoard);
    }

    createLeftHideShowBtn () {
        const leftShowBtn = document.createElement('button');
        leftShowBtn.setAttribute('id', 'left-show-btn');
        leftShowBtn.innerText = 'Show';

        leftShowBtn.addEventListener('click', () => {
            const cellDiv = this.leftBoard.querySelectorAll('.board-cell');
            const isShowing = leftShowBtn.innerText === 'Show';

            cellDiv.forEach(cell => {
                if (isShowing) {
                    cell.classList.remove('disable-all-board'); // shows cells
                } else {
                    if (!(cell.classList.contains('missed-cell') || cell.classList.contains('ship-hit'))) {
                        cell.classList.add('disable-all-board'); // hides cells
                    }
                }
            });

            leftShowBtn.innerText = isShowing ? 'Hide' : 'Show';
        })


        this.leftInput.appendChild(leftShowBtn);
    }

    createRightHideShowBtn () {
        const rightShowBtn = document.createElement('button');
        rightShowBtn.setAttribute('id', 'right-show-btn');
        rightShowBtn.innerText = 'Show';

        rightShowBtn.addEventListener('click', () => {
            const cellDiv = this.rightBoard.querySelectorAll('.board-cell');
            const isShowing = rightShowBtn.innerText === 'Show';

            cellDiv.forEach(cell => {
                if (isShowing) {
                    cell.classList.remove('disable-all-board'); // shows cells
                } else {
                    if (!(cell.classList.contains('missed-cell') || cell.classList.contains('ship-hit'))) {
                        cell.classList.add('disable-all-board'); // hides cells
                    }
                }
            });

            rightShowBtn.innerText = isShowing ? 'Hide' : 'Show';
        });

        this.rightInput.appendChild(rightShowBtn);
    }

    changeTurnToRightPlayer (clickedCell) {
        if (clickedCell.target.classList.contains('ship-hit') ||
            clickedCell.target.classList.contains('missed-cell')) {
            return; // Do not change turn if cell was already clicked
        }

        this.rightBoard.style.pointerEvents = 'auto';
        this.leftBoard.style.pointerEvents = 'none';

        this.rightBoard.classList.remove('active-move');
        this.rightBoard.classList.add('not-active-move');
        
        this.leftBoard.classList.remove('not-active-move');
        this.leftBoard.classList.add('active-move');
    }

    changeTurnToLeftPlayer(clickedCell, rowIndex, colIndex) {
        if (clickedCell.target.classList.contains('ship-hit') ||
            clickedCell.target.classList.contains('missed-cell')) {
            return; // Do not change turn if cell was already clicked
        }
    
        if (this.player2.name !== 'Optimus Prime') {
            this.leftBoard.style.pointerEvents = 'auto';
        }
        this.rightBoard.style.pointerEvents = 'none';
    
        this.leftBoard.classList.remove('active-move');
        this.leftBoard.classList.add('not-active-move');
    
        this.rightBoard.classList.remove('not-active-move');
        this.rightBoard.classList.add('active-move');
    
        const continueBotAttack = () => {
            if (this.player2.name === 'Optimus Prime') {
                const attackResult = this.player2.randomAttack(this.leftBoardLogic);
                if (attackResult) {
                    const lastAttack = this.player2.attackedPositions[this.player2.attackedPositions.length - 1];
                    const [hitRow, hitCol] = lastAttack;
                    const clickedCell = this.leftBoard.querySelector(`.board-row:nth-child(${hitRow + 1}) .board-cell:nth-child(${hitCol + 1})`);
                    clickedCell.classList.remove('ship-cell');
                    clickedCell.classList.add('ship-hit');
                    clickedCell.textContent = 'x';
        
                    // If the last attack was a hit, continue attacking the adjacent cells
                    if (this.leftBoardLogic.board[hitRow][hitCol]) {
                        this.continueBotAttackAdjacent(hitRow, hitCol);
                    }
                    setTimeout(continueBotAttack, 1000); // Continue attacking after hitting a ship
                } else {
                    // Bot missed, stop attacking
                    const lastAttack = this.player2.attackedPositions[this.player2.attackedPositions.length - 1];
                    if (lastAttack) {
                        const [missedRow, missedCol] = lastAttack;
                        const clickedCell = this.leftBoard.querySelector(`.board-row:nth-child(${missedRow + 1}) .board-cell:nth-child(${missedCol + 1})`);
                        clickedCell.click(); // Trigger the click event to update the display
                    }
                }
            }
        };
        
        if (this.rightBoard.classList.contains('active-move')) {
            setTimeout(continueBotAttack, 1000); // Do not continue attacking if the rightBoard is not active
        } // Start bot attack
    }

    // Function to continue attacking adjacent cells after hitting a ship
    continueBotAttackAdjacent(row, col) {
        const adjacentOffsets = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // Up, Down, Left, Right
    
        // Iterate through each adjacent cell
        adjacentOffsets.forEach(offset => {
            const newRow = row + offset[0];
            const newCol = col + offset[1];
    
            // Check if the move is valid and hasn't been attacked yet
            if (this.leftBoardLogic.isMoveValid(newRow, newCol)) {
                const cell = this.leftBoard.querySelector(`.board-row:nth-child(${newRow + 1}) .board-cell:nth-child(${newCol + 1})`);
                if (cell) {
                    cell.click();

                    setTimeout(() => {
                        if (this.leftBoardLogic.board[newRow][newCol] && this.rightBoard.classList.contains('active-move')) {
                            this.continueAttackingShip(newRow, newCol);
                        }
                    }, 1000);
                }
            }
        });
    }

    continueAttackingShip(startRow, startCol) {
        const adjacentOffsets = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // Up, Down, Left, Right
        const visited = new Set(); // Keep track of visited cells
    
        // Initialize queue with initial cell
        const queue = [[startRow, startCol]];
    
        while (queue.length > 0) {
            const [r, c] = queue.shift(); // Dequeue the first cell from the queue
    
            // Iterate through adjacent cells
            adjacentOffsets.forEach(offset => {
                const newRow = r + offset[0];
                const newCol = c + offset[1];
    
                // Check if the move is valid and hasn't been visited yet
                if (this.leftBoardLogic.isMoveValid(newRow, newCol) && !visited.has(`${newRow},${newCol}`)) {
                    const cell = this.leftBoard.querySelector(`.board-row:nth-child(${newRow + 1}) .board-cell:nth-child(${newCol + 1})`);
                    if (cell) {
                        // Attack the cell
                        cell.click();
    
                        // If the attacked cell contains a ship, add to visited set and queue
                        if (this.leftBoardLogic.board[newRow][newCol]) {
                            visited.add(`${newRow},${newCol}`);
                            queue.push([newRow, newCol]);
                        }
                    }
                }
            });
        }
    }

    END (winnerName) {
        const endWindow = document.createElement('dialog');
        const winner = document.createElement('div');
        const restartBtn = document.createElement('button');

        endWindow.setAttribute('id', 'modal-window');
        winner.setAttribute('id', 'winner');
        restartBtn.setAttribute('id', 'restart');

        winner.textContent = `Player "${winnerName}" wins`;
        restartBtn.textContent = 'Restart';

        restartBtn.addEventListener('click', () => {
            endWindow.close();
            const body = document.querySelector('body');
            body.innerHTML = '';
            new StartScreen();
        })

        endWindow.appendChild(winner);
        endWindow.appendChild(restartBtn);

        this.gameDiv.appendChild(endWindow);
        
        endWindow.showModal();
    }
}

export default Game;