import Goal from '../models/Goal.js';
import Cycle from '../models/Cycle.js';
import AuditLog from '../models/AuditLog.js';
import User from '../models/User.js';
import { CustomError } from '../middleware/errorMiddleware.js';

const logAudit = async (entityId, user, type, before, after) => {
  await AuditLog.create({
    entityType: 'Goal',
    entityId,
    changedBy: user._id,
    changeType: type,
    before: before ? before.toObject() : null,
    after: after ? after.toObject() : null
  });
};

export const createGoal = async (req, res) => {
  const { thrustArea, title, description, uom, target, weightage } = req.body;
  const activeCycle = await Cycle.findOne({ isActive: true });
  
  if (!activeCycle) throw new CustomError('No active cycle found', 404);

  const count = await Goal.countDocuments({ employeeId: req.user._id, cycleId: activeCycle._id });
  if (count >= 8) throw new CustomError('Limit reached: Max 8 goals allowed', 400);

  const goal = await Goal.create({
    employeeId: req.user._id,
    thrustArea, title, description, uom, target, weightage,
    cycleId: activeCycle._id
  });

  res.status(201).json({ success: true, data: goal });
};

export const getMyGoals = async (req, res) => {
  const goals = await Goal.find({ employeeId: req.user._id });
  res.status(200).json({ success: true, data: goals });
};

export const submitGoalSheet = async (req, res) => {
  const goals = await Goal.find({ employeeId: req.user._id, status: { $ne: 'approved' } });
  
  const totalWeightage = goals.reduce((sum, g) => sum + g.weightage, 0);
  if (totalWeightage !== 100) {
    throw new CustomError(`Total weightage must be 100%. Current sum: ${totalWeightage}%`, 400);
  }

  await Goal.updateMany(
    { employeeId: req.user._id, status: { $in: ['draft', 'returned'] } },
    { status: 'submitted' }
  );

  res.status(200).json({ success: true, message: 'Goal sheet submitted for review' });
};

export const approveGoal = async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) throw new CustomError('Goal not found', 404);

  const oldState = await Goal.findById(req.params.id);
  
  goal.status = 'approved';
  goal.lockedAt = new Date();
  await goal.save();

  await logAudit(goal._id, req.user, 'APPROVE', oldState, goal);
  res.status(200).json({ success: true, data: goal });
};

export const returnGoal = async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) throw new CustomError('Goal not found', 404);

  const oldState = await Goal.findById(req.params.id);
  goal.status = 'returned';
  goal.lockedAt = null;
  await goal.save();

  await logAudit(goal._id, req.user, 'RETURN', oldState, goal);
  res.status(200).json({ success: true, message: 'Goal returned for rework' });
};

export const getTeamGoals = async (req, res) => {
  try {
    // 1. Find all users who report to this specific manager
    const teamMembers = await User.find({ managerId: req.user._id }).select('_id');
    const teamIds = teamMembers.map(member => member._id);

    // 2. Find all goals belonging to those users that are ready for management review
    const goals = await Goal.find({
      employeeId: { $in: teamIds },
      status: { $in: ['submitted', 'approved', 'returned'] }
    }).populate('employeeId', 'name email department'); // Enriches the response with worker names

    res.status(200).json({ success: true, count: goals.length, data: goals });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error retrieving team data', error: err.message });
  }
};