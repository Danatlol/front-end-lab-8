

const MIN_FLOORS = 1;
const MAX_FLOORS = 20;

const FILL_TOKEN = "[~]";
const EMPTY_TOKEN = "   ";


let floors = Number(prompt("Enter the quantity of floors(min:1, max:20):", ""));

// check the input data
if (!isNaN(floors) && (Math.trunc(floors) === floors) && (floors >= MIN_FLOORS && floors <= MAX_FLOORS)) {
    let row = "";
    let ceils = floors * 2 - 1;
    for (let i = 0; i < floors; ++i) {
        row += (((floors - i) <= 9) ? "0" : "") + (floors - i) + "...";
        for (let j = 0; j < ceils; ++j) {
            if ((i >= (-j + floors - 1)) && (i >= j - floors + 1)) {
                row += FILL_TOKEN;
            }
            else {
                row += EMPTY_TOKEN;
            }
        }
        row += "\n";
    }
    console.log(row);
}
// if data is incorrect showing the error message
else {
    console.error("Incorrect data!");
}