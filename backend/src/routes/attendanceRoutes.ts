import express from 'express';
import {  
    getAllAttendance,
    getAttendanceById,
    createAttendance,
    updateAttendance,
    deleteAttendance, 
} from '../controllers/attendanceController';

const attendanceRouter = express.Router();

attendanceRouter.get('/getAttendance', getAllAttendance);
attendanceRouter.get('/getAttendanceById', getAttendanceById);
attendanceRouter.post('/createAttendance', createAttendance);
attendanceRouter.put('/updateAttendance', updateAttendance);
attendanceRouter.delete('/deleteAttendance', deleteAttendance);

export default attendanceRouter;