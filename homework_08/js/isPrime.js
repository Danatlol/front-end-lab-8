function isPrime(num) {
    if (num <= 1 || Math.trunc(num) !== num) {
        return false;
    }
    let end = Math.sqrt(num);
    for (let i = 2; i <= end; ++i) {
        if (!(num % i)) {
            return false;
        }
    }
    return true;
}