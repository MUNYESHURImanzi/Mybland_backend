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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readAllComments = exports.readCommentsById = exports.addComment = void 0;
var comments_1 = require("../schema/comments");
var addComment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, comment, articleId, newComment, savedComment, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, email = _a.email, comment = _a.comment;
                articleId = req.params.id;
                newComment = new comments_1.default({
                    email: email,
                    comment: comment,
                    articleId: articleId
                });
                return [4 /*yield*/, newComment.save()];
            case 1:
                savedComment = _b.sent();
                res.status(200).json({
                    message: "Comment saved successfully",
                    error: null,
                    data: savedComment
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                console.error("Error occurred while saving the comment:", error_1);
                res.status(500).json({
                    message: "Failed to save the comment",
                    error: error_1.message || "Internal Server Error"
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.addComment = addComment;
var readCommentsById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var articleId, comments, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                articleId = req.params.id;
                return [4 /*yield*/, comments_1.default.find({ articleId: articleId })];
            case 1:
                comments = _a.sent();
                res.status(200).json({
                    message: "Comments retrieved successfully",
                    error: null,
                    data: comments
                });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error("Error occurred while reading comments:", error_2);
                res.status(500).json({
                    message: "Failed to retrieve comments",
                    error: error_2.message || "Internal Server Error"
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.readCommentsById = readCommentsById;
var readAllComments = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var comments, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, comments_1.default.find()];
            case 1:
                comments = _a.sent();
                res.status(200).json({
                    message: "All comments retrieved successfully",
                    error: null,
                    data: comments
                });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error("Error occurred while reading all comments:", error_3);
                res.status(500).json({
                    message: "Failed to retrieve all comments",
                    error: error_3.message || "Internal Server Error"
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.readAllComments = readAllComments;
