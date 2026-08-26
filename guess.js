import { showPopUp } from "./popup.js";

//? Create Game Settings
const gameName = "Guess The Word";

document.querySelector(".game-name").textContent = gameName;
document.querySelector("footer").textContent =
  `${gameName} Game Created By Mohamed Alkenani`;

//? Game Options
const numbersOfTries = 6;
const numbersOfLetters = 6;
let currentTry = 1;
let numberOfHints = 2;

const wordList = [
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

const wordToGuess =
  wordList[Math.floor(Math.random() * wordList.length)].toLowerCase();
console.log(wordToGuess);
// console.log(wordToGuess);

//? Create Game Input Field

function inputField() {
  const inputFieldContainer = document.querySelector(".input-feild");

  for (let i = 1; i <= numbersOfTries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.textContent = `Try ${i}`;

    inputFieldContainer.appendChild(tryDiv);

    for (let j = 1; j <= numbersOfLetters; j++) {
      const input = document.createElement("input");

      input.type = "text";
      input.maxLength = 1;

      input.classList.add(`try-${i}-letter-${j}`);

      tryDiv.appendChild(input);
    }

    if (i !== 1) {
      tryDiv.classList.add("disabled");
    }
  }

  inputFieldContainer.children[0].children[0].focus();

  document.querySelectorAll(".disabled input").forEach((input) => {
    input.disabled = true;
  });

  const inputs = document.querySelectorAll(".input-feild input");

  inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();

      const nextInput = inputs[index + 1];

      if (nextInput) nextInput.focus();
    });

    input.addEventListener("keydown", function (event) {
      const currentInput = Array.from(inputs).indexOf(event.target);

      if (event.key === "ArrowRight") {
        const nextInput = currentInput + 1;

        if (nextInput < inputs.length) {
          inputs[nextInput].focus();
        }
      }

      if (event.key === "ArrowLeft") {
        const prevInput = currentInput - 1;

        if (prevInput >= 0) {
          inputs[prevInput].focus();
        }
      }
    });
  });
}

//? Check Guess

const guessWordBtn = document.querySelector("#check-btn");

guessWordBtn.addEventListener("click", checkInput);

function checkInput() {
  let successGuess = true;

  const currentRow = document.querySelector(`.try-${currentTry}`);

  for (let i = 1; i <= numbersOfLetters; i++) {
    const input = document.querySelector(`.try-${currentTry}-letter-${i}`);

    input.classList.remove("yes-inplace", "is-not-inplace", "incorrect");

    const letter = input.value.toLowerCase();

    // if (!letter) {
    //   showPopUp("Warning", "Please Fill All Inputs");
    //   return;
    // }

    const letterToGuess = wordToGuess[i - 1];

    if (letter === letterToGuess) {
      input.classList.add("yes-inplace");
    } else if (wordToGuess.includes(letter) && letter !== "") {
      input.classList.add("is-not-inplace");
      successGuess = false;
    } else if (wordToGuess) {
      input.classList.add("incorrect");
      successGuess = false;
    }
  }

  if (successGuess) {
    showPopUp(
      "Congratulations 🎉",
      `You Win! The Word [${
        wordToGuess[0].toUpperCase() + wordToGuess.slice(1)
      }] Is Correct.`,
    );

    document.querySelectorAll(".input-feild input").forEach((input) => {
      input.disabled = true;
    });

    guessWordBtn.disabled = true;

    return;
  }

  currentRow.classList.add("disabled-inputs");

  currentRow.querySelectorAll("input").forEach((input) => {
    input.disabled = true;
  });

  if (currentTry < numbersOfTries) {
    currentTry++;

    const nextRow = document.querySelector(`.try-${currentTry}`);

    nextRow.classList.remove("disabled");

    nextRow.querySelectorAll("input").forEach((input) => {
      input.disabled = false;
    });

    nextRow.querySelector("input").focus();
  } else {
    showPopUp("Game Over", `The Correct Word Was: ${wordToGuess}`);

    guessWordBtn.disabled = true;
  }
}
addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    checkInput();
  }
});

//?  Hint Feature

let hintBtn = document.querySelector("#hint-btn");
let hintCount = document.querySelector("#hint-btn span");
hintCount.innerHTML = numberOfHints;
hintBtn.addEventListener("click", gitHint);
// console.log(Math.floor(Math.random() * numbersOfLetters));
function gitHint() {
  if (numberOfHints > 0) {
    numberOfHints--;
    hintCount.innerHTML = numberOfHints;
    // const randomIndex = Math.floor(Math.random() * numbersOfLetters);

    // const hintLetter = wordToGuess[randomIndex].toUpperCase();
    // showPopUp("Hint", `The Hint Is: ${hintLetter}`);
    if (numberOfHints === 0) {
      hintBtn.disabled = true;
    }
    const enabledInputs = document.querySelectorAll(`input:not(:disabled)`);
    // console.log(enabledInputs);
    const emptyInputs = Array.from(enabledInputs).filter(
      (input) => input.value === "",
    );
    if (emptyInputs.length > 0) {
      let randomindex = Math.floor(Math.random() * emptyInputs.length);
      let randomInput = emptyInputs[randomindex];
      let InputToFill = Array.from(enabledInputs).indexOf(randomInput);
      randomInput.value = wordToGuess[InputToFill].toUpperCase();
      // console.log(randomindex);
      // console.log(randomInput);
    }
  }
}
//? Delate Input Value On Backspace Key Press
function Backspace(event) {
  if (event.key === "Backspace") {
    const inputs = document.querySelectorAll("input:not([disabled])");
    const currentInput = document.activeElement;
    const currentIndex = Array.from(inputs).indexOf(currentInput);

    if (currentIndex === -1) return;

    if (currentInput.value !== "") {
      currentInput.value = "";
    } else if (currentIndex > 0) {
      const prevInput = inputs[currentIndex - 1];
      prevInput.value = "";
      prevInput.focus();
    }
  }
}
addEventListener("keydown", Backspace);

//? Start Game
window.onload = function () {
  inputField();
};
