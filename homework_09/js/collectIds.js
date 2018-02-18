function collectIds(movies) {
    return getTransformedArray((getFilteredArray(movies, el => {
        if (el.rating > 3) {
            return true;
        }
    })), el => {
        return el.id;
    });
}