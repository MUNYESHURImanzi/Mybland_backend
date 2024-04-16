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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvUm91dGVycy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLDhDQUFnSjtBQUNoSiw4Q0FBNEQ7QUFDNUQscUVBQTZDO0FBQzdDLG9EQUE0QjtBQUM1QixzREFBd0Y7QUFNeEYsTUFBTSxNQUFNLEdBQUcsSUFBQSxnQkFBTSxFQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUE7QUFFM0Msa0JBQWUsQ0FBQyxNQUFzQixFQUFFLEVBQUU7SUFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsaUJBQVUsQ0FBQyxDQUFDO0lBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLGdCQUFTLENBQUMsQ0FBQztJQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxpQkFBTyxDQUFDLENBQUM7SUFHakMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxFQUFFO1FBRTVGLE1BQU0sU0FBUyxHQUFHLEdBQW9CLENBQUM7UUFDdkMsSUFBQSxvQkFBYSxFQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNsQyxDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLHFCQUFjLENBQUMsQ0FBQztJQUN4QyxNQUFNLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLHVCQUFnQixDQUFDLENBQUE7SUFHcEQsTUFBTSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxxQkFBVSxDQUFDLENBQUM7SUFFbEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsRUFBRSwyQkFBZ0IsQ0FBQyxDQUFDO0lBRXZELE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLDBCQUFlLENBQUMsQ0FBQztJQUN6QyxNQUFNLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLG9CQUFhLENBQUMsQ0FBQztJQUNsRCxNQUFNLENBQUMsTUFBTSxDQUFDLHNCQUFzQixFQUFFLG9CQUFhLENBQUMsQ0FBQztJQUNyRCxNQUFNLENBQUMsSUFBSSxDQUFDLCtCQUErQixFQUFFLHFCQUFjLENBQUMsQ0FBQztJQUM3RCxNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLGtCQUFXLENBQUMsQ0FBQztJQUUxQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUN6QixHQUFHLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUM7SUFDNUMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMifQ==