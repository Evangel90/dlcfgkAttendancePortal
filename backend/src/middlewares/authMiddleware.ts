import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'No token provided, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'jwtsecret');
        req.user = decoded as { id: string; role: string };
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token is not valid' });
    }
};

export default authMiddleware;