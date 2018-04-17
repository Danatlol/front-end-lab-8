class Input {
    constructor(placeHolder) {
        this.placeHolder = placeHolder || "Type...";
        this._value = "";
    }

    get value() {
        return this._value;
    }

    setValue(newValue) {
        this._value = newValue;
    }
}

class NumberInput extends Input {
    constructor(placeHolder) {
        super(placeHolder);
        this.type = "number";
    }
}

class TextInput extends Input {
    constructor(placeHolder) {
        super(placeHolder);
        this.type = "string";
    }
}


class InputDecorable {
    constructor(input) {
        if(!(input instanceof Input)){
            throw new Error("Argument must be an Input instance");
        }
        this._input = input;
        this._validateData = {};
        this._validators = [];
    }

    get valid() {
        this._startValidators();
        for (let key in this._validateData) {
            if (!this._validateData[key].valid) {
                return false;
            }
        }
        return true;
    }

    get message() {
        this._startValidators();
        let result = "";
        for (let key in this._validateData) {
            result += this._validateData[key].msg;
        }
        if (result === "") {
            return "no errors"
        }
        return result;
    }

    get value() {
        return this._input.value;
    }

    setValue(newValue) {
        this._input.setValue(newValue);
    }

    _startValidators() {
        let self = this;
        this._validators.forEach(function (el) {
            el.call(self, self.value);
        });
    }
}



function AddRequiredValidation(input) {
    if (!(input && (input instanceof InputDecorable))) {
        throw new Error("Error, input must be an InputDecorable type");
    }

    const REQUIRED = "required_validation";
    input._validators.push(function (val) {
        if (!val && (val !== 0)) {
            this._validateData[REQUIRED] = {
                valid: false,
                msg: "/required validator error "
            };
        }
        else {
            this._validateData[REQUIRED] = {
                valid: true,
                msg: ""
            };
        }
    });
    return input;
}

function AddMaxLengthValidation(input, maxLength = 10) {
    if (!(input && (input instanceof InputDecorable))) {
        throw new Error("Error, input must be an InputDecorable type");
    }

    const MAX_LENGTH = "max_length_validation";
    input._validators.push(function (val) {
        if (String(val).length > maxLength) {
            this._validateData[MAX_LENGTH] = {
                valid: false,
                msg: "/maxLength validator error "
            };
        }
        else {
            this._validateData[MAX_LENGTH] = {
                valid: true,
                msg: ""
            };
        }
    });
    return input;
}

function AddNumberValidation(input) {
    if (!(input && (input instanceof InputDecorable))) {
        throw new Error("Error, input must be an InputDecorable type");
    }

    const NUMBER = "number_validation";
    input._validators.push(function (val) {
        if (!Number.isFinite(val)) {
            this._validateData[NUMBER] = {
                valid: false,
                msg: "/number validator error "
            };
        }
        else {
            this._validateData[NUMBER] = {
                valid: true,
                msg: ""
            };
        }
    });
    return input;
}


// create Input
let numberInput = new NumberInput("Type numbers...");
// wrap our object for prepare to decorating
numberInput = new InputDecorable(numberInput);
// decorate
AddRequiredValidation(numberInput);
AddMaxLengthValidation(numberInput, 8);
AddNumberValidation(numberInput);


// The desired behaviour would be
console.log(numberInput.valid) //---> false, because of required validator
numberInput.setValue("1");
console.log(numberInput.valid) //---> false, because of number validator
console.log(numberInput.message) //---> false, because of number validator

numberInput.setValue(1);
console.log(numberInput.valid) //---> true, all validators pass
console.log(numberInput.message) //---> true, all validators pass

numberInput.setValue(1111111111111111111111111111);
console.log(numberInput.valid) //---> false, because of max length validator
console.log(numberInput.message) //---> false, because of max length validator