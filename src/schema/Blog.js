"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var articleSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: "title is required"
    },
    content: {
        type: String,
        required: "content is required"
    },
    author: {
        type: String
    },
    file: {
        type: String
    }
});
exports.default = mongoose_1.default.model("articles", articleSchema);
