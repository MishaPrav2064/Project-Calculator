function add(num1, num2) {
    return num1 + num2
}

function subtract(num1, num2) {
    return num1 - num2
}

function multiply(num1, num2) {
    return num1 * num2
}

function divide(num1, num2) {
    return num2 === 0 ? "Деления не будет" : num1 / num2
}

console.log(add(1, 4))
console.log(subtract(1, 4))
console.log(multiply(1, 4))
console.log(divide(1, 4))

let num1 = ""
let num2 = ""
let operator = ""
let shouldResetDisplay = false
let disabledButton = false

const MAX_LENGTH = 10;

const operations = {
    "+": add,
    "-": subtract,
    "*": multiply,
    "/": divide,
}

function operate(num1, num2, operator) {
    return operations[operator] ? operations[operator](num1, num2) : "Ты лох"
}

function enableDot(buttonsList) {
    buttonsList.forEach(button => {
        if (button.value === ".") {
            button.disabled = false;
        }
    })
}

function formatNumber(num, decimal) {
    if (isNaN(num) === true) {
        return num
    } else if (Number.isInteger(num)) {
        return num;
    } else {
        let factor = 10 ** decimal;
        return  Math.round(num * factor) / factor;
    }
}

console.log(operate(num1, num2, operator))

const numberButtonsContainer = document.querySelector(".number.buttons")
const numberButtons = numberButtonsContainer.querySelectorAll("button")

const display = document.querySelector(".display")

display.textContent = "";

for (let i = 0; i < numberButtons.length; i++) {
    // const buttonValue =
    numberButtons[i].addEventListener("click", () => {
        let value = numberButtons[i].value;
        if (display.textContent.length >= MAX_LENGTH) return;
        if (value === ".") {
            numberButtons[i].disabled = true;
        }
        if (shouldResetDisplay === true) {
            display.textContent = numberButtons[i].value;
            shouldResetDisplay = false
        } else {
            display.textContent += numberButtons[i].value
        }
    })
}

const functionButtonsContainer = document.querySelector(".function.buttons")
const functionButtons = functionButtonsContainer.querySelectorAll("button")

for (let i = 0; i < functionButtons.length; i++) {
    switch(functionButtons[i].value) {
        case "clear": functionButtons[i].addEventListener("click", () => {
            display.textContent = ""
            num1 = ""
            num2 = ""
            operator = ""
            enableDot(numberButtons);
        })
            break
        case "+":
        case "-":
        case "*":
        case "/": functionButtons[i].addEventListener("click",() => {
            if (display.textContent === "") return;
            if (num1 !== "" && display.textContent !== operator) {
                num2 = +display.textContent;
                display.textContent = formatNumber(operate(num1, num2, operator),4);
                num1 = operate(num1, num2, operator);
                num2 = "";
                operator = functionButtons[i].value;
                shouldResetDisplay = true;
                enableDot(numberButtons);
            } else if (num1 !== "" && display.textContent === operator) {
                operator = functionButtons[i].value;
                display.textConten = functionButtons[i].value;
                shouldResetDisplay = true;
                enableDot(numberButtons);
            } else {
                num1 = +display.textContent;
                operator = functionButtons[i].value;
                display.textContent = functionButtons[i].value;
                shouldResetDisplay = true;
                enableDot(numberButtons);
            }
        })
            break
        case "=": functionButtons[i].addEventListener("click",() => {
            if (operator === "") {
                num1 = ""
                num2 = ""
                shouldResetDisplay = true
                enableDot(numberButtons);
            } else if (operator !== "" && display.textContent === operator) {
                display.textContent = "Начни сначала";
                num1 = ""
                num2 = ""
                operator = ""
                shouldResetDisplay = true
                enableDot(numberButtons);
            } else {
                num2 = +display.textContent;
                display.textContent = formatNumber(operate(num1, num2, operator), 4);
                num1 = ""
                num2 = ""
                operator = ""
                shouldResetDisplay = true
                enableDot(numberButtons);
            }
        })
            break
        case "backSpace": functionButtons[i].addEventListener("click", () => {
            if (display.textContent !== "") {
                display.textContent = display.textContent.slice(0, -1);
            }
        })
            break
    }
}

    document.addEventListener("keydown", event => {
        let value = event.key;

        if (!isNaN(value) || value === ".") {

            if (display.textContent.length >= MAX_LENGTH) return;

            if (value === "." && display.textContent.includes(".")) return

            if (value === ".") {
                numberButtons.forEach(button => {
                    if (button.value === ".") button.disabled = true;
                });
            }

            if (shouldResetDisplay === true) {
                display.textContent = value;
                shouldResetDisplay = false
            } else {
                display.textContent += value;
            }
        }


            if (value === "Escape") {
                display.textContent = ""
                num1 = ""
                num2 = ""
                operator = ""
                enableDot(numberButtons);
            }

            if(["+","-","*","/"].includes(value)) {
                if (display.textContent === "") return;
                if (num1 !== "" && display.textContent !== operator) {
                    num2 = +display.textContent;
                    display.textContent = formatNumber(operate(num1, num2, operator), 4);
                    num1 = operate(num1, num2, operator);
                    num2 = "";
                    operator = value;
                    shouldResetDisplay = true;
                    enableDot(numberButtons);
                } else if (num1 !== "" && display.textContent === operator) {
                    operator = value;
                    display.textContent = value;
                    shouldResetDisplay = true;
                    enableDot(numberButtons);
                } else {
                    num1 = +display.textContent;
                    operator = value;
                    display.textContent = value;
                    shouldResetDisplay = true;
                    enableDot(numberButtons);
                }
            }

            if(value === "=" || value === "Enter") {
                if (operator === "") {
                    num1 = ""
                    num2 = ""
                    shouldResetDisplay = true
                } else if (operator !== "" && display.textContent === operator) {
                    display.textContent = "Начни сначала";
                    num1 = ""
                    num2 = ""
                    operator = ""
                    shouldResetDisplay = true
                    enableDot(numberButtons);
                } else {
                    num2 = +display.textContent;
                    display.textContent = formatNumber(operate(num1, num2, operator), 4);
                    num1 = ""
                    num2 = ""
                    operator = ""
                    shouldResetDisplay = true
                    enableDot(numberButtons);
                }
            }

            if (value === "Backspace") {
                if (display.textContent !== "") {
                    display.textContent = display.textContent.slice(0, -1);
                }
            }
    });
