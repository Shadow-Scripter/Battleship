class Player {
    constructor (name) {
        this.name = name;
        this.attackedPositions = [];
    }

    // player makes move
    attack(row, column, board) {
        if (this.isAttacked(row, column)) return false;

        this.attackedPositions.push([row, column]);
        return board.receiveAttack(row, column);
    }

    // if player plays vs robot, robot will attack randomly 
    randomAttack (board) {
        let row;
        let column;

        do {
            row = Math.floor(Math.random() * 10); 
            column = Math.floor(Math.random() * 10); 
        } while (this.isAttacked(board, row, column));

        this.attackedPositions.push([row, column]);
        return board.receiveAttack(row, column);
    }

    // checks is the move have already be done
    isAttacked (board, row, column) {
        return board.missedShots[row][column] || board.board[row][column] === 'x';
    }
}

export default Player;