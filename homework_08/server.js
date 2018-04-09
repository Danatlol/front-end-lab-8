
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes.js");
const app = express();
const handler = require("./controllers/handlers.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(handler.commonHandler);

routes(app);

const port = process.env.port || 3000;
const server = app.listen(port, function () {
    console.log("app running on port.", server.address().port);
});