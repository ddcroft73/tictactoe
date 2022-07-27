/*
 *-----------------------------------------------------------------------------------------------
 *   Functions to initialize the match and create all the objects for the games\matches
 * 
 * 
 * -----------------------------------------------------------------------------------------------
 */

 


// capitilize the first word of all words in an object
// this is useless.
const capitalizeAll = (obj) => {    
    for (let item in obj) {
        obj[item] = obj[item].replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
      }
    return obj;
  };

// removes the div witht the instructons on the gameBoard
const removeIntro = () => {
    const gameBoardDiv = document.querySelector('.game-board');
    const nodeList = document.querySelectorAll('.intro-container');
    if (nodeList.length > 0){
        nodeList[0].style.display = 'none';
        //gameBoardDiv.removeChild(nodeList[0]);
      }
  };


// plays sounds for X and O symbols
const playSound = (clip) => {
    let sound;
    if (clip ==='click'){
       sound = document.getElementById("audio");
      //   sound.play();
      } else {
         sound = document.getElementById("audio2");
      //  sound.play();
      }
    
};

// splits a string into an array
// just found out I could just string.split()...
const strToArray = (string) => {
    let array = [];

    for (let i = 0; i < string.length; i++) {
        array.push(string[i]);        
      }
    return array;
  };

// makes the X or O have a pressing effect once before going back to normal.
const raiseSymbol = (square) => {
    setTimeout(()=>square.style = 'text-shadow: 8px 8px 4px  rgba(0, 0, 0, 0.5);',100 )
    square.style = 'text-shadow: 0px 0px 0px  rgba(0, 0, 0, 0.5);'
  };

const disablePointer = (interval) => {
    for (i = 0; i< gameBoard.boardArray.length; i++){
        gameBoard.boardArray[i].style = `pointer-events: none;`;
    }
    setTimeout(()=> enablePointer(), interval);
  };

const enablePointer = () => {
    for (i = 0; i< gameBoard.boardArray.length; i++){
        gameBoard.boardArray[i].style = `pointer-events: auto;`;
      }
  }