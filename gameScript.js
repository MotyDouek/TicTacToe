const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const restartButton = document.getElementById('restartButton');
let circleTurn;
let playerAIsX = true;

// using the info from the form
let playersNames = [];
new URLSearchParams(window.location.search).forEach((value, name) => {
    playersNames.push(`${value}`);
})

//players settings
let scoreArr = [0, 0];

const palyerA = document.getElementById('name-0');
const palyerB = document.getElementById('name-1');
const scoreA = document.getElementById('score-0');
const scoreB = document.getElementById('score-1');

palyerA.innerText = playersNames[0];
palyerB.innerText = playersNames[1];

//cell that shows if the player is playing on the X`s or O`s
const playerACell = document.getElementById('playerA-cell');
const playerBCell = document.getElementById('playerB-cell');

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true }) //will fire the event only once
    })
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
    scoreA.innerText = 'Score: ' + scoreArr[0];
    scoreB.innerText = 'Score: ' + scoreArr[1];
}

function handleClick(e) {

    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;

    placeMark(cell, currentClass);

    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else { //no winner, yet
        swapturns();
        setBoardHoverClass();
    }

}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!';
    } else { //we have a winner
        if (playerAIsX) { //player A  is x
            scoreArr[circleTurn ? 1 : 0]++;
        } else { //player B is x
            scoreArr[circleTurn ? 0 : 1]++;
        }
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
        switchXnO();
    }
    winningMessageElement.classList.add('show');
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapturns() {
    circleTurn = !circleTurn;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);

    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    } else { //the X`s turn
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })
}

function stepBack() {

}

function switchXnO() {
    if (playerAIsX) { //player A was x
        playerACell.classList.remove(X_CLASS);
        playerBCell.classList.remove(CIRCLE_CLASS);
        playerACell.classList.add(CIRCLE_CLASS);
        playerBCell.classList.add(X_CLASS);
    } else { //player B was x 
        playerBCell.classList.remove(X_CLASS);
        playerACell.classList.remove(CIRCLE_CLASS);
        playerBCell.classList.add(CIRCLE_CLASS);
        playerACell.classList.add(X_CLASS);
    }

    playerAIsX = !playerAIsX;
}