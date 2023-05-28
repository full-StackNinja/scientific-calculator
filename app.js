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
  let isNumberEnteredBefore = false;

  const operatorKeyFunc = function () {
    isNumberEnteredBefore = true;
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
    isNumberEnteredBefore= false;
    isXPowerYKeyPressed = false;
  }

  function clearFunc(){
    input.value = 0;
    save = 0;
    resetParameters();
  }

  function ansKeyFunc(){
    input.value = save;
  }
  
  function getSqrtFunc(){
    let expression = input.value;
    let value =0;
    if(isKeyPressedBefore){
        secondNum = Number(numString);
        value = getResultFunc(firstNum, operatorKey, secondNum);
    }
    else{
        value = Number(input.value);
    }
    if(value>=0){
        value = Math.sqrt(value)
        input.value = `sqrt(${expression}) = ${value}`
        save = `sqrt(${expression}) = ${value}`;
        resetParameters();
    }
    else{
        input.value = "Error";
        resetParameters();
    }
  }
  
  const equalKeyFunc = function () {
    if(isXPowerYKeyPressed){
        console.log("PowerkeyPressed");
        isXPowerYKeyPressed = false;
        secondNum = Number(numString);
        console.log(firstNum, secondNum);
        input.value = Math.pow(firstNum, secondNum);
        save = Number(input.value);
        resetParameters();
        return 0;
    }
    if(!isNumberEnteredBefore){
        input.value = numString;
        save = Number(numString);
        resetParameters();
        return 0;

    }
    else{
    secondNum = Number(numString);
    ans = getResultFunc(firstNum, operatorKey, secondNum);
    input.value = ans;
    save = ans;
    resetParameters();
    return 0;
    }
  }

  function getXFactorial(){
    let inputNum = Number(input.value);
    if(inputNum == 0){
        input.value = `${inputNum}! = 1`;
        save = `${inputNum}! = ${1}`;
        resetParameters();
        return 0;
    }
    if(Number.isInteger(inputNum)){
        let x = Math.abs(inputNum);
        let xFact = inputNum/x;
        while(x>0){
            xFact *=x;
            x--;
        }
        input.value = `${inputNum}! = ${xFact}`;
        save = `${inputNum}! = ${xFact}`;
        resetParameters();
    }
  }

  let displayString = "";
  let numString = "";

  const displayNumFunc= function () {
    if(!displayString.endsWith(`${pi.textContent}`)){
        numString = numString.concat(this.textContent);
        displayString = displayString.concat(this.textContent);
        input.value = displayString;
    }
  };

  function getPiFunc(){
    if (displayString === ""){
        displayString = `${this.textContent}`;
     }
     else{
        displayString = displayString.concat(this.textContent);
     }
     input.value = displayString;
     if(numString === ""){
        console.log(`Numstring is ${numString}`);
        numString = numString.concat(Math.PI);
        console.log(`Numstring is ${numString}`);
     }
     else{
        numString = (Number(numString) * Math.PI).toFixed(3);
     }
  }

  let isXPowerYKeyPressed = false;
  function getXPowerY(){
    isXPowerYKeyPressed = true;
    firstNum = Number(input.value);
    numString = "";
    displayString = input.value;
    displayString = displayString.concat("^");
    input.value = displayString;
  }

// Access relevant buttons on keyboard
  const input = document.querySelector("#display");
  const digits = document.querySelectorAll(".digit");
  const operators = document.querySelectorAll(".operator");
  const equalKey = document.querySelector(".equal");
  const clear = document.querySelector(".clear");
  const ansKey = document.querySelector(".ans");
  const xFactorial = document.querySelector(".x-factorial");
  const squareRoot = document.querySelector(".sqrt");
  const pi = document.querySelector(".pi");
  const xPowerY = document.querySelector(".x-power-y");


  // Add event listener to number keys on "click"...
  digits.forEach((digit) => digit.addEventListener("click", displayNumFunc));
  operators.forEach((operator) => operator.addEventListener("click", operatorKeyFunc));
  equalKey.addEventListener("click", equalKeyFunc);
  clear.addEventListener("click", clearFunc)
  ansKey.addEventListener("click", ansKeyFunc);
  xFactorial.addEventListener("click", getXFactorial);
  squareRoot.addEventListener("click", getSqrtFunc);
  pi.addEventListener("click", getPiFunc);
  xPowerY.addEventListener("click", getXPowerY)

})