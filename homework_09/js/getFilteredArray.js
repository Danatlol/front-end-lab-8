function getFilteredArray(arr, callback) {
    if (!(callback instanceof Function)) {
        return false;
    }
    let retArr = [];
    forEach(arr, el => {
        if (callback(el)) {
            retArr.push(el);
        }
    });
    return retArr;
}