

// create an object that will make the moves for player 2 in AI mode.


const createAI = () => {

    console.log('Bot initiated.')
    // given the data on the board, try to make the best move
    function calculateMove() {
        let array = [];
        // whats on the board;
        gameBoard.boardArray.forEach((square) => {
            array.push(square.textContent)
        });
        console.log(array)
        //console.log(gameBoard.boardArray[].textContent)
        // method should instigate the move as if it were a person.
        console.log('Bot moving.')
    }

    return {
        move: () => calculateMove()
    };

}