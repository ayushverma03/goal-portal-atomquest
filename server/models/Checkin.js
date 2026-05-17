import mongoose from 'mongoose';

const checkinSchema = new mongoose.Schema(
  {
    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    goalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Goal',
      required: true,
    },
    quarter: {
      type: String,
      enum: ['Q1', 'Q2', 'Q3', 'Q4'],
      required: true,
    },
    comment: {
      type: String,
      required: [true, 'Check-in evaluation commentary cannot be blank'],
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Checkin', checkinSchema);