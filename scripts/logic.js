
// the players of the game... global variables
let playerOne;
let playerTwo;     // may or may not be AI

let match;         // a set of games
let matchCnt = 0;

/*
       0 1 2
       3 4 5
       6 7 8

 wining combinations:  across:   0-1-2, 3-4-5, 6-7-8, 
                       vertical:  0-3-6, 1-4-7, 2-5-8
                       diagonal:  0-4-8. 2-4-6
*/

// start a new match with new players
function initMatch(players) {

    players = capitalizeAll(players);
    createPlayers(players);
    match = createMatch();

    match.newMatch();
}

// Creates the players for the match and the score object for the match.
function createPlayers(players) {
    //if there are no names entered or one name and not "bot", assign
    // the default
    //console.log(`Player1: ${players.one} Player2: ${players.two}`)

    if (players.one === '') {
        playerOne = createPlayer('Player One', 'person', 'X');
    } else {
        playerOne = createPlayer(players.one, 'person', 'X');
    }
    
    if (players.two === '') {
        playerTwo = createPlayer('Player Two', 'person', 'O');
    } else if (players.two === 'Bot'){
        playerTwo = createPlayer('AI', 'bot', 'O'); 
    } else {
        playerTwo = createPlayer(players.two, 'person', 'O'); 
    }    

    gameScore.setPlayerNames(playerOne.name, playerTwo.name)
    gameScore.updateMatch();    
}

let gameBoard = (() => {

    let boardArray = [];  // access to each square
    let movesMade = [];
    let currSquare;
    let _boardDrawn = false;  
    //let enabled = true; 
    
    // check the movesMade array to see if this move is in it.
    // if it is, return false, true if not
    function legalMove(thisMove) {
        for (let i = 0; i < movesMade.length; i++) {
            if (thisMove === movesMade[i]) {
                return false;
            }
        }
        return true;
    }
    
    function getMove(square) {
            square.addEventListener('click', () => {
                currSquare = square.getAttribute('data-index');
                if (legalMove(currSquare)) {
                    // effect 
                    raiseSymbol(square);           
                    movesMade.push(currSquare);
                    // tell the game to record this move for current player
                    match.move(currSquare);
                }                        
            });
        
    }

    function drawSquare(index) {
        // draws a square        
        // <div class="square"></div>
        const gameBoard = document.querySelector('.game-board');
        //const squareText = `<div class="square" data-index="${index}"></div>`

        const square = document.createElement('div');
        square.classList.add('square');
        square.setAttribute('data-index', index); // set the index    

        boardArray.push(square);
        gameBoard.appendChild(square);
        getMove(square); 
        
    } 
    
    

    function clearSquare(index, deleteBoard) { 
        boardArray[index].textContent = '';     
        if (deleteBoard) {
            const gameBoard = document.querySelector('.game-board');
            gameBoard.removeChild(boardArray[index]) ;
            _boardDrawn = false;
        }
    }
    
    return {

        drawBoard:  () => { 
            // will use the drawSquare method to draw the squares in the shape of a board.  
            // if there is a board, do nothing. Board will only be drawn One time.
            if (_boardDrawn) return;
            for (let i = 0; i < 9; i++) {
                drawSquare(i);
            }    
            _boardDrawn = true;
        },

        clearBoard: (deleteSquare) => {
            for (let i = 0; i < 9; i++) {
                clearSquare(i, deleteSquare);
            }
            movesMade = [];    
        }, 
     
        boardArray
    }    
})();

// object to track and display the score
let gameScore = (() => {
     
    let pOne = 0;
    let pTwo = 0;    
    
    displayScore = () => {
        let text1 =
        `<span class="score-name-one">${playerOne.name}</span>&nbsp; [ ${pOne} ]`;
        let text2 = 
        `<span class="score-name-two">${playerTwo.name}</span>&nbsp; [ ${pTwo} ]`;
        scorePlayer1.innerHTML = text1;
        scorePlayer2.innerHTML = text2;
    }

    return {
         // sets the players names in the game.
         setPlayerNames: (playerOne, playerTwo) => {
             let text1 =
             `<span class="score-name-one">${playerOne}</span>&nbsp; [ ${pOne} ]`;
             let text2 = 
             `<span class="score-name-two">${playerTwo}</span>&nbsp; [ ${pTwo} ]`;

             scorePlayer1.innerHTML = text1;
             scorePlayer2.innerHTML = text2;
         },

         initMatch: () => {
             let text = `Match: 0   Game: 0`;
             const matchInfo = document.querySelector('.match-info');
             matchInfo.innerHTML = text;
         },
         // updates any changes to the matches.
         updateMatch: () => {
            let text;
            if (matchCnt === 0) {
                text = `Match: 1   Game: 0`;
            } else {
                text = `Match: ${matchCnt}   Game: ${match.gameCnt()}`;
            }             
             const matchInfo = document.querySelector('.match-info');
             matchInfo.textContent = text;
         },

         // update the scores in the game
         updateScores: (player) => {
             // which player?
             if (player==='X') pOne++;
             if (player==='O') pTwo++;
             displayScore();
         },
         // get the pOne score
         get getPOne() {
            return this.pOne;
         },
          // get the pTwo score
          get getPTwo() {
            return this.pTwo;
         }
    };

})();


