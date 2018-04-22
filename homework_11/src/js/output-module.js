// Module for output result on the page

export function showResult(result) {
    document.getElementById("output").innerText = isFinite(result.toString())? result.toString() : "Error, bad input!";
}