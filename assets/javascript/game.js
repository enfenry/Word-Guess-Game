let wins = 0;
let losses = 0;
let availableLetters, guessedLetters, totalGuesses, guessesLeft, divMessage, divAvailable, divGuessed, divWins, divLosses, divWordShown, wordInBlanks, divGuessesLeft, wordToGuess, gameComplete;

do {
    totalGuesses = prompt("Select number of attempts (10 = easy, 7 = medium, 5 = hard)");
    console.log(totalGuesses);
} while (isNaN(totalGuesses));

initRound();

// Get Key input from player
document.onkeyup = function (event) {
    let chosenLetter = event.key.toUpperCase();

    // initialize correctGuess variable as false, will change/check if it's true later.
    let correctGuess = false;

    if (gameComplete) {
        initRound();
    }
    // accept Player's Key Input ONLY if input is a letter
    else if (availableLetters.indexOf(chosenLetter) !== -1 && guessesLeft > 0) {

        //Remove letter guessed from available letters to choose from
        updateAvailableLetters(chosenLetter, availableLetters);
        divAvailable.textContent = availableLetters;

        // Add letter guessed to list of other guesses
        guessedLetters.push(chosenLetter);
        divGuessed.textContent = guessedLetters;

        // Fill in the blanks in the correct spaces
        for (let i = 0; i < wordToGuess.length; i++) {
            if (chosenLetter === wordToGuess.charAt(i).toUpperCase()) {
                wordInBlanks = replaceAt(wordInBlanks, i, chosenLetter);
                divWordShown.textContent = wordInBlanks;
                correctGuess = true;
            }
        }
        if (wordInBlanks === wordToGuess.toUpperCase()) {
            wins += 1;
            divWins.textContent = wins;
            divMessage.textContent = "YOU WIN! TYPE ANY KEY TO PLAY AGAIN.";
            gameComplete = true;
        }

        if (!correctGuess) {
            // Countdown guesses left
            guessesLeft -= 1;
            divGuessesLeft.textContent = guessesLeft;

            if (guessesLeft === 0) {
                losses += 1;
                divLosses.textContent = losses;
                divMessage.textContent = "GAME OVER. TYPE ANY KEY TO PLAY AGAIN.";
                gameComplete = true;
            }
        }
    }
    else if (guessesLeft != 0) {
        divMessage.textContent = "Please guess one of the available letters.";
    }
}

// Start a new round
function initRound() {
    // Generate random word
    let animals = [
        "Aardvark", "Albatross", "Alligator", "Alpaca", "Ant", "Anteater", "Antelope", "Ape", "Armadillo", "Donkey", "Baboon", "Badger", "Barracuda", "Bat", "Bear", "Beaver", "Bee", "Bison", "Boar", "Buffalo", "Butterfly", "Camel", "Capybara", "Caribou", "Cat", "Caterpillar", "Cheetah", "Chicken", "Chimpanzee", "Chinchilla", "Clam", "Cobra", "Cockroach", "Cod", "Coyote", "Crab", "Crane", "Crocodile", "Crow", "Deer", "Dinosaur", "Dog", "Dogfish", "Dolphin", "Dove", "Dragonfly", "Duck", "Dugong", "Eagle", "Echidna", "Eel", "Elephant", "Elk", "Emu", "Falcon", "Ferret", "Finch", "Fish", "Flamingo", "Fly", "Fox", "Frog", "Gazelle", "Gerbil", "Giraffe", "Gnat", "Goat", "Goldfish", "Goose", "Gorilla", "Grasshopper", "Grouse", "Guanaco", "Gull", "Hamster", "Hare", "Hawk", "Hedgehog", "Heron", "Herring", "Hippopotamus", "Hornet", "Horse", "Human", "Hummingbird", "Hyena", "Ibex", "Ibis", "Jackal", "Jaguar", "Jellyfish", "Kangaroo", "Kingfisher", "Koala", "Lark", "Lemur", "Leopard", "Lion", "Llama", "Lobster", "Locust", "Louse", "Mallard", "Manatee", "Mandrill", "Mantis", "Meerkat", "Mink", "Mole", "Mongoose", "Monkey", "Moose", "Mosquito", "Mouse", "Mule", "Narwhal", "Newt", "Nightingale", "Octopus", "Okapi", "Opossum", "Ostrich", "Otter", "Owl", "Oyster", "Panther", "Parrot", "Pelican", "Penguin", "Pheasant", "Pig", "Pigeon", "Pony", "Porcupine", "Porpoise", "Quail", "Rabbit", "Raccoon", "Ram", "Rat", "Raven", "Reindeer", "Rhinoceros", "Rook", "Salamander", "Salmon", "Sand Dollar", "Sandpiper", "Sardine", "Scorpion", "Seahorse", "Seal", "Shark", "Sheep", "Shrew", "Skunk", "Snail", "Snake", "Sparrow", "Spider", "Squid", "Squirrel", "Starling", "Stingray", "Stinkbug", "Stork", "Swallow", "Swan", "Tapir", "Termite", "Tiger", "Toad", "Trout", "Turkey", "Turtle", "Viper", "Vulture", "Wallaby", "Walrus", "Wasp", "Weasel", "Whale", "Wildcat", "Wolf", "Wolverine", "Wombat", "Woodcock", "Woodpecker", "Worm", "Wren", "Yak", "Zebra"
    ]
    wordToGuess = animals[Math.floor(Math.random() * animals.length)];

    // FOR NOW just using default word
    // wordToGuess = 'hangman';

    availableLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    guessedLetters = [];
    guessesLeft = totalGuesses;

    // initialize gameComplete variable as false, will change/check if it's true later.
    gameComplete = false;

    divWins = document.getElementById("wins");
    divWins.textContent = wins;

    divLosses = document.getElementById("losses");
    divLosses.textContent = losses;

    divAvailable = document.getElementById("available-letters");
    divAvailable.textContent = availableLetters;

    divGuessed = document.getElementById("guessed-letters");
    divGuessed.textContent = guessedLetters;

    divWordShown = document.getElementById("guess-word");
    wordInBlanks = initBlanks(wordToGuess)
    divWordShown.textContent = wordInBlanks;

    divMessage = document.getElementById("user-event");
    divMessage.textContent = "Press any key to get guessin'!";

    divGuessesLeft = document.getElementById("guesses-left");
    divGuessesLeft.textContent = guessesLeft;
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
function updateAvailableLetters(letter, availableLetters) {
    availableLetters.splice(availableLetters.indexOf(letter.toUpperCase()), 1);
    return availableLetters;
}

// Replace character at given index
function replaceAt(string, index, newChar) {
    return string.substring(0, index) + newChar + string.substring(index + 1);
}