
// Geting the course of exchange rate
let currency;
getCurrencyObj();

let exEUR = currency.filter(function (el) { return el.ccy == "EUR" })[0].sale;
let exUSD = currency.filter(function (el) { return el.ccy == "USD" })[0].sale;

function getCurrencyObj() {
    let req = new XMLHttpRequest();
    req.open("GET", "https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11", false);
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            console.log(req.responseText);
            currency = JSON.parse(req.responseText);
        }
    };
    req.send(null);
}


const ADD_TRIES = 1;
let currencyName = ["EURO", "USD"];
let cashAmount = [];
let tries = 0;

for (let i = 0; i < currencyName.length; ++i) {
    let a = parseFloat(prompt("Enter the amount of " + currencyName[i] + ":", ""));
    // Try to get correct data
    tries = 0 - i;
    if (!isNaN(a) && (a > 0)) {
        cashAmount.push(a);
        continue;
    }
    while (tries < ADD_TRIES) {
        a = parseFloat(prompt("That does not work... Please enter the positive number:", ""));
        if (!isNaN(a) && (a > 0)) {
            cashAmount.push(a);
            break;
        }
        ++tries;
    }
    if (tries >= ADD_TRIES) {
        break;
    }
}

// good or bad data
if (tries >= ADD_TRIES) {
    console.log("Too many tries! Stop execution!");
}
else {
    amountEURtoUAH = Number((cashAmount[0] * exEUR).toFixed(2));
    amountUSDtoUAH = Number((cashAmount[1] * exUSD).toFixed(2));
    amountEURtoUSD = Number((exEUR / exUSD).toFixed(2));
    console.log(cashAmount[0] + " euros are equal " + amountEURtoUAH + " UAH, " +
        cashAmount[1] + " dollars are equal " + amountUSDtoUAH +
        " UAH, one euro is equal " + amountEURtoUSD + " dollars.");
}
