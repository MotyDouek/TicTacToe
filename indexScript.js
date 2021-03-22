let playerARolled = false;
let playerBRolled = false;
let dice0;
let dice1
const text = document.getElementById("results-msg");

function diceRoll0() {
    // 1. Random number
    dice0 = Math.floor(Math.random() * 6) + 1;

    //2. Display the result
    document.getElementById('dice-0').style.display = 'block';
    document.getElementById('dice-0').src = 'Images/dice/dice-' + dice0 + '.png';
    document.getElementById('btn-0').style.visibility = 'hidden';
    playerARolled = true;
    whosFirst();
}

function diceRoll1() {
    // 1. Random number
    dice1 = Math.floor(Math.random() * 6) + 1;

    //2. Display the result
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-1').src = 'Images/dice/dice-' + dice1 + '.png';
    document.getElementById('btn-1').style.visibility = 'hidden';
    playerBRolled = true;
    whosFirst();
}

function whosFirst() {
    if (playerARolled && playerBRolled) {
        if (dice0 == dice1) { //draw
            text.innerHTML = "We have a Draw! please roll again.";
            document.getElementById('btn-0').style.visibility = 'visible';
            document.getElementById('btn-1').style.visibility = 'visible';
            playerARolled = false;
            playerBRolled = false;
        } else if (dice0 > dice1) { //player A will start
            text.innerHTML = "Player A play first";
            document.getElementById('btn-submit').style.visibility = 'visible';
        } else {
            text.innerHTML = "Player B play first";
            document.getElementById('btn-submit').style.visibility = 'visible';
            swapNames();
        }
    }
}

function swapNames() {
    let playerA = document.getElementById('playerA');
    let playerB = document.getElementById('playerB');
    let temp = document.getElementById('temp');

    temp.value = playerB.value;
    playerB.value = playerA.value;
    playerA.value = temp.value;
}
