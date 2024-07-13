const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
// Assuming these are declared at a higher scope if needed outside handleCardClick
let firstCard = null;
let secondCard = null;
let hasFlippedCard = false;
let lockBoard = false;

function handleCardClick(event) {
  if (lockBoard) return;
  if (event.target === firstCard) return;

  let clickedCard = event.target;

  // Show color only on flip
  clickedCard.style.backgroundColor = clickedCard.classList[0]; // Color is based on the class

  if (!hasFlippedCard) {
    // First click
    hasFlippedCard = true;
    firstCard = clickedCard;
    firstCard.classList.add('flipped');
  } else {
    // Second click
    secondCard = clickedCard;
    secondCard.classList.add('flipped');
    lockBoard = true;

    // Check if cards match
    if (firstCard.className === secondCard.className) {
      // It's a match!
      firstCard.removeEventListener('click', handleCardClick);
      secondCard.removeEventListener('click', handleCardClick);
      resetBoard();
    } else {
      // Not a match
      setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.style.backgroundColor = ''; // Hide color
        secondCard.style.backgroundColor = ''; // Hide color
        resetBoard();
      }, 1500);
    }
  }
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// when the DOM loads
createDivsForColors(shuffledColors);
