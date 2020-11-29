let wordToguess = "";
let guessedLettersArr = [];
const wordArray = [];
let numOfTry = 0;
let maxNumOfTry = 6;

const imageArray = ['./img/0.png', './img/1.png', './img/2.png', './img/3.png', './img/4.png', './img/5.png', './img/6.png']

const alphabetDiv = document.querySelector('.alphabet')
const imgDiv = document.querySelector('.img-hangman')
const output = document.querySelector('.output')
const gameResult = document.querySelector('.game-result')

const vocab = ['fuck', 'tesla', 'javascript', "opacity", "hangman"]

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
  'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
  't', 'u', 'v', 'w', 'x', 'y', 'z'
]
// GETTING A GUESSED WORD
window.onload = function getWord() {
  wordToguess = vocab[getRandom(0, vocab.length - 1)]
  wordToguess = wordToguess.split('')
  guessedLettersArr = wordToguess.map(() => false)
  for (let i = 0; i < wordToguess.length; i++) {
    wordArray.push(wordToguess[i])
    let guessedLetter = document.createElement('p')
    guessedLetter.classList = "guessed-letter"
    guessedLetter.style.display = "inline-block";
    guessedLetter.style.opacity = 1;
    guessedLetter.style.margin = 5 + "px";
    guessedLetter.style.fontSize = 2 + "rem";
    guessedLetter.style.padding = 5 + "px";
    guessedLetter.style.border = "solid";
    output.appendChild(guessedLetter)
  }

  for (let j = 0; j < alphabet.length; j++) {
    let letter = document.createElement('button')
    letter.classList = "letter"
    letter.value = alphabet[j];
    letter.style.width = 50 + "px"
    letter.style.height = 30 + "px"
    letter.addEventListener('click', allOnClick)
    alphabetDiv.appendChild(letter)
    letter.innerText = `${alphabet[j]}`
  }
};

// CLICKING ALPHABET 

function allOnClick(event) {
  checkWord(event.target.value)
}

// RANDOM NUMBER
function getRandom(from, to) {
  return Math.floor(from + Math.random() * (to + 1 - from))
}

// CHECKING LETTERS

function checkWord(value) {

  const index = wordArray.indexOf(value);
  if (index > -1) {
  if (guessedLettersArr[index] == true) {
  let newArr = guessedLettersArr.slice(0,index) // PROBLEM IS HERE
  console.log(`newArr`)
 if(newArr.indexOf(value) > -1) {
  guessedLettersArr[index] = true;
 }
  } else 
    guessedLettersArr[index] = true;
    console.log(guessedLettersArr)

    drawLetter()
  } else {
    numOfTry++
    imgDiv.style.backgroundImage = `url(${imageArray[numOfTry]})`;
    imgDiv.style.backgroundSize = 'cover'; 
  }
    if (numOfTry === maxNumOfTry) { // LIMIT OF ATTEMPTS
      gameResult.innerText = "Game is over"
      imgDiv.style.backgroundImage = `url(${imageArray[6]})`;
      imgDiv.style.backgroundSize = 'cover';
    }
  }

// DRAWING GUESSED/ NON-GUESSED LETTERS
function drawLetter() {
  let lettersArr = [];
  output.innerHTML = "";
  for (let i = 0; i < guessedLettersArr.length; i++) {
    console.log(guessedLettersArr)
    if (guessedLettersArr[i] == true) {
      let guessedLetter = document.createElement('p')
      guessedLetter.innerText = wordToguess[i]
      guessedLetter.classList = "guessed-letter"
      guessedLetter.style.display = "inline-block";
      guessedLetter.style.opacity = 1;
      guessedLetter.style.margin = 5 + "px";
      guessedLetter.style.fontSize = 2 + "rem";
      guessedLetter.style.padding = 5 + "px";
      guessedLetter.style.border = "solid";
      lettersArr.push(guessedLetter) 
      if (lettersArr.length == guessedLettersArr.length) {
        gameResult.innerHTML = "YOU WON!"
      }
      output.appendChild(guessedLetter)
    
    } else {
      let nonGuessedLetter = document.createElement('p')
      nonGuessedLetter.classList = "guessed-letter"
      nonGuessedLetter.style.display = "inline-block";
      nonGuessedLetter.style.opacity = 1;
      nonGuessedLetter.style.margin = 5 + "px";
      nonGuessedLetter.style.fontSize = 2 + "rem";
      nonGuessedLetter.style.padding = 5 + "px";
      nonGuessedLetter.style.border = "solid";
      output.appendChild(nonGuessedLetter)
    }
  }
}