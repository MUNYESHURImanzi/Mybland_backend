import express from 'express';
import swaggerUi from 'swagger-ui-express';
import config from './swagger.json';
import multer from 'multer';
import { createArticle, updateArticle, deleteArticle, addingComments, moreArticle, getAllArticles } from '../contrallers/Blog';
import { signupUser, loginUser } from '../contrallers/user';
import Contact from '../contrallers/contact';
import { addComment, readAllComments, readCommentsById } from "../contrallers/comments"

interface MulterRequest extends express.Request {
    file: any;
}

const upload = multer({ dest: 'uploads/' });

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(config));

app.post('/signup', signupUser);
app.post('/login', loginUser);
app.post('/contact', Contact);

app.post('/articles', upload.single('file'), (req: express.Request, res: express.Response) => {
    const multerReq = req as MulterRequest;
    createArticle(multerReq, res);
});
app.get('/articles', getAllArticles);

app.post('/articles/:id/comments', addComment);
app.get('/articles/:id/comments', readCommentsById);
app.get('/comments', readAllComments);

app.put('/articles/:articleId', updateArticle);
app.delete('/articles/:articleId', deleteArticle);
app.post('/articles/:articleId/comments', addingComments);
app.get('/articles/more', moreArticle);

app.get('/', (req, res) => {
    res.send('Welcome to the application!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
