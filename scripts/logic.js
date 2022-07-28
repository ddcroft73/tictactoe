
let playerOne;     // always X
let playerTwo;     // may or may not be AI, always O

let match;         // a set of games
let matchCnt = 0;


// start a new match with new players
const initMatch = (players) => {
    createPlayers(players);
    match = createMatch();
    match.newMatch();
  };

// Creates the players and the score object for the match.
const createPlayers = players => {
    if (players.one === '') {
        playerOne = createPlayer('Player One', 'person', 'X');
    } else {
        playerOne = createPlayer(players.one, 'person', 'X');
    }

    if (players.two === '') {
        playerTwo = createPlayer('Player Two', 'person', 'O');
    } else if (players.two.toLowerCase() === 'bot') {
        playerTwo = createPlayer('AI', 'bot', 'O');
    } else {
        playerTwo = createPlayer(players.two, 'person', 'O');
    }

    gameScore.setPlayerNames(playerOne.name, playerTwo.name)
    //gameScore.updateMatch();
  };

// game Board object
let gameBoard = (() => {

    let boardArray = [];       // DOM access to the cells of the game
    let movesMade = [];        // moves in play
    let _currSquare;            // square just played
    let _boardDrawn = false;   
    let _boardHidden = false;

    // check to see if this square is available to accept the move
    const _legalMove = (thisMove) => {
        for (let i = 0; i < movesMade.length; i++) {
            if (thisMove === movesMade[i]) {
                return false;
              }
          }
        return true;
      };

    // capture the players move.
    const _getMove = (square) => {
        square.addEventListener('click', () => {
            _currSquare = square.getAttribute('data-index');
            //console.log(square.getAttribute('data-row-col'));
            if (_legalMove(_currSquare)) {
                // text effect 
                raiseSymbol(square);
                movesMade.push(_currSquare);
                // tell the game to record this move for current player
                match.move(_currSquare);
              }
          });
      };

    // draws one square\cell of the board, and sets it up in the DOM
    const _drawSquare = index => {
        const gameBoard = document.querySelector('.game-board');
        const square = document.createElement('div');
        square.classList.add('square');
        square.setAttribute('data-index', index);
        boardArray.push(square);
        gameBoard.appendChild(square);
        _getMove(square);
      };

    const _clearSquare = (index, deleteBoard) => {
        boardArray[index].textContent = '';
        if (deleteBoard) {
            const gameBoard = document.querySelector('.game-board');
            // boardArray[index].style.display = 'hidden';
            gameBoard.removeChild(boardArray[index]);
            _boardDrawn = false;
          }
      };

    // only hides the squares on cancel if the user cancelled the game.    
    const _hideBoard = () => {
        _boardHidden = true;
        boardArray.forEach((square) => {
            square.style.display = `none`
          });
        console.log('hideBoard, show intro again');
        intro.style.display = "block";
      };

    // show board after cancel when player decides to stop mucking around.
    const  _showBoard = () => {
        _boardHidden = false;
        boardArray.forEach((square) => {
            square.style.display = `block`
          });
        console.log(' hide intro and show board. ');
      }


    return {
        drawBoard: () => {
            // will use the drawSquare method to draw the squares in the shape of a board.  
            // if there is a board, do nothing. Board will only be drawn One time.
            // however in the event of a user cancel... The board will be hidden
            // when user finally decides to play, unhide the board and return so as not to draw it again.
            // but allows the instructions to be seen on cancel.
            if (_boardDrawn && !_boardHidden) {
                return;
              } else if (_boardHidden && _boardDrawn) {
                _showBoard();
                return;
              }

            for (let i = 0; i < 9; i++) {
                _drawSquare(i);
              }
            _boardDrawn = true;
          },
        // clears all the moves. 
        clearBoard: () => {
            for (let i = 0; i < 9; i++) {
                _clearSquare(i);
              }
            movesMade = [];
          },

        boardArray,
        hideBoard: () => _hideBoard(),
        showBoard: () => _showBoard(), 
        movesMade
      };
  })();

// object to track and display the score
let gameScore = (() => {

    let pOne = 0;
    let pTwo = 0;
    let tie = 0;

    const _displayScore = () => {
        let _playerOne = `<span class="score-name-one">${playerOne.name}:</span>&nbsp; <span class="score">${pOne}</span> `;
        let _playerTwo = `<span class="score-name-two">${playerTwo.name}:</span>&nbsp;  <span class="score">${pTwo}</span> `;
        let tieGame = `<span class="score-name-one"> Tie Games: <span class="score">&nbsp;&nbsp;${tie}</span></span> `;
        scorePlayer1.innerHTML = _playerOne;
        scorePlayer2.innerHTML = _playerTwo;
        playerTie.innerHTML = tieGame;

      };

    const _setTurn = player => {
        //colors the players score box depeneding on the turn
        const currBG = 'rgb(27, 26, 25)';
        const hiLiteBG = 'gray';
        const playerOne = document.querySelector('.score-playerone');
        const playerTwo = document.querySelector('.score-playertwo');
        
        if (!player) {
            playerOne.style = `background-color: ${hiLiteBG};`;
            playerTwo.style = `background-color: ${currBG};`;
          } else {
            playerTwo.style = `background-color: ${hiLiteBG};`;
            playerOne.style = `background-color: ${currBG};`;
          }
    };

    const _originalColors = () => {
        const currBG = 'rgb(27, 26, 25)';
        const playerOne = document.querySelector('.score-playerone');
        const playerTwo = document.querySelector('.score-playertwo');
        playerOne.style = `background-color: ${currBG };`;
        playerTwo.style = `background-color: ${currBG};`;
    };

    const _highlightPlayer = player => {
        player ? _setTurn(1) : _setTurn(0);
    };


    return {
        // sets the players names in the game.
        setPlayerNames: (playerOne, playerTwo) => {
            let text1 =
                `<span class="score-name-one">${playerOne}:</span>&nbsp;   <span class="score">${pOne}</span> `;
            let text2 =
                `<span class="score-name-two">${playerTwo}:</span>&nbsp;   <span class="score">${pOne}</span> `;

            scorePlayer1.innerHTML = text1;
            scorePlayer2.innerHTML = text2;
          },
        // update the scores in the game
        updateScores: player => {
            // which player?
            if (player === 'X') pOne++;
            if (player === 'O') pTwo++;
            if (player === 'tie') tie++;
            _displayScore();
          },
        selectPlayer: player => {
           _highlightPlayer(player); 
          },
        resetPlayers: () => _originalColors(),

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


// create the plyer objects
const createPlayer = (name, type, weapon) => {
    let _moves = [];
    
    if (type.toLowerCase() === 'bot') {
        bot = createAI();
      }

    const boastWin = player => {
        // split the combo into an array
        // const comboArray = strToArray(combo);
        // make the winning combo bliink 3 times
        // disable the mouse  while showing;
        disablePointer(3300);
        console.log(`Winnner: ${player} `);
      }

    // each player will do its own win check
    const checkForWin = () => {
        let cnt = 0;
        let res = false;
        let winsCombo = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [2, 4, 6],
            [0, 4, 8]
          ];
        winsCombo.forEach(row => {
            _moves.forEach(move => {
                if (row.includes(move)) {
                    cnt++;
                    if (cnt === 3) {
                        res = true;
                      }
                  }
              });
            cnt = 0;
          });
        return res;
      };

    return {
        name: name,     // if not person, name === bot
        type: type,     // person or bot
        weapon: weapon, // player one is X 2 is O, always.

        move: (squareNum) => {
            // player makes their mark
            gameBoard.boardArray[squareNum].textContent = weapon;
            _moves.push(parseInt(squareNum));
            const _totalMoves = match.totalMoves();

            // 
            if (_moves.length >= 3) {
                const winner = checkForWin();
                if (winner) {
                    boastWin(name)
                    match.nextRound(weapon);
                  } else if (_totalMoves === 9 && !winner) {
                    match.tieGame();
                    match.nextRound('tie');
                  }
              }            
          },

        clear: () => {
            // clear variables for a new game.
            _moves = [];
          }
      };
  };

// function factory creates a new Match object that can contain several games.
// Can play as many matches as wanted, 5 games per match.
const createMatch = () => {
    let _gameCnt = 0;      // runs as long as the match is alive.
    let _playerMoving = 0;
    let _totalMoves = 0;

    const _newGame = () => {
        // make sure an actual game has started so the games variable isn't
        // incremented falsely      
        gameScore.selectPlayer(0); // X always goes first
        if (_gameStarted()) {
            _gameCnt++;          
            playerOne.clear();
            playerTwo.clear();
            gameBoard.clearBoard()  // only deletes the contents. Not the square divs 
            _playerMoving = _coinToss();
            gameScore.selectPlayer(_playerMoving);  
          }
      };

    // returns true if the game has started.
    const _gameStarted = () => {
        let res = true
        for (let i = 0; i < gameBoard.boardArray.length; i++) {
            if (gameBoard.boardArray[i].textContent != '') {
                return true;
              }
          }
      };

    const  _tieGame = () => {
        console.log('Do spinning modal talking bout TIE TIE!!');
      };

    const _coinToss = () => {
        const random = Math.random();
		return random >= 0.5 ? 1 : 0;
      };

    return {
        // Move the appropriate player, this is just a recording device after the move is made on the board
        move: square => {
            _playerMoving++;
            _totalMoves++;
            
            if (_playerMoving % 2 === 0) {
                playSound('click');
                playerTwo.move(square); 
                // next players turn
                gameScore.selectPlayer(0); 
              } else {
                playSound('splat');
                playerOne.move(square);
                // If the bot is playing, then it should move after playerOne
                if (playerTwo.type === 'bot') {
                    // bot should "think" before moving.
                    bot.move();
                  }
                  // next players turn
                  gameScore.selectPlayer(1); 
              } 
          },

        // reset variables and start a new game.
        newGame: () => {    
            gameScore.resetPlayers();        
            _newGame();
          },
        // Begin new Match
        newMatch: () => {
            _gameCnt = 0;
            matchCnt++;
            gameScore.selectPlayer(0); // X always goes first
            _newGame();
          },

        nextRound: player => {
            // pause 3 seconds to let players remenice (sp?)
            _totalMoves = 0;
            setTimeout(() => match.newGame(), 3000);
            gameScore.updateScores(player);
          },

        gameCnt: () => _gameCnt,
        totalMoves: () => _totalMoves,
        tieGame: () => _tieGame()
      };
  };


