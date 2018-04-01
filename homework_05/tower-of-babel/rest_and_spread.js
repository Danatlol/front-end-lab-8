var rawArgs = process.argv.slice(2);
var args = [];

rawArgs.forEach(val => {
    let commaSep = val.split(',');
    commaSep.forEach(val => {
        if (val !== '') args.push(+val);
    });
});

// write a function called `avg` here that calculates the average.
function avg(...arr) {
    let sum = 0;
    let i = 0;
    for (i = 0; i < arr.length; ++i) {
        sum += arr[i];
    }
    return sum / i;
}

console.log(avg(...args));