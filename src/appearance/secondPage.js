import leftArrow from '../assets/left-arrow.png';
import { createBackOrNextButton } from './hideDisplayPages';
import GameBoard from '../factories/Gameboard';
import Player from '../factories/Player';
import Game from './game';


class SecondPage {
    constructor () {
        this.startMain = document.getElementById('start-screen-container');

        this.leftBoard = document.createElement('div');
        this.rightBoard = document.createElement('div');

        this.leftBoardLogic = new GameBoard();
        this.rightBoardLogic = new GameBoard();

        this.player1 = new Player();
        this.player2 = new Player();

        this.inputs = document.createElement('div');
        this.leftInput = document.createElement('div');
        this.rightInput = document.createElement('div');
        
        this.inputs.setAttribute('id', 'inputs');
        this.leftInput.setAttribute('id', 'left-input');
        this.rightInput.setAttribute('id', 'right-input');
        
        this.leftBoard.setAttribute('id', 'left-board');
        this.rightBoard.setAttribute('id', 'right-board');

        this.startMain.appendChild(this.inputs);

        this.generateSecondStartPage();
    }

    generateSecondStartPage() {
        createBackOrNextButton(leftArrow);
    }

    generateNameInput (playerVsBot) {
        this.inputs.innerHTML = '';
        this.leftInput.innerHTML = '';
        this.rightInput.innerHTML = '';

        let player1;
        let player2;

        if (playerVsBot === 'player-vs-player') {
            player1 = this.#createNameInput('player1');
            player2 = this.#createNameInput('player2');
        } else if (playerVsBot === 'player-vs-bot') {
            player1 = this.#createNameInput('player1');
            player2 = this.#createNameInput('bot');
        }

        player1.classList.add('active-player-input');

        this.leftInput.appendChild(player1);
        this.rightInput.appendChild(player2);

        this.inputs.appendChild(this.leftInput);
        this.inputs.appendChild(this.rightInput);
    }

    displayGameBoard () {
        const player2 = document.getElementById('player2-input');

        this.displayLeftBoard();
        this.displayRightBoard(player2 === null);
        
        if (!player2) {
            const rightBoard = document.getElementById('right-board');
            const rightBoardCells = rightBoard.querySelectorAll('.board-cell');
            rightBoardCells.forEach(cell => {
                cell.classList.add('disable-board');
            });
        }

        const activePlayerInput = document.querySelector('.active-player-input').id;
        
        if (activePlayerInput === 'player2-input') {
            let leftBoard = document.getElementById('left-input');
            const leftBoardCells = leftBoard.querySelectorAll('.board-cell');
            leftBoardCells.forEach(cell => {
                cell.classList.add('disable-board');
            });
        }
    }

    displayButtons () {
        const btnContainer = document.createElement('div');
        btnContainer.classList.add('buttons');

        const activePlayerInput = document.querySelector('.active-player-input').id;
        let currentBoard = document.getElementById('left-input');
        
        if (activePlayerInput === 'player2-input') {
            currentBoard.removeChild(currentBoard.querySelector('.buttons'));
            currentBoard = document.getElementById('right-input');
        }

        const random = this.createRandomBtn();
        const done = this.createDoneBtn();
        const clear = this.createClearBtn();

        btnContainer.appendChild(random);
        btnContainer.appendChild(done);
        btnContainer.appendChild(clear);

        currentBoard.appendChild(btnContainer);
    }

    createRandomBtn () {
        const random = document.createElement('button');
        random.classList.add('random');
        random.textContent = 'RANDOM';

        random.addEventListener('click', () => {
            const activePlayerInput = document.querySelector('.active-player-input').id;

            if (activePlayerInput === 'player1-input') {
                this.leftBoardLogic.placeShipRandomly();
            } else if (activePlayerInput === 'player2-input') {
                this.rightBoardLogic.placeShipRandomly();
            }

            this.displayGameBoard();
        })

        return random
    }

