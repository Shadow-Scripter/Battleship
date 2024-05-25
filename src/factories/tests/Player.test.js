import Player from "../Player";
import GameBoard from "../Gameboard";
import Ship from "../Ship";

describe('Player', () => {
    let player;
    let board;
    let ship;

    beforeEach(() => {
        player = new Player('jester');
        board = new GameBoard();
        ship = new Ship(3);
    })
    
    test('creation of player', () => {
        expect(player).toEqual({ name: 'jester', attackedPositions: [] });
    })

    test('attacks' , () => {
        board.placeShip(ship, 3, 3);

        player.attack(3, 3, board);
        player.attack(3, 2, board);

        expect(board.missedShots[3][2]).toEqual(true);
        expect(board.missedShots[3][3]).toEqual(false);

        player.attack(3, 4, board);
        player.attack(3, 5, board);

        expect(board.isGameOver()).toBe(true);
    })

    test('randomly attacks' , () => {
        board.placeShip(ship, 3, 3, true)
    for (let i = 0; i < 100; i++) {
      player.randomAttack(board)
    }
    expect(board.isGameOver()).toBe(true)
    })
})
