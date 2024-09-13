const box1 = document.getElementById("1");
const box2 = document.getElementById("2");
const box3 = document.getElementById("3");
const box4 = document.getElementById("4");
const box5 = document.getElementById("5");
const box6 = document.getElementById("6");
const box7 = document.getElementById("7");
const box8 = document.getElementById("8");
const box9 = document.getElementById("9");
const square = document.querySelectorAll(".square");
const allSqure = [box1, box2, box3, box4, box5, box6, box7, box8, box9];
let declareWinner = document.getElementById("Winner");
let playerText = "X";
let gameStillOn = true;
let winner = "";
let level = 0;
let playerClick = 0;
let vsPlayerGame = false;

//------------------select levels--------------------------
//-----------------Computer Opponent------------------------
const vsComputer = document.getElementById("computerVs");
vsComputer.addEventListener("click", () => {
      const addText = document.getElementById("textSelectLevel");
      addText.innerText = "Please select A level";
});

//-----------------Player Opponent------------------------

const vsPlayer = document.getElementById("playerVs");
vsPlayer.addEventListener("click", () => {
      closePopup.style.display = "none";
      playerVsPlayer();
});

function playerVsPlayer() {
      vsPlayerGame = true;
      square.forEach((elem) => {
            elem.addEventListener("click", () => {
                  if (gameStillOn === true) {
                        if (!elem.textContent) {
                              elem.textContent = playerText;
                              checkWinner();
                              if (playerText === "X") {
                                    playerText = "O";
                              } else {
                                    playerText = "X";
                              }
                        }
                        declareWinner.innerText = `${winner}`;
                  }
            });
      });
}

//-------------------Computer Turn Easy-----------------------

function computerTurn() {
      let emptySquare = allSqure.filter((elem) => !elem.textContent);
      let randCompTurn = Math.floor(Math.random() * emptySquare.length);
      if (emptySquare.length > 0) {
            emptySquare[randCompTurn].textContent = "O";
            checkWinner();
      }
}

//-------------------Computer Turn Medium-----------------------


function computerTurnMedium() {
      const emptySquare = allSqure.filter((elem) => !elem.textContent);
      const emptySquareId = allSqure
            .filter((elem) => !elem.textContent)
            .map((elem) => parseInt(elem.id));
      let cornerMove = [1, 3, 7, 9];
      let middleMove = [2, 4, 6, 8];

      //---------------------------------first Move Login-----------------------------------------

      let cornerMoveSuffle = cornerMove.filter((move) =>
            emptySquareId.includes(move)
      );
      let cornerTurn = Math.floor(Math.random() * cornerMoveSuffle.length);
      let middleMoveSuffle = middleMove.filter((e) =>
            emptySquareId.includes(e)
      );
      let middleTurn = Math.floor(Math.random() * middleMoveSuffle.length);

      //------------------------------------------------------
      function middleBox() {
            const cornerId = document.getElementById(
                  middleMoveSuffle[middleTurn]
            );
            cornerId.textContent = "O";
      }

      function cornerBox() {
            const middleId = document.getElementById(
                  cornerMoveSuffle[cornerTurn]
            );
            middleId.textContent = "O";
      }

      let playerChosenBox = "";
      //---------------------------------First Move-------------------------------------

      if (emptySquare.length >= 8) {
            if (cornerMove.includes(Number(playerClick))) {
                  if (box5.textContent === "") {
                        box5.textContent = "O";
                  } else {
                        middleBox();
                  }
            } else if (middleMove.includes(Number(playerClick))) {
                  if (box5.textContent === "") {
                        box5.textContent = "O";
                  } else {
                        cornerBox();
                  }
            } else {
                  cornerBox();
            }
            playerChosenBox = playerClick;
      }

      //---------------------------------Second Move-------------------------------------
      if (emptySquare.length > 0 && emptySquare.length < 8) {
            if (cornerMove.includes(Number(playerClick))) {
                  if (box5.textContent === "") {
                        box5.textContent = "O";
                  } else {
                        middleBox();
                        checkWinner();
                  }
            } else if (middleMove.includes(Number(playerClick))) {
                  cornerBox();
                  checkWinner();
            } else {
                  cornerBox();
                  checkWinner();
            }
      }
}

