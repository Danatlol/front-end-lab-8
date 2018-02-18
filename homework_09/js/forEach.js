function forEach(arr, callback) {
    if (!(callback instanceof Function)) {
        return false;
    }
    let arrKeys = Object.keys(arr);
    for (let i = 0; i < arrKeys.length; ++i) {
        callback(arr[arrKeys[i]], arrKeys[i]);
    }
    return arr;
}