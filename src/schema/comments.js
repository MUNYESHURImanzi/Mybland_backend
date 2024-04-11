"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var commentSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: "email is required"
    },
    comment: {
        type: String,
        required: "comment is required"
    },
    articleId: {
        type: String,
        required: "id is required"
    }
});
exports.default = mongoose_1.default.model("comments", commentSchema);
