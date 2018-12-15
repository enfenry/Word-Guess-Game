// Generate random word
// FOR NOW just using default word
let wordToGuess = 'hangman'

let availableLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
let guessedLetters = [];

let divAvailable = document.getElementById("available-letters");
divAvailable.textContent = "Available Letters: " + availableLetters;

let divGuessed = document.getElementById("guessed-letters");
divGuessed.textContent = "Letters already guessed: "

let divWordShown = document.getElementById("guess-word");
let wordInBlanks = initBlanks(wordToGuess)
divWordShown.textContent = wordInBlanks;

let divUserChoice = document.getElementById("user-event");


// Get Key input from player
document.onkeyup = function (event) {
    let chosenLetter = event.key.toUpperCase();
    // accept Player's Key Input ONLY if input is a letter
    if (availableLetters.indexOf(chosenLetter) !== -1) {
        divUserChoice.textContent = chosenLetter;
        updateAvailableLetters(chosenLetter,availableLetters);
        divAvailable.textContent = "Available Letters: " + availableLetters;
        guessedLetters.push(chosenLetter);
        divGuessed.textContent = "Letters already guessed: " + guessedLetters;

        for (let i = 0; i < wordToGuess.length; i++) {
            if (chosenLetter === wordToGuess.charAt(i).toUpperCase()) {
                wordInBlanks = replaceAt(wordInBlanks,i,chosenLetter);
                divWordShown.textContent = wordInBlanks;
            }
        }
    }
}


// Display starting _ _ _ _ 's based on word length

function initBlanks(string) {
    let blanks = "";
    for (let i = 0; i < string.length; i++) {
        blanks = blanks + "_"
    }
    return blanks;
}

// Remove used letter from available letters
function updateAvailableLetters(letter,availableLetters) {
    availableLetters.splice(availableLetters.indexOf(letter.toUpperCase()),1);
    return availableLetters;
}

// Replace character at given index
function replaceAt(string, index, newChar) {
    return string.substring(0, index) + newChar + string.substring(index + 1);
  }

