import { Request, RequestHandler, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const ping: RequestHandler = async(req: Request, res: Response) =>{
    console.log(req)
    const message = req.baseUrl;
    res.status(201).json({message: message})
}

const register: RequestHandler = async (req: Request, res: Response) => {
    // const { name, email, password, role } = await req.body;

    // console.log(name, email, password, role)
    // if (!name || !email || !password) res.status(400).json({ error: "All fields are required" })

    try {
        const hashedPassword = await bcrypt.hash("password", 10);
        const user = new User({ name:"name", email: "email@email.com", password: hashedPassword, role:"user" });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Server error' });
    }
};

const login: RequestHandler = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'jwtsecret', {
            expiresIn: '1m',
        });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export { register, login, ping };
