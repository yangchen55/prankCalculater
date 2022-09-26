// // grab all buttons as in array
//  loop throuhh the arraya nd add eent listenere to each button
// wjeme tje nutton is clicked, get the nutton valerenan sstote in a global variable
// grab the display event add the value to the display element

// get all buttons

const buttons = document.querySelectorAll(".btn");

const displayElm = document.querySelector(".display");
const audio = new Audio("a.wav");

//  convert into array
const buttonsArray = Array.from(buttons);

// const handleOnClick = (val) => {
//   alert("you clicked  " + val);
// };
let strToDisplay = "";
const operators = ["%", "/", "*", "-", "+"];
let lastOperator = [];

buttonsArray.map((btn) => {
  console.log(btn);

  btn.addEventListener("click", () => {
    const val = btn.innerText;
    displayElm.style.background = "";
    displayElm.style.color = "black";
    displayElm.classList.remove("prank");

    // ac is falsy value
    if (val === "AC") {
      strToDisplay = "";
      display();
      //   stop the execution
      return;
    }
    if (val === "C") {
      strToDisplay = strToDisplay.slice(0, -1);
      return display(strToDisplay);
    }

    if (val === "=") {
      const lastChar = strToDisplay[strToDisplay.length - 1];

      if (operators.includes(lastChar)) {
        strToDisplay = strToDisplay.slice(0, -1);
      }
      return total();
    }
    //  if(operators.includes(val)){
    //     if(!strToDisplay){

    //     }
    //  }
    if (operators.includes(val)) {
      const lastChar = strToDisplay[strToDisplay.length - 1];
      if (operators.includes(lastChar)) {
        strToDisplay = strToDisplay.slice(0, -1);
      }

      if (val === ".") {
        if (lastOperator) {
          const operatorIndex = strToDisplay.lastIndexOf(lastOperator);
          const lastNumberSet = strToDisplay.slice(operatorIndex + 1);
          if (lastNumberSet.includes(".")) {
            return;
          }
        }
      }

      if (!lastOperator && strToDisplay.includes(".")) {
        return;
      }
    }

    strToDisplay += val;
    display(strToDisplay);
  });
});

const display = (str) => {
  displayElm.innerText = str || "0.00";
};

const total = () => {
  const extra = randNumber();
  if (extra > 0) {
    displayElm.style.background = "red";
    displayElm.style.color = "white";
    displayElm.classList.add("prank");
    audio.play();
  }
  const ttl = eval(strToDisplay) + extra;

  display(ttl);
  //   convert it to string cuz slice is for string
  strToDisplay = ttl.toSting();
};

const randNumber = () => {
  const num = Math.round(Math.random() * 10);
  return num < 6 ? num : 0;
};
