import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema(
  {
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
    actualValue: {
      type: Number,
      required: [true, 'Actual achieved value is required'],
    },
    status: {
      type: String,
      enum: ['NotStarted', 'OnTrack', 'Completed'],
      default: 'NotStarted',
    },
    computedScore: {
      type: Number,
      default: 0, // Calculated dynamically by business logic rules later
    },
  },
  { timestamps: true }
);

// Prevent duplicate achievement entries for the same goal in the same quarter
achievementSchema.index({ goalId: 1, quarter: 1 }, { unique: true });

export default mongoose.model('Achievement', achievementSchema);