import { Request, Response } from 'express';
import ChurchAttendance from '../models/Attendance';

/**
 * Get all attendance records
 * @param {Request} req
 * @param {Response} res
 */
const getAllAttendance = async (req: Request, res: Response) => {
    try {
        const attendanceRecords = await ChurchAttendance.find();
        res.status(200).json(attendanceRecords);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch attendance records', error });
    }
};

/**
 * Get a specific attendance record by ID 
 * @param {Request} req
 * @param {Response} res
 */
const getAttendanceById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const attendanceRecord = await ChurchAttendance.findById(id);
        if (!attendanceRecord) {
            res.status(404).json({ message: 'Attendance record not found' });
        }
        res.status(200).json(attendanceRecord);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch attendance record', error });
    }
};

/**
 * Create a new attendance record
 * @param {Request} req
 * @param {Response} res
 */
const createAttendance = async (req: Request, res: Response) => {
    try {
        const newAttendance = new ChurchAttendance(req.body);
        const savedAttendance = await newAttendance.save();
        res.status(201).json(savedAttendance);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create attendance record', error });
    }
};

/**
 * Update an existing attendance record by ID
 * @param {Request} req
 * @param {Response} res
 */
const updateAttendance = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const updatedAttendance = await ChurchAttendance.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedAttendance) {
            res.status(404).json({ message: 'Attendance record not found' });
        }
        res.status(200).json(updatedAttendance);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update attendance record', error });
    }
};

/**
 * Delete an attendance record by ID
 * @param {Request} req
 * @param {Response} res
 */
const deleteAttendance = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedAttendance = await ChurchAttendance.findByIdAndDelete(id);
        if (!deletedAttendance) {
            res.status(404).json({ message: 'Attendance record not found' });
        }
        res.status(200).json({ message: 'Attendance record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete attendance record', error });
    }
};

export {
    getAllAttendance,
    getAttendanceById,
    createAttendance,
    updateAttendance,
    deleteAttendance,
};
