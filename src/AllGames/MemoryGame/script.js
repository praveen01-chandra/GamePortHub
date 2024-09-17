showPopup = () => {
      
};

const cardsArr = [
      { name: "img1", img: "images/card1.jpg" },
      { name: "img1", img: "images/card1.jpg" },
      { name: "img2", img: "images/card2.jpg" },
      { name: "img2", img: "images/card2.jpg" },
      { name: "img3", img: "images/card3.jpg" },
      { name: "img3", img: "images/card3.jpg" },
      { name: "img4", img: "images/card4.jpg" },
      { name: "img4", img: "images/card4.jpg" },
      { name: "img5", img: "images/card5.jpg" },
      { name: "img5", img: "images/card5.jpg" },
      { name: "img6", img: "images/card6.png" },
      { name: "img6", img: "images/card6.png" },
];
let result = document.querySelector(".score");
let move = document.querySelector(".move");
let chosenCard = [];
let chosenCardIds = [];
let matchFound = [];

let totalMove = 0;
let rightGuess = 0;

//randomize the cards
function game() {
      cardsArr.sort(() => Math.floor(Math.random() - 0.5));

      const creatImg = document.querySelector("#tempImages");

      function createElemet() {
            cardsArr.forEach((elem, index) => {
                  //DOM manipulation add element to html
                  const card = document.createElement("img");
                  card.classList.add("img");
                  card.setAttribute("src", "images/card.jpg");
                  card.id = index;
                  creatImg.append(card);

                  //Add eventlistner click
                  card.addEventListener("click", flipCard);
            });
      }
      createElemet();
}
game();

//flip the card on click
function flipCard() {
      let dataId = this.id;
      let selectedCard = cardsArr[dataId];

      //prevent twice selection of same card
      if (chosenCardIds.includes(dataId)) {
            return;
      }

      // pushing cards and card id to check if they are same or not
      chosenCard.push(selectedCard);
      chosenCardIds.push(dataId);
      this.setAttribute("src", selectedCard.img);

      //Checking winner after 2 cards selected
      if (chosenCard.length === 2) {
            setTimeout(checkMatch, 100);
            totalMove++;
            move.innerText = `Total Move ${totalMove}`;
      }
}

//check if card match or not
function checkMatch() {
      const cards = document.querySelectorAll("#tempImages img");
      let card1 = cards[chosenCardIds[0]];
      let card2 = cards[chosenCardIds[1]];

      //check card same or not
      if (chosenCard[0].img == chosenCard[1].img) {
            card1.classList.add("opa");
            card2.classList.add("opa");
            card1.removeEventListener("click", flipCard);
            card2.removeEventListener("click", flipCard);
            matchFound.push(chosenCard);

            rightGuess++;
            result.innerText = `Total Score ${rightGuess}`;
            if (rightGuess === cardsArr.length / 2) {
                  document.querySelector(".score").innerText = "you won!";
                  setTimeout(resetGame, 2000);
            }
      } else {
            setTimeout(() => {
                  card1.setAttribute("src", "images/card.jpg");
                  card2.setAttribute("src", "images/card.jpg");
            }, 1000);
      }

      chosenCard = [];
      chosenCardIds = [];
}

//This will restart the game immideatly
const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", resetGame);

function resetGame() {
      chosenCard = [];
      chosenCardIds = [];
      matchFound = [];

      totalMove = 0;
      rightGuess = 0;

      result.innerText = `Total Score ${rightGuess}`;
      move.innerText = `Total Move ${totalMove}`;

      const cards = document.querySelectorAll("#tempImages img");
      cards.forEach((card) => {
            card.setAttribute("src", "images/card.jpg");
            card.classList.remove("opa");
            card.addEventListener("click", flipCard);
      });

      cardsArr.sort(() => Math.floor(Math.random() - 0.5));
}