// function factory creates players
const createPlayer = (name, type, weapon) => {    
    let moves = [];
    let winningCombo;
    let direction;
    let win;

    // is this the bot?
    if(type.toLowerCase() === 'bot') {
        // create the AI object then...
        bot = createAI();
    }

    const winingCombos = {
        vertcal: ['036', '147', '258'],
        horiz:   ['012', '345', '678'],
        diag:    ['048', '246']
    }
    
    function boastWin(player, direction, combo) {
        // split the combo into an array
        const comboArray = strToArray(combo);
        // make the winning combo bliink 3 times
        //disable the mouse  while showing;
        disablePointer(3300);
        console.log(`Winnner: ${player} ${direction}: ${combo}`);
    }
    
    // each player checks to see if it won
    //
    // sort the moves and join them into a string, 
    // loop through the winning combos in the object
    // if the moves string matches one of the winningCombos... Player wins.
    function  checkForWin() {
        let winner = false;        

        let movesString = moves.sort().join('');

        for (let key in winingCombos) {
            for (let item in winingCombos[key]){
                for (let i = 0; i < moves.length; i++){
                    if (movesString ==  winingCombos[key][item]) {
                        winningCombo = winingCombos[key][item];
                        direction = key;
                        winner = true;
                    }
                }
            }
        }
        return winner;
    }
    
    // the start of developiong AI

    

    return {

        name: name,     // if not person, name === bot
        type: type,     // person or bot
        weapon: weapon, // player one is X 2 is O, always.
       // wins: [],
        
        move: (squareNum) => {
            // makethe appro
            gameBoard.boardArray[squareNum].textContent =  weapon;
            moves.push(squareNum)
            
            // have all the moves been made?

            const _totalMoves = match.totalMoves();
            const won = checkForWin();
            if (won) {                
                boastWin(name, direction, winningCombo)
                match.nextRound(weapon);
            } else if ((_totalMoves === 9)){
                match.nextRound(weapon);
            }
        },

        clear: () => {
            // clear variables for a new game.
            moves = [];
        }        
    };
}

// function factory creates a new Match object that can contain several games.
// Can play as many matches as wanted, 5 games per match.
const createMatch = () => {

    let _gameCnt = 0;      // runs as long as the match is alive.
    let playerMoving = 0;
    let _totalMoves = 0;

    function _newGame() {    
        // is it though?      
        if (gameStarted())  {
            _gameCnt++;
            playerMoving = 0            
            playerOne.clear();
            playerTwo.clear();
            gameBoard.clearBoard()   
        }   
    }
    
    // returns true if the game has started.
    function gameStarted() {
        let res = true
        for(let i = 0; i < gameBoard.boardArray.length; i++) {
            if (gameBoard.boardArray[i].textContent != '') {
                return true;
            }
        }
    }

    // the game should know whos turn it is, and record the move for the player. Game is responsoble for
    // facilitaintg the flow of the game.
    return {
        // Move the appropriate player, this is just a recording device after the move is made om the board
        move: (square) => {
            playerMoving++;
            _totalMoves++;
            if (playerMoving % 2 === 0){
               playSound('click');
               playerTwo.move(square);
            } else{ 

               playSound('splat');
               playerOne.move(square);      
               // game senses that its time for the BOT to move... move it
               if(playerTwo.type === 'bot')  {
                bot.move();
              }
            }
        },

        // reset variables and start a new game.
        newGame: () => {
            _newGame();
        },
        // Begin new Match
        newMatch: () => {

            _gameCnt = 0;
            matchCnt++;
            _newGame();
        },

        nextRound: (player) => {
            // pause 3 seconds to let players remenice (sp?)
            setTimeout(() => match.newGame(), 3000);  
            gameScore.updateScores(player)
        },

        gameCnt: () => _gameCnt,
        totalMoves: () => _totalMoves
    };
}


