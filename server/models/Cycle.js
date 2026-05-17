import mongoose from 'mongoose';

const cycleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Cycle name is required (e.g., FY 2026 Performance Cycle)'],
      trim: true,
    },
    phase: {
      type: String,
      enum: ['GoalSetting', 'Q1', 'Q2', 'Q3', 'Q4'],
      required: true,
    },
    windowOpen: {
      type: Date,
      required: [true, 'Window opening date is required'],
    },
    windowClose: {
      type: Date,
      required: [true, 'Window closing date is required'],
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Middleware to ensure only one cycle is active at any given time
cycleSchema.pre('save', async function (next) {
  if (this.isActive) {
    await mongoose.model('Cycle').updateMany({ _id: { $ne: this._id } }, { isActive: false });
  }
  next();
});

export default mongoose.model('Cycle', cycleSchema);