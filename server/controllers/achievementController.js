import Achievement from '../models/Achievement.js';
import Goal from '../models/Goal.js';
import Cycle from '../models/Cycle.js';
import { CustomError } from '../middleware/errorMiddleware.js';

const calculateScore = (uom, target, actual) => {
  let score = 0;
  switch (uom) {
    case 'numeric_min':
      score = (actual / target) * 100;
      break;
    case 'numeric_max':
      score = (target / actual) * 100;
      break;
    case 'timeline':
      score = actual <= target ? 100 : (target / actual) * 100;
      break;
    case 'zero':
      score = actual === 0 ? 100 : 0;
      break;
    default:
      score = 0;
  }
  return Math.min(Math.max(score, 0), 150); 
};

export const logAchievement = async (req, res) => {
  const { goalId, actualValue, status } = req.body;

  const activeCycle = await Cycle.findOne({ isActive: true });
  if (!activeCycle) throw new CustomError('No active performance cycle found', 404);

  if (activeCycle.phase === 'GoalSetting') {
    throw new CustomError('Submission blocked: Achievement tracking has not opened for this cycle yet.', 400);
  }

  const now = new Date();
  if (now < activeCycle.windowOpen || now > activeCycle.windowClose) {
    throw new CustomError(`The check-in window for ${activeCycle.phase} is currently closed.`, 403);
  }

  const goal = await Goal.findById(goalId);
  if (!goal) throw new CustomError('Goal record not found', 404);
  if (goal.status !== 'approved') {
    throw new CustomError('Action denied: Progress tracking is restricted to approved goals only.', 400);
  }

  const computedScore = calculateScore(goal.uom, goal.target, actualValue);


  const achievement = await Achievement.findOneAndUpdate(
    { goalId, quarter: activeCycle.phase },
    { employeeId: req.user._id, actualValue, status, computedScore },
    { upsert: true, new: true, runValidators: true }
  );

  res.status(200).json({ success: true, message: `Progress logged for ${activeCycle.phase}!`, data: achievement });
};

export const getGoalAchievements = async (req, res) => {
  const achievements = await Achievement.find({ goalId: req.params.goalId });
  res.status(200).json({ success: true, data: achievements });
};