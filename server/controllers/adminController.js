import Cycle from '../models/Cycle.js';
import AuditLog from '../models/AuditLog.js';

export const getCycles = async (req, res) => {
  const cycles = await Cycle.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, data: cycles });
};

export const createCycle = async (req, res) => {
  const cycle = await Cycle.create(req.body);
  res.status(201).json({ success: true, data: cycle });
};

export const toggleCycleActive = async (req, res) => {
  const cycle = await Cycle.findById(req.params.id);
  cycle.isActive = !cycle.isActive;
  await cycle.save();
  res.status(200).json({ success: true, data: cycle });
};

export const getAuditLogs = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const logs = await AuditLog.find()
    .populate('changedBy', 'name email')
    .sort({ timestamp: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  res.status(200).json({ success: true, data: logs });
};