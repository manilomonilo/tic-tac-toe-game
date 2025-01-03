const gameBox = document.querySelectorAll(".game-box");
const box = document.querySelectorAll(".x-o");

// function for changing the paragraph text
const para = document.querySelector(".guid-text");
function changePara(text) {
    para.textContent = text;
}

// function to check if someone win or no one

let gameBoxFields = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
let clickedButtons = new Set();

function someoneWin(winner) {
    let gameBoxFieldsString = gameBoxFields.toString().replaceAll(",", "");

    console.log(winner)
    let regex = "^x{3}.{6}$|^.{3}x{3}.{3}$|^.{6}x{3}$|^x.{2}x.{2}x.{2}$|^.x.{2}x.{2}x.$|^.{2}x.{2}x.{2}x$|^x.{3}x.{3}x$|^.{2}x.x.x.{2}$";
    regex = regex.replaceAll("x", winner);
    regex = new RegExp(regex, "i");
    let wins = regex.test(gameBoxFieldsString);

    if (clickedButtons.size === gameBox.length) {
        changePara(`No one wins :|`)
    }

    if (wins) {
        changePara(`The winner is the player ${winner}`)
        let audio = new Audio('assets/win.mp3');
        audio.play();
    } else if (clickedButtons.size === gameBox.length) {
        console.log("No one wins :|");
    }

    return wins
}

// loop for applying listeners and the action after it
let playerTurn = "x";
let gameOver = false;

for (let i = 0; i < gameBox.length; i++) {
    function functionName() {
        if (gameOver) return;
        let audio = new Audio('assets/pop.mp3');  // Provide the audio file path
        audio.play();  // Play the audio

        clickedButtons.add(gameBox[i]);
        if (playerTurn === "x") {
            box[i].classList.add("x");
            gameBoxFields.splice(i, 1, "x");

            if (someoneWin(playerTurn)) {
                gameOver = true;
            } else if (clickedButtons.size === gameBox.length) {
                changePara(`No one wins :|`)
            } else {
                playerTurn = "o";
                changePara("It's O player turn");
            }
        } else {
            box[i].classList.add("o");
            gameBoxFields.splice(i, 1, "o");

            if (someoneWin(playerTurn)) {
                gameOver = true;
            } else {
                playerTurn = "x";
                changePara("It's X player turn");
            }
        }
    }

    gameBox[i].addEventListener("click", functionName, { once: true });
}


// restart Button
let restartButton = document.querySelector(".restart-btn");

restartButton.addEventListener("click", () => {
    location.reload(true);
});
