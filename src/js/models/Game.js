export default class Game {
    constructor(numOfPairs) {
        this.pairsRemain = numOfPairs;
        this.moves = 0;
    }

    reducePairs() {
        this.pairsRemain--;
    }

    increaseMoves() {
        this.moves++;
    }

}