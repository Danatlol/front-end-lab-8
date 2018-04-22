// Module for calculating four basic mathematical operations: +,-,*,: 

function add(firstArg, secondArg) {
    return (_argsConverter(firstArg) + _argsConverter(secondArg));
}

function deduct(firstArg, secondArg) {
    return (_argsConverter(firstArg) - _argsConverter(secondArg));
}

function multiply(firstArg, secondArg) {
    return (_argsConverter(firstArg) * _argsConverter(secondArg));
}

function divide(firstArg, secondArg) {
    if (_argsConverter(secondArg) === 0) {
        return "Error! Divide on zero!";
    }
    return (_argsConverter(firstArg) / _argsConverter(secondArg));
}

function _argsConverter(arg) {
    if (arg === "" || arg === null) {
        return NaN;
    }
    return Number(arg);
}

export {
    add,
    deduct,
    multiply,
    divide
};