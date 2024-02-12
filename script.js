const game = (() => {
  //DOM elements
  const startButton = document.querySelector(".start-button");
  const restartButton = document.querySelector(".restart-btn");
  const quitButton = document.querySelector(".quit-btn");
  const playerOne = document.getElementById("player-x");
  const playerTwo = document.getElementById("player-o");
  const outerContainer = document.querySelector(".outer-frame");
  const boardContainer = document.querySelector(".board-frame");
  const gameInforDiv = document.querySelector(".game-info");
  const boardCells = document.querySelectorAll(".cell");
  const activePlayer = document.querySelector(".active-player");

  let gameActive = true;
  let board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";

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
  const setActivePlayer = () => {
    let currentPlayerName =
      currentPlayer === "X"
        ? playerOne.value || "Player X"
        : playerTwo.value || "Player O";
    activePlayer.textContent = `${currentPlayerName}'s Turn`;
  };

  //rendor board
  const rendorBoard = () => {
    board.forEach((value, index) => {
      boardCells[index].textContent = value;
    });
  };

  //handle cell click
  const handleCellClick = (event) => {
    const cell = event.target;
    const index = cell.getAttribute("data-index");
    if (board[index] !== "" || !gameActive) {
      return;
    }
    board[index] = currentPlayer;
    rendorBoard();
    if (checkWinner()) {
      endGame(false);
    } else if (isDraw()) {
      endGame(true);
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      setActivePlayer();
    }
  };

  //check winner
  const checkWinner = () => {
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    return winningConditions.some((condition) => {
      return condition.every((index) => {
        return board[index] === currentPlayer;
      });
    });
  };

  //check draw
  const isDraw = () => {
    return board.every((cell) => {
      return cell !== "";
    });
  };

  //end game
  const endGame = (draw) => {
    if (draw) {
      displayResult(currentPlayer === "X" ? "It's a draw" : "It's a draw");
    } else {
      displayResult(
        currentPlayer === "X"
          ? `${playerOne.value || "Player X"} wins`
          : `${playerTwo.value || "Player O"} wins`
      );
    }
    gameActive = false;
  };

  //restart game
  const restartGame = () => {
    gameActive = true;
    currentPlayer = "X";
    board = ["", "", "", "", "", "", "", "", ""];
    rendorBoard();
    setActivePlayer(`${currentPlayer}'s turn`);
    gameInforDiv.textContent = "";
  };

  //quit game
  const quitGame = () => {
    outerContainer.style.display = "flex";
    boardContainer.style.display = "none";
    outerContainer.style.opacity = "1";
    boardContainer.style.opacity = "0";
    playerOne.value = "";
    playerTwo.value = "";
    restartGame();
  };

  //display result
  const displayResult = (message) => {
    gameInforDiv.textContent = message;
  };

  return { start };
})();

game.start();
