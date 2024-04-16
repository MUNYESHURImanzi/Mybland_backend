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
exports.moreArticle = exports.addingComments = exports.deleteArticle = exports.updateArticle = exports.createArticle = exports.getSingleArticle = exports.getAllArticles = void 0;
const Blog_1 = __importDefault(require("../schema/Blog"));
const comments_1 = __importDefault(require("../schema/comments"));
const cloudinary_1 = __importDefault(require("cloudinary"));
require('dotenv').config();
cloudinary_1.default.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const getAllArticles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articles = yield Blog_1.default.find();
        res.status(200).json({
            message: 'All articles retrieved successfully',
            data: articles,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Failed to retrieve articles',
            error: err.message,
        });
    }
});
exports.getAllArticles = getAllArticles;
const createArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, author } = req.body;
        let file = '';
        if (!req.file) {
            return res.status(400).json({
                message: 'file file is required',
            });
        }
        const result = yield cloudinary_1.default.v2.uploader.upload(req.file.path);
        file = result.secure_url;
        console.log('Uploaded file:', file);
        const articleInstance = new Blog_1.default({
            title,
            content,
            author: author || 'munyeshuyi',
            file,
        });
        const savedArticle = yield articleInstance.save();
        res.status(200).json({
            message: 'Article saved successfully',
            data: savedArticle,
        });
    }
    catch (err) {
        console.error(err);
        const failedData = {
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            file: req.file ? req.file : 'File data missing',
        };
        console.error('Error uploading file:', err);
        res.status(500).json({
            message: 'Failed to save the article',
            error: err.message,
            failedData: failedData,
        });
    }
});
exports.createArticle = createArticle;
const updateArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articleId = req.params.articleId;
        const updates = req.body;
        let fileUrl = '';
        if (req.file) {
            const result = yield cloudinary_1.default.v2.uploader.upload(req.file.path);
            fileUrl = result.secure_url;
            updates.file = fileUrl;
        }
        const updatedArticle = yield Blog_1.default.findByIdAndUpdate(articleId, updates, { new: true });
        if (!updatedArticle) {
            return res.status(404).json({
                message: 'Article not found',
            });
        }
        // Article updated successfully
        res.status(200).json({
            message: 'Article updated successfully',
            data: updatedArticle,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Failed to update the article',
            error: err.message,
        });
    }
});
exports.updateArticle = updateArticle;
const deleteArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articleId = req.params.articleId;
        const deletedArticle = yield Blog_1.default.findByIdAndDelete(articleId);
        if (!deletedArticle) {
            res.status(404).json({
                message: 'Article not found',
            });
            return;
        }
        res.status(200).json({
            message: 'Article deleted successfully',
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Failed to delete the article',
            error: err.message,
        });
    }
});
exports.deleteArticle = deleteArticle;
const addingComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, comment } = req.body;
        const commentInstance = new comments_1.default({
            email,
            comment,
            articleId: req.params.articleId,
        });
        const savedComment = yield commentInstance.save();
        res.status(200).json({
            message: 'Comment saved successfully',
            data: savedComment,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Failed to save the comment',
            error: err.message,
        });
    }
});
exports.addingComments = addingComments;
const getSingleArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articleId = req.params.articleId;
        const article = yield Blog_1.default.findById(articleId);
        if (!article) {
            res.status(404).json({
                message: 'Article not found',
            });
            return;
        }
        res.status(200).json({
            message: 'Article retrieved successfully',
            data: article,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Failed to retrieve the article',
            error: err.message,
        });
    }
});
exports.getSingleArticle = getSingleArticle;
const moreArticle = (req, res) => {
};
exports.moreArticle = moreArticle;
