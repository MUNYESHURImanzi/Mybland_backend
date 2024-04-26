// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import { Request, Response } from 'express';
// import UserModel from '../schema/users';
// import { signupUser, loginUser } from './auth';

// jest.mock('./bcrypt');
// jest.mock('jsonwebtoken'); 
// describe('Signup User', () => {
//     beforeEach(() => {
//         UserModel.mockClear(); 
// jwt.mockClear();
//     });

//     test('Should successfully create a new user', async () => {
//         const email = '<EMAIL>';
//         const password = '<PASSWORD>';

//         jwt.sign.mockResolvedValue(jwtToken);
//         bcrypt.hash.mockResolvedValue('hashedPassword');
//         UserModel.findOne.mockResolvedValue({}); 
// const response = await signupUser({ body: { name: 'John Doe', email, password } } as Request, {} as Response);
//         expect(response.status).toBe(201);
//         expect(response.json).toHaveBeenCalledWith({ message: 'User created successfully' });
//     });

//     test('Should return 400 if user already exists', async () => {
//         const email = '<EMAIL>';

//         UserModel.findOne.mockResolvedValue({}); 
// const response = await signupUser({ body: { name: 'John Doe', email, password: 'password' } } as Request, {} as Response);
//         expect(response.status).toBe(400);
//         expect(response.json).toHaveBeenCalledWith({ message: 'Email already in use' });
//     });
// });

// describe('Login User', () => {
//     beforeEach(() => {
//         UserModel.mockClear(); 
// jwt.mockClear();
//     });

//     test('Should successfully log in user', async () => {
//         const email = '<EMAIL>';
//         const password = '<PASSWORD>';

//         UserModel.findOne.mockResolvedValue({ password: 'hashedPassword' }); 
// bcrypt.compare.mockResolvedValue(true);
//         jwt.sign.mockResolvedValue(jwtToken);

//         const response = await loginUser({ body: { email, password } } as Request, {} as Response);
//         expect(response.status).toBe(200);
//         expect(response.json).toHaveBeenCalledWith({ message: 'Login successful', token: jwtToken });
//     });

//     test('Should return 401 for invalid credentials', async () => {
//         const email = '<EMAIL>';
//         const password = '<PASSWORD>';

//         UserModel.findOne.mockResolvedValue(null); // User not found
// const response = await loginUser({ body: { email, password } } as Request, {} as Response);
//         expect(response.status).toBe(401);
//         expect(response.json).toHaveBeenCalledWith({ message: 'Invalid email or password' });
//     });
// });
