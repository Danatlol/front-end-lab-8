const waitFewSec = (msec, triggerFail) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (triggerFail) {
                reject(false);
                return;
            }

            resolve(true);
        }, msec);
    });
};
const asyncFn = async () => {
    const result = await waitFewSec(1000);
    return result;
};

async function doAsyncMagic() {
    const func1 = asyncFn();
    const func2 = asyncFn();
    const func3 = asyncFn();
    const func4 = asyncFn();
    const arr = [];
    arr.push(await func1);
    arr.push(await func2);
    arr.push(await func3);
    arr.push(await func4);
    console.log(arr);
}

doAsyncMagic(); // [true, true, true, true]

async function* rangeGen() {
    for (let i = 1; i <= 15; i++) {
        yield i;
    }
}

async function iterateRange(){
    let sum = 0;
    for await (let elem of rangeGen()){
        sum += elem;
    }
    return sum;
}

console.log(iterateRange()); // Promise {<resolved>: 120}