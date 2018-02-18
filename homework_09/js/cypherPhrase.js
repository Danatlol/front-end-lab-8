function cypherPhrase(charactersMap, codeStr) {
    return getTransformedArray(codeStr, function (el) {
        return charactersMap[el] || el;
    }).join("");
}