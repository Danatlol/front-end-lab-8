


const ADD_TRIES = 1;
let sideName = ["A", "B", "C"];
let sideSize = [];
let tries = 0;

for (let i = 0; i < sideName.length; ++i) {
    let a = parseFloat(prompt("Enter the side " + sideName[i] + ":", ""));
    // Try to get correct data
    tries = 0 - i;
    if (!isNaN(a) && (a > 0)) {
        sideSize.push(a);
        continue;
    }
    while (tries < ADD_TRIES) {
        a = parseFloat(prompt("That does not work... Please enter the positive number:", ""));
        if (!isNaN(a) && (a > 0)) {
            sideSize.push(a);
            break;
        }
        ++tries;
    }
    if (tries >= ADD_TRIES) {
        break;
    }
}


// good or bad data
if (tries >= ADD_TRIES) {
    console.log("Too many tries! Stop execution!");
}
else {
    let typeOfTriangle = good();
    if (typeOfTriangle === "404") {
        console.log("Triangle is not exists. Can't find square.");
    }
    else {
        let halfP = (sideSize[0] + sideSize[1] + sideSize[2]) / 2;
        let square = Math.sqrt(halfP * (halfP - sideSize[0]) * (halfP - sideSize[1]) * (halfP - sideSize[2]));
        console.log(typeOfTriangle + "Square: " + Number(square.toFixed(2)));
    }
}



// good data
function good() {
    // sorting array with sizes for getting the biggest size(hypotenuse for an example) at start of array
    sideSize.sort(function (a, b) { return a < b; });
    // checking if this triangle exists
    if (sideSize[0] >= (sideSize[1] + sideSize[2])) {
        return "404";
    }

    // checking if the sizes are integer type and then we can check if triangle is right
    if (sideSize.every(function (el) {
        return el == Math.floor(el);
    })) {
        // checking if the trianlge is right
        if ((sideSize[0] * sideSize[0]) === ((sideSize[1] * sideSize[1]) + (sideSize[2] * sideSize[2]))) {
            return "Right triangle. ";
        }
    }

    // Checking if triangle is equilateral
    if (sideSize.every(function (el) {
        return el === sideSize[0];
    })) {
        return "Equilateral triangle. ";
    }
    // Checking if triangle is isosceles
    else if (sideSize[0] === sideSize[1] || sideSize[1] === sideSize[2]) {
        return "Isosceles triangle. ";
    }
    // Else it is scalene triangle
    else {
        return "Scalene triangle. ";
    }
}
