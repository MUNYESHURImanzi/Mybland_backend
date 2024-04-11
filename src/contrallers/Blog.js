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
exports.moreArticle = exports.addingComments = exports.deleteArticle = exports.updateArticle = exports.createArticle = exports.getAllArticles = void 0;
var Blog_1 = require("../schema/Blog");
var comments_1 = require("../schema/comments");
var cloudinary_1 = require("cloudinary").v2;
cloudinary_1.config({
    cloud_name: 'daoqhvblq',
    api_key: '114768926217927',
    api_secret: 'TNE9FTSGxtM0mNzhbVxauqU6mYE'
});
var getAllArticles = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var articles, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Blog_1.default.find()];
            case 1:
                articles = _a.sent();
                res.status(200).json({
                    message: 'All articles retrieved successfully',
                    data: articles,
                });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.error(err_1);
                res.status(500).json({
                    message: 'Failed to retrieve articles',
                    error: err_1.message,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllArticles = getAllArticles;
var createArticle = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, content, author, file, result, articleInstance, savedArticle, err_2, failedData;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, title = _a.title, content = _a.content, author = _a.author;
                file = '';
                if (!req.file) {
                    return [2 /*return*/, res.status(400).json({
                            message: 'file file is required',
                        })];
                }
                return [4 /*yield*/, cloudinary_1.default.v2.uploader.upload(req.file.path)];
            case 1:
                result = _b.sent();
                // Extract the secure URL of the uploaded file
                file = result.secure_url;
                console.log('Uploaded file:', file);
                articleInstance = new Blog_1.default({
                    title: title,
                    content: content,
                    author: author || 'munyeshuyi',
                    file: file,
                });
                return [4 /*yield*/, articleInstance.save()];
            case 2:
                savedArticle = _b.sent();
                res.status(200).json({
                    message: 'Article saved successfully',
                    data: savedArticle,
                });
                return [3 /*break*/, 4];
            case 3:
                err_2 = _b.sent();
                console.error(err_2);
                failedData = {
                    title: req.body.title,
                    content: req.body.content,
                    author: req.body.author,
                    file: req.file ? req.file : 'File data missing',
                };
                console.error('Error uploading file:', err_2);
                res.status(500).json({
                    message: 'Failed to save the article',
                    error: err_2.message,
                    failedData: failedData,
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createArticle = createArticle;
var updateArticle = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var articleId, updates, updatedArticle, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                articleId = req.params.articleId;
                updates = req.body;
                return [4 /*yield*/, Blog_1.default.findByIdAndUpdate(articleId, updates, { new: true })];
            case 1:
                updatedArticle = _a.sent();
                if (!updatedArticle) {
                    res.status(404).json({
                        message: 'Article not found',
                    });
                    return [2 /*return*/];
                }
                res.status(200).json({
                    message: 'Article updated successfully',
                    data: updatedArticle,
                });
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                console.error(err_3);
                res.status(500).json({
                    message: 'Failed to update the article',
                    error: err_3.message,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateArticle = updateArticle;
var deleteArticle = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var articleId, deletedArticle, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                articleId = req.params.articleId;
                return [4 /*yield*/, Blog_1.default.findByIdAndDelete(articleId)];
            case 1:
                deletedArticle = _a.sent();
                if (!deletedArticle) {
                    res.status(404).json({
                        message: 'Article not found',
                    });
                    return [2 /*return*/];
                }
                res.status(200).json({
                    message: 'Article deleted successfully',
                });
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                console.error(err_4);
                res.status(500).json({
                    message: 'Failed to delete the article',
                    error: err_4.message,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteArticle = deleteArticle;
var addingComments = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, comment, commentInstance, savedComment, err_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, email = _a.email, comment = _a.comment;
                commentInstance = new comments_1.default({
                    email: email,
                    comment: comment,
                    articleId: req.params.articleId,
                });
                return [4 /*yield*/, commentInstance.save()];
            case 1:
                savedComment = _b.sent();
                res.status(200).json({
                    message: 'Comment saved successfully',
                    data: savedComment,
                });
                return [3 /*break*/, 3];
            case 2:
                err_5 = _b.sent();
                console.error(err_5);
                res.status(500).json({
                    message: 'Failed to save the comment',
                    error: err_5.message,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.addingComments = addingComments;
var moreArticle = function (req, res) {
};
exports.moreArticle = moreArticle;
