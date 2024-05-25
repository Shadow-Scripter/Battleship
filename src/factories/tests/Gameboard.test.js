import GameBoard from "../Gameboard";
import Ship from "../Ship";

describe('GameBoard', () => {
    let ship;
    let board;
    let testBoardArray = [];
    let testMissedShotsArray = [];

    beforeEach(() => {
        ship = new Ship(3);
        board = new GameBoard();

        for (let i = 0; i < 10; i++) {
            testBoardArray[i] = [];
            testMissedShotsArray[i] = [];
            for (let j = 0; j < 10; j++) {
                testBoardArray[i][j] = null;
                testMissedShotsArray[i][j] = false;
            }
        };
    })

    test('initialization of the GameBoard', () => {
        expect(board).toEqual({
            board: testBoardArray,
            missedShots: testMissedShotsArray,
        });
    })

    test('places a ship', () => {
        board.placeShip(ship, 3, 3);

        testBoardArray[3][3] = ship;
        testBoardArray[3][4] = ship;
        testBoardArray[3][5] = ship;

        expect(board).toEqual({
            board: testBoardArray,
            missedShots: testMissedShotsArray,
        });
    })

    test('places ships randomly', () => {
        board.placeShipRandomly();

        const SIZE = 10; // size of the board
        let countShips = 0; // count number of all ships on the board
    
        for (let row = 0; row < SIZE; row++) {
            for (let column = 0; column < SIZE; column++) {
                if (board.board[row][column] instanceof Ship) {
                    countShips++;
                }
            }
        }
    
        expect(countShips).toEqual(17); // 17 is the number of all ships cells (5+4+3+3+2)
    });
    

    test('prevents ship placement in neighborhood of taken fields', () => {
        board.placeShip(ship, 3, 3);
        expect(board.placeShip(ship, 4, 4)).toBe(false);
        expect(board.placeShip(ship, 2, 2)).toBe(false);
    })

    test('prevents ship placement outside gameBoard', () => {
        expect(board.placeShip(ship, 8, 8)).toBe(false)
        expect(board.placeShip(ship, 10, 10)).toBe(false)
    })

    test('prevents ship placement on taken fields', () => {
        board.placeShip(ship, 3, 3);
        expect(board.placeShip(ship, 3, 3)).toEqual(false);
        expect(board.placeShip(ship, 3, 4)).toEqual(false);
        expect(board.placeShip(ship, 3, 5)).toEqual(false);
        expect(board.placeShip(ship, 3, 7)).toEqual(true);
    })

    test('receives attacks', () => {
        board.placeShip(ship, 3, 3);

        expect(board.receiveAttack(3, 3)).toBe(true);
        expect(board.receiveAttack(3, 2)).toBe(false);

        expect(ship.hits).toEqual(expect.arrayContaining([0]));

        expect(board.receiveAttack(3, 4)).toBe(true);
        expect(board.receiveAttack(3, 5)).toBe(true);

        expect(board.receiveAttack(3, 6)).toBe(false);

        expect(ship.isSunk()).toBe(true);
    })

    test('missed shots tracking', () => {
        board.placeShip(ship, 3, 3);
        board.receiveAttack(3, 1);
        board.receiveAttack(3, 3);

        expect(board.missedShots[3][1]).toBe(true);
        expect(board.missedShots[3][3]).toBe(false);

        expect(ship.hits).toEqual(expect.arrayContaining([0]));
    })

    test('is game over when all ships is sunk', () => {
        expect(board.isGameOver()).toBe(true);

        board.placeShip(ship, 3, 3);
        board.placeShip(new Ship(5), 5, 5);

        expect(board.isGameOver()).toBe(false);

        board.receiveAttack(3, 3);
        board.receiveAttack(3, 4);
        board.receiveAttack(3, 5);

        expect(board.isGameOver()).toBe(false);

        board.receiveAttack(5, 5);
        board.receiveAttack(5, 6);
        board.receiveAttack(5, 7);
        board.receiveAttack(5, 8);
        board.receiveAttack(5, 9);

        expect(board.isGameOver()).toBe(true);
    })
})