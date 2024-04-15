"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readAllComments = exports.readCommentsById = exports.addComment = void 0;
const comments_1 = __importDefault(require("../schema/comments"));
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, comment } = req.body;
        const articleId = req.params.id;
        const newComment = new comments_1.default({
            email,
            comment,
            articleId
        });
        const savedComment = yield newComment.save();
        res.status(200).json({
            message: "Comment saved successfully",
            error: null,
            data: savedComment
        });
    }
    catch (error) {
        console.error("Error occurred while saving the comment:", error);
        res.status(500).json({
            message: "Failed to save the comment",
            error: error.message || "Internal Server Error"
        });
    }
});
exports.addComment = addComment;
const readCommentsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articleId = req.params.id;
        const comments = yield comments_1.default.find({ articleId });
        res.status(200).json({
            message: "Comments retrieved successfully",
            error: null,
            data: comments
        });
    }
    catch (error) {
        console.error("Error occurred while reading comments:", error);
        res.status(500).json({
            message: "Failed to retrieve comments",
            error: error.message || "Internal Server Error"
        });
    }
});
exports.readCommentsById = readCommentsById;
const readAllComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield comments_1.default.find();
        res.status(200).json({
            message: "All comments retrieved successfully",
            error: null,
            data: comments
        });
    }
    catch (error) {
        console.error("Error occurred while reading all comments:", error);
        res.status(500).json({
            message: "Failed to retrieve all comments",
            error: error.message || "Internal Server Error"
        });
    }
});
exports.readAllComments = readAllComments;
