document.addEventListener("DOMContentLoaded", function () {
  const gameContainer = document.getElementById("game");
  let card1 = null;
  let card2 = null;
  let noClicking = false;
  let score = 0;
  let cardsFlipped = 0;
  // Define a base set of colors, more can be added as needed
  const baseColors = ["red", "blue", "green", "orange", "purple", "yellow", "teal", "pink"];

  document.getElementById('start-game').addEventListener('click', function () {
    startGame(document.getElementById('difficulty-select').value);
    this.style.display = 'none';  // Optionally hide the start button
  });

  document.getElementById('restart-game').addEventListener('click', function () {
    function restartGame() {
      startGame(document.getElementById('difficulty-select').value);
    }
    restartGame();
    this.style.display = 'none';  // Hide the restart button
    document.getElementById('start-game').style.display = 'block';  // Show the start button again
  });

  function startGame(difficulty) {
    gameContainer.innerHTML = '';  // Clear the game container
    let numCards = { easy: 8, medium: 16, hard: 24 }[difficulty] || 16;
    let colors = generateColors(numCards / 2);
    let colorPairs = colors.concat(colors);  // Create pairs
    let shuffledColors = shuffle(colorPairs);  // Shuffle the pairs
    createDivsForColors(shuffledColors);
    document.getElementById('restart-game').style.display = 'block';  // Show restart button
    cardsFlipped = 0;
    score = 0;  // Reset score
    document.getElementById('score').innerText = score;  // Update display
  

    function generateColors(count) {
      let colorArray = [];
      while (colorArray.length < count) {
        colorArray.push(baseColors[colorArray.length % baseColors.length]);
      }
      return colorArray;
    }

    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
      }
      return array;
    }

    function createDivsForColors(colorArray) {
      for (let color of colorArray) {
        const newDiv = document.createElement("div");
        newDiv.classList.add(color, 'card');
        newDiv.addEventListener("click", handleCardClick);
        gameContainer.appendChild(newDiv);
      }
    }

    function handleCardClick(e) {
      if (noClicking) return;
      let currentCard = e.target;
      if (currentCard.classList.contains("flipped")) return;

      currentCard.classList.add("flipped");
      currentCard.style.backgroundColor = currentCard.className.split(' ')[0]; // Get color from class

      if (!card1) {
        card1 = currentCard;
      } else if (!card2) {
        card2 = currentCard;
        checkForMatch();
      }
    }

    function checkForMatch() {
      if (card1.className === card2.className) {
        cardsFlipped += 2;
        score += 10; // Increase score for a match
        resetCards(true);
      } else {
        setTimeout(() => resetCards(false), 500);
        score -= 5; // Decrease score for a non-match
      }
      document.getElementById('score').innerText = score; // Update display
      updateHighScore();
    }

    function resetCards(isMatch) {
      if (!isMatch) {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
      }
      card1 = null;
      card2 = null;
      noClicking = false;
      if (cardsFlipped === colorPairs.length) alert("Game over!");
    }

    function updateHighScore() {
      let highScore = parseInt(localStorage.getItem('highScore')) || Infinity;
      if (score > highScore) {
        localStorage.setItem('highScore', score);
        if (cardsFlipped === colorPairs.length) alert("New high score!");
      }
    }
  }
});