    createDoneBtn () {
        const done = document.createElement('button');
        done.classList.add('done');
        done.textContent = 'DONE';

        done.addEventListener('click', () => {
            const  activePlayerInput = document.querySelector('.active-player-input').id;

            if (activePlayerInput === 'player1-input') {
                if (!this.leftBoardLogic.isEmpty()) {
                    const player2Active = document.getElementById('player2-input');
                    
                    if (!player2Active) {
                        const leftInput = document.getElementById('left-input');
                        leftInput.removeChild(leftInput.querySelector('.buttons'));
                        this.startGame();
                        return true;
                    }

                    const notActivePlayerInput = document.getElementById(activePlayerInput);
                    notActivePlayerInput.classList.remove('active-player-input');

                    player2Active.classList.add('active-player-input');

                    this.displayButtons();
                    this.displayGameBoard();
                }
            } else if (activePlayerInput === 'player2-input') {
                if (!this.rightBoardLogic.isEmpty()) {
                    const rightInput = document.getElementById('right-input');
                    rightInput.removeChild(rightInput.querySelector('.buttons'));
                    this.startGame();
                }
            }
        })

        return done;
    }

    createClearBtn () {
        const clear = document.createElement('button');
        clear.classList.add('clear');
        clear.textContent = 'CLEAR';

        clear.addEventListener('click', () => {
            const  activePlayerInput = document.querySelector('.active-player-input').id;

            if (activePlayerInput === 'player1-input') {
                this.leftBoardLogic.board = []
                this.leftBoardLogic.init();
            } else if (activePlayerInput === 'player2-input') {
                this.rightBoardLogic.board = []
                this.rightBoardLogic.init();
            }

            this.displayGameBoard();
        })

        return clear;
    }

    displayLeftBoard() {
        this.leftBoard.innerHTML = ''; // Clear previous board display
        
        this.leftBoardLogic.board.forEach((row, rowIndex) => {
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('board-row');
    
            row.forEach((cell, colIndex) => {
                const cellDiv = document.createElement('div');
                cellDiv.classList.add('board-cell');
    
                if (cell) {
                    cellDiv.classList.add('ship-cell'); // Ship is present
                } else if (this.leftBoardLogic.missedShots[rowIndex][colIndex]) {
                    cellDiv.classList.add('missed-cell'); // Missed shot
                }
    
                rowDiv.appendChild(cellDiv);
            });
    
            this.leftBoard.appendChild(rowDiv);
        });

        this.leftInput.appendChild(this.leftBoard);
    }

    displayRightBoard(isBot) {
        this.rightBoard.innerHTML = ''; // Clear previous board display
        
        if (isBot) {
            this.rightBoardLogic.placeShipRandomly();
        }
        
        this.rightBoardLogic.board.forEach((row, rowIndex) => {
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('board-row');
    
            row.forEach((cell, colIndex) => {
                const cellDiv = document.createElement('div');
                cellDiv.classList.add('board-cell');
    
                if (cell) {
                    cellDiv.classList.add('ship-cell'); // Ship is present
                } else if (this.rightBoardLogic.missedShots[rowIndex][colIndex]) {
                    cellDiv.classList.add('missed-cell'); // Missed shot
                }
    
                rowDiv.appendChild(cellDiv);
            });
    
            this.rightBoard.appendChild(rowDiv);
        });

        this.rightInput.appendChild(this.rightBoard);
    }

    #createNameInput (player) {
        const input = document.createElement('input');

        if (player === 'player1') {
            input.placeholder = 'Player 1';
            input.setAttribute('id', `${player}-input`);
        } else if (player === 'player2') {
            input.placeholder = 'Player 2';
            input.setAttribute('id', `${player}-input`);
        } else if (player === 'bot') {
            input.placeholder = 'Optimus Prime';
            input.value = 'Optimus Prime';
            input.setAttribute('id', `${player}-input`);
            input.disabled = true;
        }

        return input;
    }

    startGame () {
        this.leftBoard.parentNode.removeChild(this.leftBoard);
        this.rightBoard.parentNode.removeChild(this.rightBoard);
    
        let player1Input = document.getElementById('player1-input').value;
        let botInput = document.getElementById('bot-input');
    
        let player1Name = player1Input ? player1Input : 'Player 1';
        let player2Name;
    
        if (botInput) {
            player2Name = botInput.value;
        } else {
            let player2Input = document.getElementById('player2-input').value;
            player2Name = player2Input ? player2Input : 'Player 2';
        }

        this.player1.name = player1Name;
        this.player2.name = player2Name;
        
        new Game(this.leftBoardLogic, this.rightBoardLogic, this.player1, this.player2);
    }    
}

export default SecondPage;