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
 * /attendance/getAttendance:
 *   get:
 *     summary: Get all attendance records
 *     responses:
 *       200:
 *         description: A list of attendance records
 */
attendanceRouter.get('/getAttendance', authMiddleware, getAllAttendance);

/**
 * @swagger
 * /attendance/getAttendanceById:
 *   get:
 *     summary: Get a single attendance record by ID
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single attendance record
 */
attendanceRouter.get('/getAttendanceById', authMiddleware, getAttendanceById);

/**
 * @swagger
 * /attendance/createAttendance:
 *   post:
 *     summary: Create a new attendance record
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Attendance'
 *     responses:
 *       200:
 *         description: The created attendance record
 */
attendanceRouter.post('/createAttendance', authMiddleware, roleMiddleware, createAttendance);

/**
 * @swagger
 * /attendance/updateAttendance/{id}:
 *   patch:
 *     summary: Update an existing attendance record
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Attendance'
 *     responses:
 *       200:
 *         description: The updated attendance record
 */
attendanceRouter.patch('/updateAttendance/:id', authMiddleware, roleMiddleware, updateAttendance);

/**
 * @swagger
 * /attendance/deleteAttendance/{id}:
 *   delete:
 *     summary: Delete an attendance record
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The deleted attendance record
 */
attendanceRouter.delete('/deleteAttendance/:id', authMiddleware, roleMiddleware, deleteAttendance);

export default attendanceRouter;