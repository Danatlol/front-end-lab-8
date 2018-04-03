// verify url address
const URL_VERIFY = "https://shrouded-garden-94580.herokuapp.com/";

// regular expression for test ip address
const REG_EX_IP_ADDRESS = /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/;

// main html elements/controls
const btnSend = document.getElementById("submit-btn");
const btnVerify = document.getElementById("verify-btn");
const verifyOutput = document.getElementsByClassName("verify-output")[0];
const progressBar = document.getElementById("progress");
const tableDiv = document.getElementById("details-field");
const ipField = document.getElementById("ip-field");
const errorMsg = document.getElementsByClassName("error-msg")[0];

// object for storing previous response
let obj = {};

// allow enter send request
document.body.addEventListener("keyup", function (eve) {
    if (eve.keyCode === 13) {
        btnSend.click();
    }
});

btnSend.addEventListener("click", function () {

    // if bad ip address
    if (!REG_EX_IP_ADDRESS.test(ipField.value)) {

        // show error msg
        errorMsg.classList.remove("hide");
        return;
    }

    // hide error msg
    errorMsg.classList.add("hide");

    // same ip, just do nothing
    // (this if-block separate the hiding errors(above) and elements(below) because of ip/error/same_ip actions not hide error if it not separated)
    if (ipField.value === obj.ip) {
        return;
    }

    // hide elements (prepare for request)
    verifyOutput.innerText = "";
    tableDiv.classList.add("hideSize");

    // show progress bar till receive response
    let timer = setTimeout(function () {
        progressBar.classList.remove("hide");
    }, 300);
    // progressBar.classList.remove("hide");

    // make url string and send request
    let urlTemp = `https://ipapi.co/${ipField.value}/json`;
    http.get(urlTemp).then(function (response) {

        // parse and save response, and show table with data
        let tableCells = document.getElementById("details").getElementsByTagName("td");
        let { ip: ip, country: country, city: city, latitude: latitude, longitude: longitude } = response;
        tableCells[0].innerText = ip;
        tableCells[1].innerText = country;
        tableCells[2].innerText = city;
        tableCells[3].innerText = latitude;
        tableCells[4].innerText = longitude;
        obj = response;

        // hide progress bar (response received)
        clearTimeout(timer);
        progressBar.classList.add("hide");
        tableDiv.classList.remove("hideSize");
    }).catch(function (err) {
        console.log("Error!!!");
    });
});


btnVerify.addEventListener("click", function () {
    http.post(URL_VERIFY, JSON.stringify(obj)).then(function (response) {

        // check if response is failed
        if ((/failed/).test(response)) {
            verifyOutput.style.color = "red";
        }
        else {
            verifyOutput.style.color = "green";
        }

        // show result of response
        verifyOutput.innerText = response;
    }).catch(function (err) {
        console.log("Error!!!");
    });
});


