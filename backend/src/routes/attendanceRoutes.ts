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

/**
 * @swagger
 * tags:
 *   - name: Attendance
 * /attendance/getAttendance:
 *   get:
 *     summary: Get all attendance records
 *     tags: [Attendance]
 *     responses:
 *       200:
 *         description: A list of attendance records
 */
attendanceRouter.get('/getAttendance', authMiddleware, getAllAttendance);

/**
 * @swagger
 * tags:
 *   - name: Attendance
 * /attendance/getAttendanceById:
 *   get:
 *     summary: Get a specific attendance record by ID
 *     tags: [Attendance]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the attendance record
 *     responses:
 *       200:
 *         description: An attendance record
 */
attendanceRouter.get('/getAttendanceById', authMiddleware, getAttendanceById);

/**
 * @swagger
 * tags:
 *   - name: Attendance
 * /attendance/createAttendance:
 *   post:
 *     summary: Create a new attendance record
 *     tags: [Attendance]
 *     responses:
 *       201:
 *         description: The created attendance record
 */
attendanceRouter.post('/createAttendance', authMiddleware, roleMiddleware, createAttendance);

/**
 * @swagger
 * tags:
 *   - name: Attendance
 * /attendance/updateAttendance/{id}:
 *   patch:
 *     summary: Update an existing attendance record by ID
 *     tags: [Attendance]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the attendance record
 *     responses:
 *       200:
 *         description: The updated attendance record
 */
attendanceRouter.patch('/updateAttendance/:id', authMiddleware, roleMiddleware, updateAttendance);

/**
 * @swagger
 * tags:
 *   - name: Attendance
 * /attendance/deleteAttendance/{id}:
 *   delete:
 *     summary: Delete an attendance record by ID
 *     tags: [Attendance]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the attendance record
 *     responses:
 *       200:
 *         description: A message indicating the record was deleted
 */
attendanceRouter.delete('/deleteAttendance/:id', authMiddleware, roleMiddleware, deleteAttendance);

export default attendanceRouter;