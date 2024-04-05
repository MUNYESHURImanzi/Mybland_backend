import express from 'express';
import { signupUser, loginUser } from '../contrallers/user';
import Contact from '../contrallers/contact';

export default (router: express.Router) => {
 
    router.post('/signup', signupUser);

    router.post('/login', loginUser);

    router.post('/contact', Contact);

    router.get('/', (req, res) => {
        res.send('Welcome to the application!');
    });
};
