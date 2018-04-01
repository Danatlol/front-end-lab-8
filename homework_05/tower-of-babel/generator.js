const max = process.argv[2];

function* FizzBuzz() {

    for (let i = 1; i <= max; ++i) {
        // let ret = count;
        if ((i % 15) === 0) {
            yield "FizzBuzz";
        }
        else if ((i % 3) === 0) {
            yield "Fizz";
        }
        else if ((i % 5) === 0) {
            yield "Buzz";
        }
        else {
            yield i;
        }
    }
};

for (let n of FizzBuzz()) {
    console.log(n);
}