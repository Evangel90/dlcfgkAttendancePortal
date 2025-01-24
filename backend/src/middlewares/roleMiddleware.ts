import { Request, Response, NextFunction } from 'express';

const roleMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (!userRole) {
        res.status(401).json({ message: 'Unauthorized' });
    }

    if (userRole !== 'admin') {
        res.status(403).json({ message: 'Access Denied' });
    }

    next();
};

export default roleMiddleware;