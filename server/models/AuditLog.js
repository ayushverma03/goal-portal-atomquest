import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema(
  {
    entityType: {
      type: String,
      required: true, // e.g., 'Goal'
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    changeType: {
      type: String,
      enum: ['CREATE', 'UPDATE', 'SUBMIT', 'APPROVE', 'RETURN', 'ADMIN_UNLOCK'],
      required: true,
    },
    before: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    after: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model('AuditLog', auditLogSchema);