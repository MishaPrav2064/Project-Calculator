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

const operations = {
    "+": add,
    "-": subtract,
    "*": multiply,
    "/": divide,
}

function operate(num1, num2, operator) {
    return operations[operator] ? operations[operator](num1, num2) : "Ты лох"
}

console.log(operate(num1, num2, operator))

const numberButtonsContainer = document.querySelector(".number.buttons")
const numberButtons = numberButtonsContainer.querySelectorAll("button")

const display = document.querySelector(".display")

for (let i = 0; i < numberButtons.length; i++) {
    // const buttonValue =
    numberButtons[i].addEventListener("click", () => {
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
        })
            break
        case "+":
        case "-":
        case "*":
        case "/": functionButtons[i].addEventListener("click",() => {
            num1 = +display.textContent;
            operator = functionButtons[i].value
            display.textContent = "";
        })
            break
        case "=": functionButtons[i].addEventListener("click",() => {
            num2 = +display.textContent;
            display.textContent = operate(num1, num2, operator);
            num1 = ""
            num2 = ""
            operator = ""
            shouldResetDisplay = true
        })
            break
    }
}

