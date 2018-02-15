function getClosestToZero() {
    if (arguments.length === 0) {
        return undefined;
    }

    let retObject = Array.from(arguments).reduce((result, item, index) => {
        if (item !== null && item !== "" && Math.abs(item) < result.min) {
            result.min = Math.abs(item);
            result.key = index;
        }
        return result;
    }, { min: arguments[0], key: 0 });

    return arguments[retObject.key];
}