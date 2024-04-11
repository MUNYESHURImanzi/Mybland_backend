"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var Routers_1 = require("./src/Routers");
var DATABASE_URL = 'mongodb+srv://munyeshuri:Munyeshuri@cluster0.yqd0pr4.mongodb.net/mydatabase?retryWrites=true&w=majority';
mongoose_1.default.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(function () { return console.log('MongoDB connected successfully.'); })
    .catch(function (error) { return console.error('MongoDB connection error:', error); });
var app = (0, express_1.default)();
app.use(express_1.default.json());
var router = express_1.default.Router();
(0, Routers_1.default)(router);
app.use("/", router);
var port = 3000;
app.listen(port, function () {
    console.log("Server running at http://localhost:".concat(port));
});
