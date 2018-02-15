function reverseNumber1(num) {
    if (typeof num !== "number") {
        return false;
    }
    if (Math.trunc(num) !== num) {
        return false;
    }
    let retVal = (num < 0) ? "-" : "";

    num = String(Math.abs(num));
    for (let i = num.length - 1; i >= 0; --i) {
        retVal += num[i];
    }
    return Number(retVal);

    // let retVal = numRev(Math.abs(num));
    // function numRev(val) {
    //     if (val < 10) {
    //         return val;
    //     }
    //     return "" + (val % 10) + numRev(Math.trunc(val / 10));
    // }
    // return retVal * negativeCoeff;

    // // let retVal = Array.from(String(Math.abs(num))).reverse().join("");
    // // return retVal * negativeCoeff;
}

// Full version of recursion function(useless)
// Just to break my brain (and maybe someone another)
function reverseNumberFullRec(num) {
    // if not number than exit
    if (typeof num !== "number") {
        return false;
    }
    // if not integer than exit
    if (Math.trunc(num) !== num) {
        return false;
    }
    // this variable for save the sign of number (-1 for negative, +1 for positive -- than we can multiply our number on this variable in some case)
    let negativeCoeff = 1;
    if (num < 0) {
        negativeCoeff = -1;
        num = Math.abs(num);
    }
    num = String(num);

    // stop if we in the end of number
    if (num.length === 1) {
        return num * negativeCoeff;
    }
    // call reverseNumberRec
    return Number(((negativeCoeff === -1) ? "-" : "") + num[num.length - 1] + reverseNumberFullRec(Math.trunc(num / 10)));
}