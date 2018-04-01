function* factorial(n) {
    let current = 1;
    for (let i = 1; i <= n; ++i) {
        current *= i;
        yield current;
    }
}

for (var n of factorial(5)) {
    console.log(n)
}
  // 1, 2, 6, 24, 120