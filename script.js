// Returns a random number between 0 and 2
function randomNum() {
  return Math.floor(Math.random() * 3);
}

// Returns a choice depending on the random number
function numToChoice(number) {
  let choice = ["rock", "paper", "scissors"];
  return choice[number];
}

// Main RPS function
function rpsGame(yourChoice) {
  // Initializing variables
  let botChoice, humanChoice;

  // assigning variables
  humanChoice = yourChoice.id;
  botChoice = numToChoice(randomNum());

  console.log("Human choice:", humanChoice);
  console.log("Computer choice:", botChoice);

  let result = decideWinner(humanChoice, botChoice);
  console.log(result);

  let message = finalMessage(result[0]);
  console.log(message);

  // This will display the final message
  displayResults(humanChoice, botChoice, message);

  // This will count the number of wins and tie by computer and human
  let rock = document.getElementById("rock");
  let paper = document.getElementById("paper");
  let scissors = document.getElementById("scissors");
  let scoreFunction = score(result[0]);

  rock.addEventListener("click", scoreFunction);
  paper.addEventListener("click", scoreFunction);
  scissors.addEventListener("click", scoreFunction);
}

//this function returns an array of human choice and computer choice
function decideWinner(yourChoice, computerChoice) {
  let rpsDataBase = {
    rock: {
      scissors: 1,
      rock: 0.5,
      paper: 0,
    },
    paper: {
      rock: 1,
      paper: 0.5,
      scissors: 0,
    },
    scissors: {
      paper: 1,
      scissors: 0.5,
      rock: 0,
    },
  };

  let yourScore = rpsDataBase[yourChoice][computerChoice];
  let computerScore = rpsDataBase[computerChoice][yourChoice];

  return [yourScore, computerScore];
}

// This function returns the final message
function finalMessage(yourScore) {
  if (yourScore === 0) {
    return { message: "You lose. Better luck next time" };
  } else if (yourScore === 0.5) {
    return { message: "You tied. Play again" };
  } else {
    return {
      message: "You won. Now, get back to your boring life",
    };
  }
}

// This function will display the results
function displayResults(humanImageChoice, botImageChoice, finalMessage) {
  let imagesDatabase = {
    rock: document.getElementById("rock").src,
    paper: document.getElementById("paper").src,
    scissors: document.getElementById("scissors").src,
  };

  let humanImage = document.createElement("img");
  humanImage.setAttribute("id", "hum-img");
  humanImage.src = imagesDatabase[humanImageChoice];

  let botImage = document.createElement("img");
  botImage.setAttribute("id", "bot-img");
  botImage.src = imagesDatabase[botImageChoice];

  let humanDiv = document.getElementById("human");
  let botDiv = document.getElementById("bot");

  let resultPara = document.getElementById("result-para");

  humanDiv.appendChild(humanImage);
  botDiv.appendChild(botImage);
  resultPara.innerHTML = finalMessage["message"];
}

// this function counts the score of human and computer
let computerScore = 0;
let humanScore = 0;
let tieScore = 0;

function score(yourScore) {
  if (yourScore === 0) {
    computerScore = computerScore + 1;
    document.getElementById("computer-score").innerHTML = computerScore;
  } else if (yourScore === 0.5) {
    tieScore = tieScore + 1;
    document.getElementById("tie-score").innerHTML = tieScore;
  } else {
    humanScore = humanScore + 1;
    document.getElementById("user-score").innerHTML = humanScore;
  }
}

// This function resets the score
function reset() {
  document.getElementById("computer-score").innerHTML = 0;
  document.getElementById("user-score").innerHTML = 0;
  document.getElementById("tie-score").innerHTML = 0;
  computerScore = 0;
  humanScore = 0;
  tieScore = 0;
}

// This function will reset the game
function remove() {
  document.getElementById("hum-img").remove();
  document.getElementById("bot-img").remove();

  let resultPara = document.getElementById("result-para");
  resultPara.innerHTML = "Play Rock, Paper, Scissors";
}
