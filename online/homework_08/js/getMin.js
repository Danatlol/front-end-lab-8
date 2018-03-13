function getMin() {
    if (arguments.length === 0) {
        return undefined;
    }
    let minValue = arguments[0];
    for (let i = 1; i < arguments.length; ++i) {
        if ((typeof arguments[i]) === "number") {
            minValue = (arguments[i] < minValue) ? arguments[i] : minValue;
        }
    }
    return minValue;
}