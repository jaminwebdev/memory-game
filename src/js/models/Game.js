export default class Game {
    constructor() {
        this.pairsRemain = 6;
        this.moves = 0;
    }

    reducePairs() {
        this.pairsRemain--;
    }

    increaseMoves() {
        this.moves++;
    }

}