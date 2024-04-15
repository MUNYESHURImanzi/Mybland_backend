"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const commentSchema = new mongoose_1.default.Schema({
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
