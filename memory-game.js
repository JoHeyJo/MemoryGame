"use strict";
window.stop();
/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);

createCards(colors);


/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }  

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - an click listener for each card to handleCardClick
 */

function createCards(colors) {
  const gameBoard = document.getElementById("game");

  for (let color of colors) {
    let card = document.createElement("div")
    // let imageDivs = gameBoard.childNodes;
    // imageDivs.classList.add('img-size');
    // let img = document.createElement('img')
    // img.src = "file:///Users/jf/Desktop/memory-game/demo/Screen%20Shot%202022-03-04%20at%202.29.07%20PM.png";
    // img.id = "select-image";
    gameBoard.appendChild(card).classList.add(color);
    // for(let image of imageDivs){
    //   image.appendChild(img)
    // }
    
  }
}

let cards = document.getElementById("game").childNodes;

let flippedCards = 0;

let card1;

let card2;

let eventFlag;

for(let card of cards){
  card.addEventListener('click', function(evt){
    handleCardClick(card)
    console.log(evt.target);
  });
}

/** Flip a card face-up. */

function flipCard(card) {
  
  card.style.backgroundColor = card.classList;
  
  flippedCards++;
  flippedCards < 2 ? card1 = card.classList.value :card2 = card.classList.value;
  card.classList.add('disable-pointer');
  console.log(card1 + card2 )
}

/** Flip a card face-down. */

function unFlipCard(card) {
    setTimeout(function(){
      card.style.removeProperty('background-color');
      card.classList.remove('disable-pointer');
      flippedCards--;
        // card1 = undefined;
        // card2 = undefined;
    },2000);
}

/** Handle clicking on a card: this could be first-card or second-card. */



function handleCardClick(evt) {
  // if(card1 !== undefined && card2 !== undefined){
    if(flippedCards === 1){
      document.getElementById("game").classList.add('disable-pointer')
      setTimeout(function(){
        document.getElementById("game").classList.remove('disable-pointer');
      },2000)
    }
    
    if(flippedCards < 2 ){
      flipCard(evt)
      if(card1 === card2){
        flippedCards--;
        // card1 = undefined;
        // card2 = undefined;
        return;
      }
      unFlipCard(evt);
    }
  } 

function reloadPage() {
  document.location.reload();
}
  
// }

