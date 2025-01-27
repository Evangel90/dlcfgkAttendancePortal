import express, { Request, Response } from "express";
import authRouter from "./routes/authRoutes";
import connectDB from './config/db';
import attendanceRouter from "./routes/attendanceRoutes";
import setupSwagger from './config/swagger';

connectDB()

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to the Express + TypeScript Server!" });
});

app.use('/user', authRouter)
app.use('/attendance', attendanceRouter)

setupSwagger(app);

app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}`);
});