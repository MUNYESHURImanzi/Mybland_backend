"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
const multer_1 = __importDefault(require("multer"));
const Blog_1 = require("../contrallers/Blog");
const user_1 = require("../contrallers/user");
const contact_1 = __importDefault(require("../contrallers/contact"));
const comments_1 = require("../contrallers/comments");
const upload = (0, multer_1.default)({ dest: 'uploads/' });
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
app.post('/signup', user_1.signupUser);
app.post('/login', user_1.loginUser);
app.post('/contact', contact_1.default);
app.post('/articles', upload.single('file'), (req, res) => {
    const multerReq = req;
    (0, Blog_1.createArticle)(multerReq, res);
});
app.get('/articles', Blog_1.getAllArticles);
app.post('/articles/:id/comments', comments_1.addComment);
app.get('/articles/:id/comments', comments_1.readCommentsById);
app.get('/comments', comments_1.readAllComments);
app.put('/articles/:articleId', Blog_1.updateArticle);
app.delete('/articles/:articleId', Blog_1.deleteArticle);
app.post('/articles/:articleId/comments', Blog_1.addingComments);
app.get('/articles/more', Blog_1.moreArticle);
app.get('/', (req, res) => {
    res.send('Welcome to the application!');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
