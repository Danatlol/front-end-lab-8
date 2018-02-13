



const MAX_TRIES = 3;
const BASE_RANGE_MAX = 5;
const BASE_PRIZE = 10;

let gameRange = [0, BASE_RANGE_MAX];
let gamePrize = BASE_PRIZE;
let divideAttempts = 2;
let prizeMult = 3;
let rangeMult = 2;
let num = 0;
let isGuess = false;
let isContinue = false;
let isAgain = false;

let totalPrize = 0;



let start = confirm("Do you want to play the game?");

if (start) {
    for (; ;) {

        isGuess = false;
        isContinue = false;

        num = Math.random() * (gameRange[1] + 1);
        num = Math.floor(num);
        for (let i = 0; i < MAX_TRIES; ++i) {

            let inData = prompt("Enter a number from 0 to " + gameRange[1] +
                "\nAttempts left: " + (MAX_TRIES - i) + "\nTotal prize: " + totalPrize +
                "$\nPossible prize on current attempt: " + Math.trunc(gamePrize / (2 ** i)) + "$", "");

            // when cancel in game field
            if (inData === null) {
                break;
            }
            else if (inData.trim().length === 0) {
                inData = NaN;
            }
            else if (Number(inData) === num) {
                // user guess
                isGuess = true;
                totalPrize += Math.trunc(gamePrize / (2 ** i));
                break;
            }
        }

        // if user guess the number
        if (isGuess) {
            // asking about continue current game
            isContinue = confirm("Do you want to continue the game?");
        }

        // if not continue
        if (!isContinue) {
            console.log("Thank you for a game. Your prize is:" + totalPrize + "$");
            // reset the game properties
            gameRange[1] = BASE_RANGE_MAX;
            totalPrize = 0;
            gamePrize = BASE_PRIZE;
            // asking about another game
            isAgain = confirm("Do you want to play again?");
        }
        // if continue than make game difficult
        else {
            gameRange[1] *= rangeMult;
            gamePrize *= prizeMult;
            isAgain = true;
        }

        // if not again
        if (!isAgain) {
            break;
        }
    }
}

// end of the game
console.log("You did not become a millionaire.");
