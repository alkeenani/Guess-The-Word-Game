//?  Create Game Settings
let gameName = "Guess The Word";
document.querySelector(".game-name").textContent = gameName;
document.querySelector("footer").textContent = `${gameName} Game Created By Mohamed Alkenani`;

//? Setting Game Options

let numbersOfTries = 6;
let numbersOfLetters = 6;
let currentTry = 1;
let numberOfHints = 2;


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
    inputsDis.forEach((input) => input.disabled = true);

    //? Input value is captial letter only
    let inputs = document.querySelectorAll(".input-feild input");


    
    inputs.forEach((input,index) => {
        input.addEventListener("input", function () {
            this.value = this.value.toUpperCase();
                const nextInput = inputs[index + 1];
            if (nextInput) nextInput.focus();
    
        })
        
        input.addEventListener("keydown", function (event) {
            // console.log(event)
            const  crruntinput = Array.from(inputs).indexOf(event.target); // or this
            // console.log(crruntinput)
            if(event.key==="ArrowRight"){
                const nextInput = crruntinput +1;
                if(nextInput<inputs.length){
                    inputs[nextInput].focus();
                }
            }
            if(event.key==="ArrowLeft"){
                const prevInput = crruntinput -1;
                if(prevInput>=0){
                    inputs[prevInput].focus();
                }
            }  
        
    })
    })

}




window.onload = function () {
    inputFeild();
}

