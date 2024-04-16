"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Blog_1 = require("../contrallers/Blog");
const user_1 = require("../contrallers/user");
const contact_1 = __importDefault(require("../contrallers/contact"));
const multer_1 = __importDefault(require("multer"));
const comments_1 = require("../contrallers/comments");
const upload = (0, multer_1.default)({ dest: 'uploads/' });
exports.default = (router) => {
    router.post('/signup', user_1.signupUser);
    router.post('/login', user_1.loginUser);
    router.post('/contact', contact_1.default);
    router.post('/articles', upload.single('file'), (req, res) => {
        const multerReq = req;
        (0, Blog_1.createArticle)(multerReq, res);
    });
    router.get('/articles', Blog_1.getAllArticles);
    router.get('/articles/:articleId', Blog_1.getSingleArticle);
    router.post('/articles/:id/comments', comments_1.addComment);
    router.get('/articles/:id/comments', comments_1.readCommentsById);
    router.get('/comments', comments_1.readAllComments);
    router.put('/articles/:articleId', Blog_1.updateArticle);
    router.delete('/articles/:articleId', Blog_1.deleteArticle);
    router.post('/articles/:articleId/comments', Blog_1.addingComments);
    router.get('/articles/more', Blog_1.moreArticle);
    router.get('/', (req, res) => {
        res.send('Welcome to the application!');
    });
};
