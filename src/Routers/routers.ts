import express from 'express';
import multer from 'multer';
import { createArticle, updateArticle, getSingleArticle, deleteArticle, addingComments, moreArticle, getAllArticles } from '../controllers/Blog';
import { signupUser, loginUser } from '../controllers/user';
import { Contact, getAllContacts } from '../controllers/contact';
import { addComment, readAllComments, readCommentsById } from '../controllers/comments';

interface MulterRequest extends express.Request {
    file: any;
}

const upload = multer({ dest: 'uploads/' });

export default (router: express.Router) => {
    router.post('/signup', signupUser);
    router.post('/login', loginUser);
    router.post('/contact', Contact);
    router.get('/allcontact', getAllContacts);

    router.post('/articles', upload.single('file'), (req: express.Request, res: express.Response) => {
        const multerReq = req as MulterRequest;
        createArticle(multerReq, res);
    });

    router.get('/articles', getAllArticles);
    router.get('/articles/:articleId', getSingleArticle);
    router.put('/articles/:articleId', upload.single('file'), updateArticle);
    router.delete('/articles/:articleId', deleteArticle);
    router.post('/articles/:articleId/comments', addingComments);
    router.get('/articles/:articleId/comments', readCommentsById);
    router.get('/comments', readAllComments);
    router.post('/articles/:id/comments', addComment);
    router.get('/articles/more', moreArticle);

    router.get('/', (req, res) => {
        res.send('Welcome to the application!');
    });
};
