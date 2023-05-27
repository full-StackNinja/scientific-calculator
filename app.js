document.addEventListener("DOMContentLoaded", ()=>{
  // addition function
  const add = function (a, b) {
    return typeof a === "number" && typeof b === "number"?
    Number((a + b).toFixed(3)): "Error";
  };

  const subtract = function (a, b) {
    return typeof a === "number" && typeof b === "number"?
    Number((a - b).toFixed(3)): "Error";
  };
  const multiply = function (a, b) {
    return typeof a === "number" && typeof b === "number"?
    Number((a * b).toFixed(3)): "Error";
  };
  const divide = function (a, b) {
    return typeof a === "number" && typeof b === "number" && b !== 0?
    Number((a / b).toFixed(3)): "Error";
  };
  
  let displayString = "";
  let numString = "";
  let ans = 0;
  let firstNum = ""; // initializing as a string to fulfill if condition in getResult Function
  let secondNum = ""; // initializing as a string to fulfill if condition in getResult Function
  let operatorSymbol = "";

  const operatorFunc = function () {
    operatorSymbol = this.textContent;
    displayString = displayString.concat(operatorSymbol);
    input.value = displayString;
    numString = "";
    firstNum = secondNum;
    secondNum = "";
  };
  // const functionObject = {
  //     '+': `${add}`,
  //     "-": `${subtract}`,
  //     "x": `${multiply}`,
  //     "/": `${divide}`
  // }
  // TODO :
  const getResult = function () {
    console.log(
      `firstNum is ${firstNum}, SecNum: ${secondNum}, operator: ${operatorSymbol}`
    );
    if (operatorSymbol === "") {
      input.value = displayString;
      return 0;
    } else if (operatorSymbol !== "" && firstNum !== "" && secondNum !== "") {
      switch (operatorSymbol) {
        case "+":
          ans = add(firstNum, secondNum);
          break;
        case "-":
          ans = subtract(firstNum, secondNum);
          break;
        case "x":
          ans = multiply(firstNum, secondNum);
          break;
        case "/":
          ans = divide(firstNum, secondNum);
      }
    } else {
      ans = "ERROR";
    }
    // Display the answer and reset all the variables...
    input.value = ans;
    firstNum = "0";
    secondNum = "0";
    displayString = "";
    numString = "";
    operatorSymbol = "";
    ans = 0;
  };
  // display function will trigger on each key press of the whole keyboard
  const displayNum = function () {
    numString = numString.concat(this.textContent);
    displayString = displayString.concat(this.textContent);
    input.value = displayString;
    secondNum = Number(numString);
  };
  const input = document.querySelector("#display");
  const digits = document.querySelectorAll(".digit");
  const operators = document.querySelectorAll(".operator");
  const equalKey = document.querySelector(".equal");
  // Add event listener to number keys on "click"...
  digits.forEach((digit) => digit.addEventListener("click", displayNum));
  operators.forEach((operator) =>
    operator.addEventListener("click", operatorFunc)
  );
  equalKey.addEventListener("click", getResult);
})