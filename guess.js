import { showPopUp } from "./popup.js";

//?  Create Game Settings
let gameName = "Guess The Word";
document.querySelector(".game-name").textContent = gameName;
document.querySelector("footer").textContent =
  `${gameName} Game Created By Mohamed Alkenani`;

//? Setting Game Options

let numbersOfTries = 6;
let numbersOfLetters = 6;
let currentTry = 1;
let numberOfHints = 2;
let wordToGuess = "";
let wordList = [
  "Family",
  "Doctor",
  "Animal",
  "Nature",
  "School",
  "Person",
  "Friend",
  "Mother",
  "Father",
  "Sister",
  "Player",
  "Artist",
  "Writer",
  "Singer",
  "Dancer",
];
wordToGuess =
  wordList[Math.floor(Math.random() * wordList.length)].toLowerCase();

//? Check if all words in the wordList are 6 letters
// for(let i =1 ; i < wordList.length; i++){
//    if(wordList[i].length===6){
//     console.log(`${i} - ${wordList[i]}`);
//    }
//    else{
//     console.log(wordList[i] + " is not 6 letters");
//    }
// }

//? Create Game Input Feild

function inputFeild() {
  for (let i = 1; i <= numbersOfTries; i++) {
    let TryDiv = document.createElement("div");
    TryDiv.classList.add(`try-${i}`);
    TryDiv.textContent = `Try ${i}`;
    document.querySelector(".input-feild").appendChild(TryDiv);
    for (let j = 1; j <= numbersOfLetters; j++) {
      let input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("maxlength", "1");
      input.classList.add(`try-${i}-letter-${j}`);
      TryDiv.appendChild(input);
    }
    if (i !== 1) TryDiv.classList.add("disabled");
  }
  document.querySelector(".input-feild").children[0].children[0].focus();

  //? Disable All Inputs Except The First Try
  let inputsDis = document.querySelectorAll(".disabled input");
  inputsDis.forEach((input) => (input.disabled = true));

  //? Input value is captial letter only
  let inputs = document.querySelectorAll(".input-feild input");

  inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      const nextInput = inputs[index + 1];
      if (nextInput) nextInput.focus();
    });

    input.addEventListener("keydown", function (event) {
      // console.log(event)
      const crruntinput = Array.from(inputs).indexOf(event.target); // or this
      // console.log(crruntinput)
      if (event.key === "ArrowRight") {
        const nextInput = crruntinput + 1;
        if (nextInput < inputs.length) {
          inputs[nextInput].focus();
        }
      }
      if (event.key === "ArrowLeft") {
        const prevInput = crruntinput - 1;
        if (prevInput >= 0) {
          inputs[prevInput].focus();
        }
      }
    });
  });
}

//? logic to check the input value and compare it with the wordList

let gussword = document.querySelector("#check-btn");
gussword.addEventListener("click", checkInput);

console.log(wordToGuess);

function checkInput() {
  let sucsseGuess = true;
  for (let i = 1; i <= numbersOfLetters; i++) {
    let inputValue = document.querySelector(`.try-${currentTry}-letter-${i}`);
    let letter = inputValue.value.toLowerCase();
    let letterToGuess = wordToGuess[i - 1].toLowerCase();
    if (letter === letterToGuess) {
      inputValue.classList.add("yes-inplace");
    } else if (wordToGuess.includes(letter) && letter !== "") {
      inputValue.classList.add("is-not-inplace");
      sucsseGuess = false;
    } else {
      inputValue.classList.add("incorrect");
      sucsseGuess = false;
    }
  }
  //? popup message if the user guessed the word correctly
  if (sucsseGuess) {
    showPopUp("Congratulations 🎉", "You guessed the word correctly.");
  }
}

//? Call the inputFeild function when the window loads
window.onload = function () {
  inputFeild();
};
