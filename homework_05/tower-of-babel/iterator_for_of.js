const max = process.argv[2];

let FizzBuzz = {
    [Symbol.iterator]() {
        let count = 1;
        return {
            next() {
                let ret = count;
                if (count > max) {
                    return { done: true };
                }
                if ((count % 15) === 0) {
                    ret = "FizzBuzz";
                }
                else if ((count % 3) === 0) {
                    ret = "Fizz";
                }
                else if ((count % 5) === 0) {
                    ret = "Buzz";
                }
                count++;
                return { done: false, value: ret };
            }
        };
    }
}

for (let n of FizzBuzz) {
    console.log(n);
}