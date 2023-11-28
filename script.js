const gameBoard = (function (){
    let array = ["1","2","3","4","5","6","7","8","9"];

    const insertMarker = (position, marker) => {
        if(array[position] == "X" || array[position] == "O"){
            position = prompt("This position is already filled.  Please make another choice: ");
            insertMarker(position-1, marker);
        } else{     
        array.splice(position, 1, marker);
        console.log(array);
        }
    }

   const resetBoard = () => {
        console.log(array);
        array = ["1","2","3","4","5","6","7","8","9"];
        console.log(array);
   } 

   const displayBoard = () =>{
        console.log("The current board state");
        console.log(array[0],array[1],array[2]);
        console.log(array[3],array[4],array[5]);
        console.log(array[6],array[7],array[8]);
   }

   const winCondition = (marker) =>{
        console.log(marker); //can remove
        //check for any winning combination using current marker
        if((array[0] === marker  && array[1] === marker && array[2] === marker) || 
            (array[3] === marker && array[4] === marker && array[5] === marker) || 
                (array[6] === marker && array[7]=== marker && array[8] === marker) ||
                    (array[0] === marker  && array[3] === marker && array[6] === marker) ||
                        (array[1] === marker && array[4] === marker && array[7] === marker) ||
                            (array[2] === marker && array[5] === marker && array[8] === marker) ||
                                (array[0] === marker && array[4] === marker && array[8] === marker) ||
                                    (array[2] === marker && array[4] === marker && array[6] === marker)){
            
            game.gameEnd();
        } else {
            return;
        }
   }

   return{insertMarker, resetBoard, displayBoard, winCondition};

})();


function createPlayer (playerName, playerMarker){
    
    const name = playerName;
    const marker = playerMarker;

    return {name, marker};
}


const game = (function (){

    let player1 = createPlayer("Player 1", "X");
    let player2 = createPlayer("Player 2", "O");
    let currentPlayer = player1;
    let gameWon = false;


    const welcome = () => {
        alert("Welcome to Tic Tac Toe")
        player1.name = setPlayerName(player1.name);
        player2.name = setPlayerName(player2.name);
        console.log(player1, player2);  //can remove
        gameBoard.displayBoard()
        round(currentPlayer);
    }

    const setPlayerName = (player) => {
        return prompt(`Please enter the name of ${player}:`);
    }

    const switchPlayer = () => {
        if (currentPlayer == player1){
            currentPlayer = player2;
            round(currentPlayer);
        } else{
            currentPlayer = player1;
            round(currentPlayer);
        }
    }

    const round = (player) => {
        let position = prompt(`${player.name}'s turn.  Please choose the position to place your marker (1-9):`);
        gameBoard.insertMarker(position-1, player.marker);
        gameBoard.displayBoard();
        gameBoard.winCondition(player.marker);
        if (gameWon === false){
            game.switchPlayer();
        } else {
            reset();
        }
    }

    const gameEnd = () => {
        console.log(`${currentPlayer.name} wins!!!!!!!!!`);
        gameWon = true
    }

    const reset = () => {
        gameBoard.resetBoard();
        player1 = createPlayer("Player 1", "X");
        player2 = createPlayer("Player 2", "O");
        currentPlayer = player1;
        gameWon = false;

        let playAgain = prompt("Do you want to play again (Yes / No)?");
        if (playAgain === "Yes"){
            console.log("TIme for a rematch!")
            game.welcome();
        } else {
            console.log("Thanks for playing, come back for a rematch!");

        }

    }


    return{welcome, round, switchPlayer, gameEnd};
})();

game.welcome()