// -------------------------------JS For Select level ----------------------------------------

const lvlSelect = document.querySelectorAll(".lvl");
const closePopup = document.getElementsByClassName("createpopup")[0];

lvlSelect.forEach((elem) => {
      elem.addEventListener("click", () => {
            if (elem.id === "Easy") {
                  closePopup.style.display = "none";
                  levelOne();
            } else if (elem.id === "Medium") {
                  closePopup.style.display = "none";
                  levelTwo();
            } else if (elem.id === "Hard") {
                  closePopup.style.display = "none";
                  levelTwo();
            }
      });
});

//---------------------------------Easy Level------------------------------------------------//
function levelOne() {
      square.forEach((elem) => {
            elem.addEventListener("click", () => {
                  if (gameStillOn === true) {
                        if (!elem.textContent) {
                              elem.textContent = playerText;
                              checkWinner();
                              if (gameStillOn) {
                                    computerTurn();
                              }
                        }
                  }
                  declareWinner.innerText = `${winner}`;
            });
      });
}

//----------------------------------Medium level----------------------------------------------
function levelTwo() {
      square.forEach((elem) => {
            elem.addEventListener("click", () => {
                  if (gameStillOn === true) {
                        if (!elem.textContent) {
                              elem.textContent = playerText;
                              playerClick = elem.id;
                              checkWinner();
                              if (gameStillOn) {
                                    computerTurnMedium();
                              }
                        }
                  }
                  declareWinner.innerText = `${winner}`;
            });
      });
}

//----------------------------------Hard Level------------------------------------------------
// function levelThree() {
//       square.forEach((elem) => {
//             elem.addEventListener("click", () => {
//                   if (gameStillOn === true) {
//                         if (!elem.textContent) {
//                               elem.textContent = playerText;
//                               playerClick = elem.id;
//                               checkWinner();
//                               if (gameStillOn) {
//                                     computerTurnMedium();
//                               }
//                         }
//                   }
//                   declareWinner.innerText = `${winner}`;
//             });
//       });
// }

//-------------------------------------Reset-----------------------------------------//

let resetGame = document.querySelector(".resetgame");
resetGame.addEventListener(
      "click",
      (resetGame = () => {
            playerText = "X";
            gameStillOn = true;
            winner = "";
            square.forEach((elem) => {
                  elem.textContent = "";
            });
      })
);

//-----------------round compleate------------------

function roundRestart() {
      square.forEach((elem) => {
            elem.textContent = "";
      });
      playerText = "X";
      gameStillOn = true;
      winner = "";
}

//-------------------------------------Winner-----------------------------------------

let playerScore = document.getElementById("playerScore");
let computerScore = document.getElementById("computerScore");
let tieScore = document.getElementById("tieScore");

playerScores = 0;
computerScores = 0;
tieScores = 0;

