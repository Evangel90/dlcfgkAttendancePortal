import express from 'express';
import { login, register, ping } from '../controllers/authController';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);

export default authRouter;