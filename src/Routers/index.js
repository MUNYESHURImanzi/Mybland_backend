"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Blog_1 = require("../contrallers/Blog");
var user_1 = require("../contrallers/user");
var contact_1 = require("../contrallers/contact");
var multer_1 = require("multer");
var comments_1 = require("../contrallers/comments");
const upload = multer_1({ dest: 'uploads/' });
exports.default = (function (router) {
    router.post('/signup', user_1.signupUser);
    router.post('/login', user_1.loginUser);
    router.post('/contact', contact_1.default);
    router.post('/articles', upload.single('file'), function (req, res) {
        var multerReq = req;
        (0, Blog_1.createArticle)(multerReq, res);
    });
    router.get('/articles', Blog_1.getAllArticles);
    router.post('/articles/:id/comments', comments_1.addComment);
    router.get('/articles/:id/comments', comments_1.readCommentsById);
    router.get('/comments', comments_1.readAllComments);
    router.put('/articles/:articleId', Blog_1.updateArticle);
    router.delete('/articles/:articleId', Blog_1.deleteArticle);
    router.post('/articles/:articleId/comments', Blog_1.addingComments);
    router.get('/articles/more', Blog_1.moreArticle);
    router.get('/', function (req, res) {
        res.send('Welcome to the application!');
    });
});
