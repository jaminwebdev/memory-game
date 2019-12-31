// Global app controller
import '../css/main.scss';

import Game from './models/Game';

import * as cardsView from './view/cardsView';
import * as winView from './view/winView';
import * as statsView from './view/statsView';

const state = {};

//initialize new game
window.addEventListener('load', () => {
    initializeGame();
});

const initializeGame = (numOfMatches=6) => {

    //reset state object
    state.game = new Game();

    //update stats View
    statsView.updateStats(0, 6);

    //set up view items
    cardsView.setupCards(numOfMatches);

    //load persistent data
    const pastGames = localStorage.games;

    //if pastGames exist, parse and push to state
    if(pastGames) {
        state.pastGames = JSON.parse(pastGames);

        //pass scores to statsView chartScores function
        statsView.chartScores(state.pastGames);
    } else { //if not, initialize a new empty array on the state - new user
        state.pastGames = [];
    }

}

//set up event delegation on cards container
let cardsContainer = document.querySelector('.container');
cardsContainer.addEventListener('click', (event) => {

    //get closest card
    let selectedCard = event.target.closest('.card');

    if(selectedCard) {

        //increase moves on game model
        state.game.increaseMoves();

        //increase moves in statsView
        statsView.updateStats(state.game.moves, state.game.pairsRemain);

        //pass card to view for comparison logic
        const didScore = cardsView.doCardsMatch(selectedCard);
        
        if(didScore) {
            state.game.reducePairs();
        }

        //if no pairs remain- you win!
        if(state.game.pairsRemain === 0) {

            //activate winView
            winView.gameWon(state.game.moves);
            //push this game's move score to state object
            state.pastGames.push(state.game.moves);
            //push state object's score array to localStorage
            localStorage.setItem('games', JSON.stringify(state.pastGames));

            //grab winner button from winView
            const tryAgain = document.getElementById('winner__button');
            //grab winview for removal in case of try again or closing it
            const winnerView = document.getElementById('winner');

            //event listener for trying again
            tryAgain.addEventListener('click', ()=> {
                //rerun the intializeGame function to reset everything
                initializeGame();
                winnerView.parentElement.removeChild(winnerView);
            });
            
        }

    }

})



