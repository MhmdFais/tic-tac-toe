const game = (() => {
  //DOM elements
  const startButton = document.querySelector(".start-button");
  const gameBoard = document.querySelector(".board-frame");
  const restartButton = document.querySelector(".restart-btn");
  const quitButton = document.querySelector(".quit-btn");
  const playerOne = document.getElementById("player-x");
  const playerTwo = document.getElementById("player-o");
  const outerContainer = document.querySelector(".outer-frame");
  const boardContainer = document.querySelector(".board-frame");
  const gameInforDiv = document.querySelector(".game-info");
  const playerXInfo = document.querySelector(".player-x-info");
  const playerOInfo = document.querySelector(".player-o-info");
  const boardCells = document.querySelectorAll(".cell");
  const activePlayer = document.querySelector(".active-player");

  const start = () => {
    startButton.addEventListener("click", setDisplay);
    rendorBoard();
    boardCells.forEach((cell) => {
      cell.addEventListener("click", handleCellClick);
    });
    restartButton.addEventListener("click", restartGame);
    quitButton.addEventListener("click", quitGame);
  };

  //set display to none for outer container and display grid for board container
  const setDisplay = () => {
    //get player names
    // default names if no input
    let playerX = playerOne.value || "X";
    let playerO = playerTwo.value || "O";

    //set player names
    document.querySelector(".player-x").textContent = playerX;
    document.querySelector(".player-o").textContent = playerO;

    //set active player
    let currentPlayer = playerX;
    setActivePlayer(`${currentPlayer}'s turn`);

    //set display
    outerContainer.style.opacity = "0";
    setTimeout(() => {
      outerContainer.style.display = "none";
      boardContainer.style.display = "grid";
      setTimeout(() => {
        boardContainer.style.opacity = "1";
      }, 50); // Delay for a smoother transition
    }, 500);
  };

  //set active player
  const setActivePlayer = (message) => {
    activePlayer.textContent = message;
  };

  //rendor board
  const rendorBoard = () => {
    board.forEach((value, index) => {
      boardCells[index].textContent = value;
    });
  };

  //handle cell click

  return { start };
})();

game.start();
