import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    thrustArea: {
      type: String,
      required: [true, 'Thrust area is required (e.g., Innovation, Revenue)'],
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Goal title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    uom: {
      type: String,
      enum: ['numeric_min', 'numeric_max', 'timeline', 'zero'],
      required: [true, 'Unit of Measure (UoM) is required'],
    },
    target: {
      type: Number,
      required: [true, 'Target evaluation criteria value is required'],
    },
    weightage: {
      type: Number,
      required: [true, 'Weightage percentage is required'],
      min: [10, 'Minimum weightage per individual goal is 10%'],
    },
    status: {
      type: String,
      enum: ['draft', 'submitted', 'approved', 'returned'],
      default: 'draft',
    },
    isShared: {
      type: Boolean,
      default: false,
    },
    primaryOwnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    lockedAt: {
      type: Date,
      default: null,
    },
    cycleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cycle',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Goal', goalSchema);