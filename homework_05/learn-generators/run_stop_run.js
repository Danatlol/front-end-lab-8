function* range(from, to) {
    for (let i = from; i <= to; ++i) {
        yield i;
    }
}

for (var r of range(5, 10)) {
    console.log(r);
}
// should print: 5, 6, 7, 8, 9, 10