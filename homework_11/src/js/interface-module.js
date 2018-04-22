// Interface module which outputs two inputs on the page, 4 buttons: +,-,*,:

import {
    add,
    deduct,
    multiply,
    divide
} from "./calculating-module";

import { showResult } from "./output-module";

const actions = [
    {act: add, sign: "+"},
    {act: deduct, sign: "-"},
    {act: multiply, sign: "*"},
    {act: divide, sign: "/"}
];

export function initInterface() {
    _createInput();
    _createButtons();
    _createOutput();
}

function _createInput() {
    const inputBlock = document.getElementsByClassName("input-operands")[0];

    const firstInput = document.createElement("input");
    firstInput.classList.add("input-field");
    firstInput.id = "firstInput";
    firstInput.setAttribute("placeholder", "First value...");

    const secondInput = document.createElement("input");
    secondInput.classList.add("input-field");
    secondInput.id = "secondInput";
    secondInput.setAttribute("placeholder", "Second value...");

    inputBlock.appendChild(firstInput);
    inputBlock.appendChild(secondInput);
}

function _createButtons() {
    const buttonsBlock = document.getElementsByClassName("buttons")[0];

    for (let action of actions) {
        const tempBtn = document.createElement("button");

        tempBtn.classList.add("action-button");
        tempBtn.appendChild(document.createTextNode(action.sign));
        
        tempBtn.addEventListener("click", (eve) => {
            const firstInput = document.getElementById("firstInput");
            const secondInput = document.getElementById("secondInput");
            showResult(action.act(firstInput.value, secondInput.value));
        });

        buttonsBlock.appendChild(tempBtn);
    }
}

function _createOutput() {
    const outputBlock = document.getElementsByClassName("output-result")[0];

    const output = document.createElement("div");
    output.classList.add("output-field");
    output.id = "output";
    output.appendChild(document.createTextNode("-----"));

    outputBlock.appendChild(output);
}
