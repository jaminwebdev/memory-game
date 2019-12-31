export const gameWon = (moves) => {

    //get pageBody
    const body = document.getElementById('pageBody');

    //markup for winner view
    const markup = `<div id="winner">
                        <div id="winner__Card">
                            <h1 id="winner__heading">You Win!</h1>
                            <p id="winner__p">You won in ${moves} moves!</p>
                            <button id="winner__button">Try Again?</button>
                            <p id="winner__cancel">No Thanks</p>
                        </div>
                    </div>`

    body.insertAdjacentHTML('beforeend', markup);
}