let fs = require("fs");

function commonHandler(req, res, next) {
    fs.readFile("./data/storage.json", (err, data) => {
        if (err) {
            throw err;
        }
        res.data = JSON.parse(data);
        next();
    });
}

function validateRockstar(rockstar) {
    if (rockstar && rockstar.id && rockstar.name && rockstar.instrument) {
        return true;
    }
    return false;
}

function getRockstarsHandler(req, res) {
    res.status(200).send(res.data);
}

function getRockstarIdHandler(req, res) {
    let id = req.params.id;
    let requestedObject = res.data.find(function (el) {
        return id == el.id;
    });
    if (requestedObject) {
        return res.status(200).send(requestedObject);
    }
    res.status(404).send({ error: '404 Not found' });
}

function postRockstarHandler(req, res) {
    let body = req.body;
    let data = res.data;
    if (!validateRockstar(body)) {
        return res.status(400).send({ error: "400 Bad request" });
    }
    let isExist = data.some(function (el) {
        return el.id == body.id;
    });

    if (isExist) {
        return res.status(409).send({ message: "Musician already exist." });
    }

    data.push(body);
    let str = JSON.stringify(data);
    fs.writeFile("./data/storage.json", str, "utf8", (err) => {
        if (err) {
            throw err;
        }
        res.status(201).send({ status: '201 OK', data: body });
    });
}

function putRockstarIdHandler(req, res) {
    let data = res.data;
    let updatingObject = data.find(function (el) {
        return el.id == req.params.id;
    });

    if (updatingObject) {
        Object.assign(updatingObject, req.body);
        let str = JSON.stringify(data);
        fs.writeFile("./data/storage.json", str, "utf8", (err) => {
            if (err) {
                throw err;
            }
            res.status(200).send(updatingObject);
        });
        return;
    }
    res.status(404).send({ error: "404 Not found" });
}

function deleteRockstarIdHandler(req, res) {
    let startLength = res.data.length;
    let data = res.data.filter(function (el) {
        return !(el.id == req.params.id);
    });
    if (startLength === data.length) {
        res.status(404).send({ error: "404 Not found" });
        return;
    }
    let str = JSON.stringify(data);
    fs.writeFile("./data/storage.json", str, "utf8", (err) => {
        if (err) {
            throw err;
        }
        res.status(200).send({ message: "Musician has been successfully removed." });
    });
}

module.exports.commonHandler = commonHandler;
module.exports.getRockstarsHandler = getRockstarsHandler;
module.exports.getRockstarIdHandler = getRockstarIdHandler;
module.exports.postRockstarHandler = postRockstarHandler;
module.exports.putRockstarIdHandler = putRockstarIdHandler;
module.exports.deleteRockstarIdHandler = deleteRockstarIdHandler;