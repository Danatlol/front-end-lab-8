function decypherPhrase(charactersMap, decodeStr) {
    decodeCharactersMap = {};
    forEach(charactersMap, function (el, key) {
        decodeCharactersMap[el] = key;
    });
    return cypherPhrase(decodeCharactersMap, decodeStr);
}