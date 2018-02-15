function reverseNumber(num) {
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
}