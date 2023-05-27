document.addEventListener("DOMContentLoaded", ()=>{
  // addition function
  const add = function (a, b) {
    return typeof a === "number" && typeof b === "number"?
    Number((a + b).toFixed(3)): "Error";
  };

//   Subtraction function
  const subtract = function (a, b) {
    return typeof a === "number" && typeof b === "number"?
    Number((a - b).toFixed(3)): "Error";
  };

//   Multiplication function
  const multiply = function (a, b) {
    return typeof a === "number" && typeof b === "number"?
    Number((a * b).toFixed(3)): "Error";
  };

//   Division function
  const divide = function (a, b) {
    return typeof a === "number" && typeof b === "number" && b !== 0?
    Number((a / b).toFixed(3)): "Error";
  };

  let result = 0;
  const getResultFunc = function(a, key, b){
    switch (key) {
        case "+":
            result = add(a, b);
            console.log(`key is ${operatorKey} and operation is add`)
            break;
        case "-":
            result = subtract(a, b);
            console.log(`key is ${operatorKey} and operation is Subtract`);
            break;
    case "x":
        result = multiply(a, b);
        console.log(`key is ${operatorKey} and operation is Mult`);
        break;
    case "/":
        result = divide(a, b);
        console.log(`key is ${operatorKey} and operation is Divide`);
    }
    console.log(`result of ${firstNum} & ${secondNum} with key ${operatorKey} is ${result}`);
    return result;
  }

  let save = 0;
  let ans = 0;
  let firstNum = 0;
  let secondNum = 0; 
  let operatorKey = "";
  let isKeyPressedBefore= false;

  const operatorKeyFunc = function () {
    if(numString ===""){
        isKeyPressedBefore = true;
        firstNum = save;
        operatorKey = this.textContent;
        if(save===0){
            displayString = `${save}` + `${operatorKey}`;
            input.value = displayString;
            return 0;
        }
        else{
            displayString = `Ans` + `${operatorKey}`
            input.value = displayString;
            return 0;
        }
    }
    displayString = displayString.concat(this.textContent);
    input.value = displayString;
    if(!isKeyPressedBefore){
        isKeyPressedBefore = true;
        operatorKey = this.textContent;
        firstNum = Number(numString);
        numString = "";
    }
    else{
        isKeyPressedBefore = true;
        secondNum = Number(numString);
        numString = "";
        console.log(`ans before ${ans}`);
        ans = getResultFunc(firstNum, operatorKey, secondNum);
        console.log(`ans after ${ans}`);
        firstNum = ans;
        operatorKey =this.textContent;
    }
  };

  function resetParameters(){
    numString = "";
    displayString = "";
    ans = 0;
    firstNum = 0;
    secondNum = 0;
    operatorKey = "";
    isKeyPressedBefore = false;
  }

  function clearFunc(){
    input.value = 0;
    save = 0;
    resetParameters();
  }

  const equalKeyFunc = function () {
    secondNum = Number(numString);
    ans = getResultFunc(firstNum, operatorKey, secondNum);
    input.value = ans;
    save = ans;
    resetParameters();
  }

  let displayString = "";
  let numString = "";
  const displayNumFunc= function () {
    numString = numString.concat(this.textContent);
    displayString = displayString.concat(this.textContent);
    input.value = displayString;
  };

// Access relevant buttons on keyboard
  const input = document.querySelector("#display");
  const digits = document.querySelectorAll(".digit");
  const operators = document.querySelectorAll(".operator");
  const equalKey = document.querySelector(".equal");
  const clear = document.querySelector(".clear");

  // Add event listener to number keys on "click"...
  digits.forEach((digit) => digit.addEventListener("click", displayNumFunc));
  operators.forEach((operator) =>
    operator.addEventListener("click", operatorKeyFunc)
  );
  equalKey.addEventListener("click", equalKeyFunc);
  clear.addEventListener("click", clearFunc)
})