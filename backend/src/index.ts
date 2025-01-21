import express, { Request, Response } from "express";
import authRouter from "./routes/authRoutes";
import connectDB from './config/db';

connectDB()

const app = express();

const port = process.env.PORT || 3000;

// app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to the Express + TypeScript Server!" });
});

app.use('/api', authRouter)

app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}`);
});