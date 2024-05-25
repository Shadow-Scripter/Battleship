class Ship {
    constructor (length) {
        this.length = length;
        this.hits = [];
    }

    // increases the number of ‘hits’ in ship.
    hit (index) {
        if (index < 0 || index >= this.length || this.hits.includes(index)) return false;
        this.hits.push(index);
        return true;
    }

    // calculates whether a ship is considered sunk based 
    // on its length and the number of hits it has received.
    isSunk () {
        return this.hits.length === this.length;
    }
}

export default Ship;