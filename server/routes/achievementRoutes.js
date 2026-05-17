import express from 'express';
import { logAchievement, getGoalAchievements } from '../controllers/achievementController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.post('/', authorize('employee'), logAchievement);
router.get('/goal/:goalId', getGoalAchievements);

export default router;