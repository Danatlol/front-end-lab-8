function getTransformedArray(arr, callback) {
    if (!(callback instanceof Function)) {
        return false;
    }
    let retArr = [];
    forEach(arr, function (el) {
        retArr.push(callback(el));
    });
    return retArr;
}