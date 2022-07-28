

const intro = document.querySelector('.intro-container');
const modal = document.getElementById("modal");
const startGame = document.getElementById("start-game");
const span = document.getElementsByClassName("close")[0];
const playerTwoLabel = document.querySelector('.player2');
const playerTwoName = document.querySelector('#player2');
const playerOneName = document.querySelector('#player1');
const toolTipBotInfo = document.querySelector('.tooltip-bot-info');
const modalContent = document.querySelector('.modal-content');
const cancel = document.querySelector('#cancel');
const create = document.querySelector('#create');

const scorePlayer1 = document.querySelector('.score-playerone');
const scorePlayer2 = document.querySelector('.score-playertwo');  //
const playerTie = document.querySelector('.player-tie');

(() =>{
    // counter style some of the shadow game container.
    const gameBoardDiv = document.querySelector('.game-board');
    gameBoardDiv.style = `
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.0), 0 0px 0px 0 rgba(200, 202, 200, 0.19);`    
})();

/* NEW GAME */
const newGame = document.querySelector('.new-game');
newGame.addEventListener('click', function(){
    // start a new game of a previous match
    if (match) {
        match.newGame();
        //gameScore.updateMatch();
    }
});

/* MODAL EVENTS */
/* Events and actions for showing and closing the modal */
//const resetBtn = document.getElementById('reset');

//show
startGame.addEventListener('click', () => {
    // see if the intro is there. if so remove it.
    removeIntro();    
    modal.style.display = "block";
    // Was the board hidden due to  cancel, or removed?
    gameBoard.drawBoard();

});

// close button
span.addEventListener('click', () => modal.style.display = "none");
span.addEventListener('mouseenter', () =>toolTipBotInfo.style = 'visibility: invisible');
// click outside modal window
window.addEventListener('click', (event) =>{
    if (event.target == modal) {
        modal.style.display = "none";

    }
});      

/* tooltips about BOT AI */
playerTwoLabel.addEventListener('mouseenter', () => {
    toolTipBotInfo.style = 'visibility: visible';
});

playerTwoName.addEventListener('click', () => {
    toolTipBotInfo.style = 'visibility: invisible';
});

playerOneName.addEventListener('mouseenter', () => {
    toolTipBotInfo.style = 'visibility: invisible';
});

playerTwoName.addEventListener('keydown', () => {
    toolTipBotInfo.style = 'visibility: invisible';
});
toolTipBotInfo.addEventListener('mouseenter', () => {
    toolTipBotInfo.style = 'visibility: invisible';
});

/** event listeners for modal actioin buttons */
cancel.addEventListener('click', () => {
    modal.style.display = "none";
    gameBoard.hideBoard();

});

create.addEventListener('click', () => {
    let playersNames = {
        one: playerOneName.value,
        two: playerTwoName.value
    };
    
    initMatch(playersNames);
    playerOneName.value = '';
    playerTwoName.value = '';
    modal.style.display = "none";
});


cancel.addEventListener('mouseenter', () => {
    toolTipBotInfo.style = 'visibility: invisible';
});
create.addEventListener('mouseenter', () => {
    toolTipBotInfo.style = 'visibility: invisible';
});

