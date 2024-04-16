import express, { RequestHandler } from 'express';
import { createArticle, updateArticle,getSingleArticle, deleteArticle, addingComments, moreArticle, getAllArticles } from '../contrallers/Blog';
import { signupUser, loginUser } from '../contrallers/user';
import Contact from '../contrallers/contact';
import multer from 'multer';
import  { addComment, readAllComments, readCommentsById } from "../contrallers/comments"

interface MulterRequest extends express.Request {
    file: any;
}

const upload = multer({ dest: 'uploads/' })

export default (router: express.Router) => {
    router.post('/signup', signupUser);
    router.post('/login', loginUser);
    router.post('/contact', Contact);


    router.post('/articles', upload.single('file'), (req: express.Request, res: express.Response) => {

        const multerReq = req as MulterRequest;
        createArticle(multerReq, res);
    });

    router.get('/articles', getAllArticles);
    router.get('/articles/:articleId', getSingleArticle)


    router.post('/articles/:id/comments', addComment);

    router.get('/articles/:id/comments', readCommentsById);
 
    router.get('/comments', readAllComments);
    router.put('/articles/:articleId', updateArticle);
    router.delete('/articles/:articleId', deleteArticle);
    router.post('/articles/:articleId/comments', addingComments);
    router.get('/articles/more', moreArticle);

    router.get('/', (req, res) => {
        res.send('Welcome to the application!');
    });
};
