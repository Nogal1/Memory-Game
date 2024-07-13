document.addEventListener("DOMContentLoaded", function () {
  const gameContainer = document.getElementById("game");
  let card1 = null;
  let card2 = null;
  let cardsFlipped = 0;
  let noClicking = false;

  document.getElementById('start-game').addEventListener('click', function () {
    const difficulty = document.getElementById('difficulty-select').value;
    startGame(difficulty);
    this.style.display = 'none';  // Optionally hide the start button
  });

  function startGame(difficulty) {
    gameContainer.innerHTML = '';  // Clear the game container
    let numCards;
    switch (difficulty) {
      case 'easy':
        numCards = 8;
        break;
      case 'medium':
        numCards = 16;
        break;
      case 'hard':
        numCards = 24;
        break;
      default:
        numCards = 16;  // Default to medium if something goes wrong
    }
    const colors = generateColors(numCards / 2);  // Generate half as many colors as there are cards
    let colorPairs = colors.concat(colors);  // Create pairs
    let shuffledColors = shuffle(colorPairs);  // Shuffle the pairs
    createDivsForColors(shuffledColors);  // Create the divs
    document.getElementById('restart-game').style.display = 'block';  // Show restart button
  }

  function generateColors(count) {
    const baseColors = ["red", "blue", "green", "orange", "purple", "yellow", "teal", "pink"];
    let colorArray = [];
    while (colorArray.length < count) {
      colorArray.push(baseColors[colorArray.length % baseColors.length]);
    }
    return colorArray;
  }




  document.getElementById('restart-game').addEventListener('click', function () {
    gameContainer.innerHTML = '';  // Clear the game container
    shuffledColors = shuffle(colorArray);  // Reshuffle the colors
    createDivsForColors(shuffledColors);  // Recreate the divs
    cardsFlipped = 0;  // Reset flipped cards count
    document.getElementById('start-game').style.display = 'block';  // Show the start button again
    this.style.display = 'none';  // Hide the restart button
  });

  let score = 0;  // Initialize score
  document.getElementById('score').innerText = score;

  // Update scoring logic inside handleCardClick
  if (card1 === card2) {
    score += 10;  // Increase score on correct guess
  }
  document.getElementById('score').innerText = score;  // Update the display

  // Check and update the lowest score
  let highScore = parseInt(localStorage.getItem('highScore')) || Infinity;
  if (cardsFlipped === shuffledColors.length && score > lowestScore) {
    localStorage.setItem('highScore', score);
  }


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
      const newDiv = document.createElement("div");
      newDiv.classList.add(color);
      newDiv.addEventListener("click", handleCardClick);
      gameContainer.append(newDiv);
    }
  }

  function handleCardClick(e) {
    if (noClicking) return;
    if (e.target.classList.contains("flipped")) return;

    let currentCard = e.target;
    currentCard.style.backgroundColor = currentCard.classList[0];

    if (!card1 || !card2) {
      currentCard.classList.add("flipped");
      card1 = card1 || currentCard;
      card2 = currentCard === card1 ? null : currentCard;
    }

    if (card1 && card2) {
      noClicking = true;
      // debugger
      let gif1 = card1.className;
      let gif2 = card2.className;

      if (gif1 === gif2) {
        cardsFlipped += 2;
        card1.removeEventListener("click", handleCardClick);
        card2.removeEventListener("click", handleCardClick);
        card1 = null;
        card2 = null;
        noClicking = false;
      } else {
        setTimeout(function () {
          card1.style.backgroundColor = "";
          card2.style.backgroundColor = "";
          card1.classList.remove("flipped");
          card2.classList.remove("flipped");
          card1 = null;
          card2 = null;
          noClicking = false;
        }, 1000);
      }
    }

    if (cardsFlipped === COLORS.length) alert("game over!");
  }

  createDivsForColors(shuffledColors);
});