function checkWinner() {
      let emptySquare = allSqure.filter((elem) => !elem.textContent);
      if (
            box1.textContent === "X" &&
            box2.textContent === "X" &&
            box3.textContent === "X"
      ) {
            if (vsPlayerGame === true) {
                  winner = "Player 1 Wins!";
                  gameStillOn = false;
                  playerScores += 1;
                  playerScore.innerText = playerScores;
                  setTimeout(roundRestart, 2000);
            } else {
                  winner = "Player Wins!";
                  gameStillOn = false;
                  playerScores += 1;
                  playerScore.innerText = playerScores;
                  setTimeout(roundRestart, 2000);
            }
      } else if (
            box4.textContent === "X" &&
            box5.textContent === "X" &&
            box6.textContent === "X"
      ) {
            if (vsPlayerGame === true) {
                  winner = "Player 1 Wins!";
                  gameStillOn = false;
                  playerScores += 1;
                  playerScore.innerText = playerScores;
                  setTimeout(roundRestart, 2000);
            } else {
                  winner = "Player Wins!";
                  gameStillOn = false;
                  playerScores += 1;
                  playerScore.innerText = playerScores;
                  setTimeout(roundRestart, 2000);
            }
      } else if (
            box7.textContent === "X" &&
            box8.textContent === "X" &&
            box9.textContent === "X"
      ) {
            if (vsPlayerGame === true) {
                  winner = "Player 1 Wins!";
                  gameStillOn = false;
                  playerScores += 1;
                  playerScore.innerText = playerScores;
                  setTimeout(roundRestart, 2000);
            } else {
                  winner = "Player Wins!";
                  gameStillOn = false;
                  playerScores += 1;
                  playerScore.innerText = playerScores;
                  setTimeout(roundRestart, 2000);
            }
      } else if (
            box1.textContent === "X" &&
            box4.textContent === "X" &&
            box7.textContent === "X"
      ) {
            if (vsPlayerGame === true) {
                  winner = "Player 1 Wins!";
                  gameStillOn = false;
                  playerScores += 1;
                  playerScore.innerText = playerScores;
                  setTimeout(roundRestart, 2000);
            } else {
                  winner = "Player Wins!";
                  gameStillOn = false;
                  playerScores += 1;
                  playerScore.innerText = playerScores;
                  setTimeout(roundRestart, 2000);
            }
      } else if (
            box2.textContent === "X" &&
            box5.textContent === "X" &&
            box8.textContent === "X"
      ) {
            if (vsPlayerGame === true) {
                  winner = "Player 1 Wins!";
                  gameStillOn = false;
                  playerScores += 1;
                  playerScore.innerText = playerScores;
                  setTimeout(roundRestart, 2000);
            } else {
                  winner = "Player Wins!";
                  gameStillOn = false;
                  playerScores += 1;
                  playerScore.innerText = playerScores;
                  setTimeout(roundRestart, 2000);
            }
      } else if (
            box3.textContent === "X" &&
            box6.textContent === "X" &&
            box9.textContent === "X"
      ) {
            if (vsPlayerGame === true) {
                  winner = "Player 1 Wins!";
                  gameStillOn = false;
                  playerScores += 1;
                  playerScore.innerText = playerScores;
                  setTimeout(roundRestart, 2000);
            } else {
                  winner = "Player Wins!";
                  gameStillOn = false;
                  playerScores += 1;
                  playerScore.innerText = playerScores;
                  setTimeout(roundRestart, 2000);
            }
      } else if (
            box1.textContent === "X" &&
            box5.textContent === "X" &&
            box9.textContent === "X"
      ) {
            if (vsPlayerGame === true) {
                  winner = "Player 1 Wins!";
                  gameStillOn = false;
                  playerScores += 1;
                  playerScore.innerText = playerScores;
                  setTimeout(roundRestart, 2000);
            } else {
                  winner = "Player Wins!";
                  gameStillOn = false;
                  playerScores += 1;
                  playerScore.innerText = playerScores;
                  setTimeout(roundRestart, 2000);
            }
      } else if (
            box3.textContent === "X" &&
            box5.textContent === "X" &&
            box7.textContent === "X"
      ) {
            if (vsPlayerGame === true) {
                  winner = "Player 1 Wins!";
                  gameStillOn = false;
                  playerScores += 1;
                  playerScore.innerText = playerScores;
                  setTimeout(roundRestart, 2000);
            } else {
                  winner = "Player Wins!";
                  gameStillOn = false;
                  playerScores += 1;
                  playerScore.innerText = playerScores;
                  setTimeout(roundRestart, 2000);
            }
      } else if (
            box1.textContent === "O" &&
            box2.textContent === "O" &&
            box3.textContent === "O"
      ) {
            if (vsPlayerGame === true) {
                  winner = "Player 2 Wins!";
                  gameStillOn = false;
                  playerScores += 1;
                  playerScore.innerText = playerScores;
                  setTimeout(roundRestart, 2000);
            } else {
                  winner = "Computer Wins!";
                  gameStillOn = false;
                  computerScores += 1;
                  computerScore.innerText = computerScores;
                  setTimeout(roundRestart, 2000);
            }
      } else if (
            box4.textContent === "O" &&
            box5.textContent === "O" &&
            box6.textContent === "O"
      ) {
            if (vsPlayerGame === true) {
                  winner = "Player 2 Wins!";
                  gameStillOn = false;
                  playerScores += 1;
                  playerScore.innerText = playerScores;
                  setTimeout(roundRestart, 2000);
            } else {
                  winner = "Computer Wins!";
                  gameStillOn = false;
                  computerScores += 1;
                  computerScore.innerText = computerScores;
                  setTimeout(roundRestart, 2000);
            }
      } else if (
            box7.textContent === "O" &&
            box8.textContent === "O" &&
            box9.textContent === "O"
      ) {
            if (vsPlayerGame === true) {
                  winner = "Player 2 Wins!";
                  gameStillOn = false;
                  playerScores += 1;
                  playerScore.innerText = playerScores;
                  setTimeout(roundRestart, 2000);
            } else {
                  winner = "Computer Wins!";
                  gameStillOn = false;
                  computerScores += 1;
                  computerScore.innerText = computerScores;
                  setTimeout(roundRestart, 2000);
            }
      } else if (
            box1.textContent === "O" &&
            box4.textContent === "O" &&
            box7.textContent === "O"
      ) {
            if (vsPlayerGame === true) {
                  winner = "Player 2 Wins!";
                  gameStillOn = false;
                  playerScores += 1;
                  playerScore.innerText = playerScores;
                  setTimeout(roundRestart, 2000);
            } else {
                  winner = "Computer Wins!";
                  gameStillOn = false;
                  computerScores += 1;
                  computerScore.innerText = computerScores;
                  setTimeout(roundRestart, 2000);
            }
      } else if (
            box2.textContent === "O" &&
            box5.textContent === "O" &&
            box8.textContent === "O"
      ) {
            if (vsPlayerGame === true) {
                  winner = "Player 2 Wins!";
                  gameStillOn = false;
                  playerScores += 1;
                  playerScore.innerText = playerScores;
                  setTimeout(roundRestart, 2000);
            } else {
                  winner = "Computer Wins!";
                  gameStillOn = false;
                  computerScores += 1;
                  computerScore.innerText = computerScores;
                  setTimeout(roundRestart, 2000);
            }
      } else if (
            box3.textContent === "O" &&
            box6.textContent === "O" &&
            box9.textContent === "O"
      ) {
            if (vsPlayerGame === true) {
                  winner = "Player 2 Wins!";
                  gameStillOn = false;
                  playerScores += 1;
                  playerScore.innerText = playerScores;
                  setTimeout(roundRestart, 2000);
            } else {
                  winner = "Computer Wins!";
                  gameStillOn = false;
                  computerScores += 1;
                  computerScore.innerText = computerScores;
                  setTimeout(roundRestart, 2000);
            }
      } else if (
            box1.textContent === "O" &&
            box5.textContent === "O" &&
            box9.textContent === "O"
      ) {
            if (vsPlayerGame === true) {
                  winner = "Player 2 Wins!";
                  gameStillOn = false;
                  playerScores += 1;
                  playerScore.innerText = playerScores;
                  setTimeout(roundRestart, 2000);
            } else {
                  winner = "Computer Wins!";
                  gameStillOn = false;
                  computerScores += 1;
                  computerScore.innerText = computerScores;
                  setTimeout(roundRestart, 2000);
            }
      } else if (
            box3.textContent === "O" &&
            box5.textContent === "O" &&
            box7.textContent === "O"
      ) {
            if (vsPlayerGame === true) {
                  winner = "Player 2 Wins!";
                  gameStillOn = false;
                  playerScores += 1;
                  playerScore.innerText = playerScores;
                  setTimeout(roundRestart, 2000);
            } else {
                  winner = "Computer Wins!";
                  gameStillOn = false;
                  computerScores += 1;
                  computerScore.innerText = computerScores;
                  setTimeout(roundRestart, 2000);
            }
      } else if (emptySquare.length === 0) {
            if (vsPlayerGame === true) {
                  winner = "Player 2 Wins!";
                  gameStillOn = false;
                  playerScores += 1;
                  playerScore.innerText = playerScores;
                  setTimeout(roundRestart, 2000);
            } else {
                  winner = "its tie!";
                  gameStillOn = false;
                  tieScores += 1;
                  tieScore.innerText = tieScores;
                  setTimeout(roundRestart, 2000);
            }
      }
}
