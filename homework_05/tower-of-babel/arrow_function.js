var inputs = process.argv.slice(2);
var result = inputs.map((el) => { return el[0]; }).reduce((prev, el) => { return prev + el; });
console.log(result);