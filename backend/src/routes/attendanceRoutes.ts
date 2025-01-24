import express from 'express';
import {  
    getAllAttendance,
    getAttendanceById,
    createAttendance,
    updateAttendance,
    deleteAttendance, 
} from '../controllers/attendanceController';
import authMiddleware from '../middlewares/authMiddleware';
import roleMiddleware from '../middlewares/roleMiddleware';

const attendanceRouter = express.Router();

attendanceRouter.get('/getAttendance', authMiddleware, getAllAttendance);
attendanceRouter.get('/getAttendanceById', authMiddleware, getAttendanceById);
attendanceRouter.post('/createAttendance', authMiddleware, roleMiddleware, createAttendance);
attendanceRouter.patch('/updateAttendance/:id', authMiddleware, roleMiddleware, updateAttendance);
attendanceRouter.delete('/deleteAttendance/:id', authMiddleware, roleMiddleware, deleteAttendance);

export default attendanceRouter;