

// create an object that will make the moves for player 2 in AI mode.


const createAI = () => {

    console.log('Bot initiated.')
    // given the data on the board, try to make the best move

    const calculateMove = () => {
        let array = [];

        //think
        // is the game over?
        // is this the first move?
        //can i win with this move?
        // is my opponet about to win?
        // look for a fork.
        
        // need to know, the state of the board

        // whats on the board;
        gameBoard.boardArray.forEach((square) => {
            array.push(square.textContent)
          });
        console.log(array)
        //console.log(gameBoard.boardArray[].textContent)
        // method should instigate the move as if it were a person.
        console.log('Bot moving.')
      };

    return {
        move: () => calculateMove()
      };
};