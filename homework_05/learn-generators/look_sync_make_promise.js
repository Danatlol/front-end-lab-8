function askFoo() {
    return new Promise(function (resolve, reject) {
        resolve('foo');
    });
}

function run(generator) {
    var it = generator();

    function go(result) {
        if (result.done) {
            return result.value;
        }
        return result.value.then(function (value) {
            return go(it.next(value));
        });
    }
    go(it.next());
}

run(function* () {
    var foo = yield askFoo();
    console.log(foo);
});