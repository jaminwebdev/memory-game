import { images } from '../bgImages';


export const setupCards = (numOfMatches) => {
    //get the row element for injection
    const rowElement = document.querySelector('.row');

    rowElement.innerHTML = '';

    //prepare the card markup
    const markup = `<div class="card">
                        <div class="card__side card__side--front"></div>
                        <div class="card__side card__side--back"></div>
                    </div>`;
    
    //loop through and inject double the number of matches needed
    for(let i = 0; i < numOfMatches * 2; i++) {
        rowElement.insertAdjacentHTML('beforeend', markup);
    }

    //get all the cards, and convert frome HTMLCollection to array
    const cards = document.querySelectorAll('.card');
    const cardsArray = Array.from(cards);

    //**Card Fronts */
    //loop through the array of cards and inject image for card-front
    cardsArray.forEach( current => {
        const front = current.firstElementChild;
        front.style.backgroundImage = 'url(img/galaxyTall.jpg)';
    })

    //**Card Backs */
    //Get images for backs
    const imageMap = new Map();
    imageMap.set(0, images["0"]);
    imageMap.set(1, images["1"]);
    imageMap.set(2, images["2"]);
    imageMap.set(3, images["3"]);
    imageMap.set(4, images["4"]);
    imageMap.set(5, images["5"]);
    imageMap.set(6, images["6"]);
    imageMap.set(7, images["7"]);


    //Get array of duplicate random numbers between 0 and number of matches
    const randomArray = arrayDupes(numOfMatches);

    //match the value of each element in the array with the image map's numbered keys
    const newImageArray = randomArray.map( (current) => {
        return imageMap.get(current);
    });

    //get all the cards' backs
    const cardBacks = cardsArray.map( current => {
        const back = current.lastElementChild;
        return back;
    });

    //loop over backs and set their background images to coinciding index in newImageArray
    cardBacks.forEach( (current, index) => {
        current.style.backgroundImage = `url(${newImageArray[index]})`;
    })

}

export const doCardsMatch = (selectedCard) => {
            //get divs that represent front and back
            let frontCard = selectedCard.firstElementChild;
            let backCard = selectedCard.lastElementChild;

            let didScore;
        
            //if already showing the back of card AND isn't marked as a scored card - flip back over
            if(frontCard.classList.contains('chosen__side--front') && backCard.classList.contains('chosen__side--back') && !selectedCard.classList.contains('scored')) {
                frontCard.classList.remove('chosen__side--front');
                backCard.classList.remove('chosen__side--back');
            }
            else {
                //if not selected and isn't marked as scored - flip and show the back
                frontCard.classList.add('chosen__side--front');
                backCard.classList.add('chosen__side--back');
    
                //grab all the cards that are flipped over showing their back
                let theChosen = document.querySelectorAll('.chosen__side--back');
                //convert HTML collection into array
                theChosen = Array.from(theChosen);
    
                //initializing array for non-scored chosen cards
                let notScored = [];
                
                //looping over cards marked as .chosen__side--back, only pushing if 'scored' IS NOT in classList
                theChosen.forEach(current => {
                    if(!current.parentElement.classList.contains('scored')){
                        notScored.push(current.parentElement);
                    }
                })
    
                //if two non-scored cards exist - pass to isMatch to determine if scored
                if(notScored.length > 1 ) {
                    didScore = isMatch(notScored);
                    //return boolean to global app controller to update game model
                    return didScore;
                } else {
                    didScore = false;
                    return didScore;
                }
   
            }
}

//private function creating an array of duplicate values
console.time()
const arrayDupes = (total) => {

    //initialize empty array
    let numArrays = [];
    //since dealing with pairs - double the total
    let numTimes = total * 2;
       
    //inner function responsible for random number creation
    const randomArray = (total) => {
        //random number between 0 & total
       const num = Math.floor(Math.random() * (total));
       let counter = 0;
      
        //loop through numArrays to detect duplicate values
      let check = numArrays.filter(current => {
        return current === num;
      });
        
      //if less than 2 occurrences, push
      if(check.length < 2) {
        numArrays.push(num);
      } //if not - recursion and try again
      else {
          randomArray(total);
      }
    
    }

    //repeat above randomArray function numTimes (twice the total)
    for (let i = 0; i< numTimes; i++) {
        randomArray(total);
      }
    
    return numArrays;
}
console.timeEnd();

//private function determining if backs of cards match
const isMatch = notScored => {

    //grab first element's card and that card's back
    const first = notScored[0];
    const firstBack = first.lastElementChild;

    //grab second element's card and that card's back
    const second = notScored[1];
    const secondBack = second.lastElementChild;

    //if they match - it's a score! mark as scored in DOM so they're no longer flippable
    if(firstBack.style.backgroundImage === secondBack.style.backgroundImage) {
        //mark each card as scored
        first.classList.add('scored');
        second.classList.add('scored');
        //return true to global controller to update state
        return true;
    } //if not, flip those suckers back over after a second
    else {
        //flip em back over
        setTimeout( ()=> {
            first.firstElementChild.classList.remove('chosen__side--front');
            first.lastElementChild.classList.remove('chosen__side--back');
            second.firstElementChild.classList.remove('chosen__side--front');
            second.lastElementChild.classList.remove('chosen__side--back');
        }, 1200);
        //return false to global controller to update state
        return false;

    }
}