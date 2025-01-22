import mongoose, { Schema, Document } from 'mongoose';

interface IChurchAttendance extends Document{
    date: Date;
    churchDay: 'Sunday Service' | 'Bible Study' | 'Revival Hour' | 'Workers Meeting' | 'Koinonia' | 'G.C.K' | 'Other';
    categories: {
        Children: { male: number; female: number };
        Youth: { male: number; female: number };
        Adult: { male: number; female: number };
        Visitor: { male: number; female: number };
    };
    totalAttendance: number;
    notes?: string;
}

const churchAttendanceSchema = new Schema<IChurchAttendance>({
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    churchDay: {
        type: String,
        enum: ['Sunday Service', 'Bible Study', 'Revival Hour', 'Workers Meeting', 'Koinonia', 'G.C.K', 'Other'],
        required: true,
    },
    categories: {
        type: Object,
        required: true,
        validate: {
            validator: function(value: any) {
                const requiredKeys = ['Children', 'Youth', 'Adult', 'Visitor'];
                return requiredKeys.every(key => key in value && 'male' in value[key] && 'female' in value[key]);
            },
            message: 'Each category must have male and female counts.',
        },
    },
    totalAttendance: {
        type: Number,
        required: true,
    },
    notes: {
        type: String,
        maxlength: 500,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt timestamps
});

const ChurchAttendance = mongoose.model<IChurchAttendance>('ChurchAttendance', churchAttendanceSchema);

export { IChurchAttendance, ChurchAttendance };
