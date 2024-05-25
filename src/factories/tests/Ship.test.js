import Ship from "../Ship";

describe('Ship', () => {
    let ship;

    beforeEach(() => {
        ship = new Ship(5);
    })

    test('test Ship creation (test constructor)', () => {
        expect(ship).toEqual({ length: 5, hits: [] });
    })

    test('is ship getting hit', () => {
        ship.hit(1);
        expect(ship.hits).toContain(1);
    })

    test('is ship getting hit multiply times', () => {
        ship.hit(0);
        ship.hit(1);
        ship.hit(2);
        ship.hit(3);
        expect(ship.hits).toEqual(expect.arrayContaining([0, 1, 2, 3]));
    })

    test('is ship sinking', () => {
        ship.hit(0);
        ship.hit(1);
        ship.hit(2);
        ship.hit(3);
        ship.hit(4);
        expect(ship.isSunk()).toEqual(true);
    })
})