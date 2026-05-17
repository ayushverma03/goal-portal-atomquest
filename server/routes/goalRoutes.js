import express from 'express';
import { 
  createGoal, 
  getMyGoals, 
  submitGoalSheet, 
  approveGoal, 
  returnGoal 
} from '../controllers/goalController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.post('/', authorize('employee'), createGoal);
router.get('/my', authorize('employee'), getMyGoals);
router.post('/submit', authorize('employee'), submitGoalSheet);

router.put('/:id/approve', authorize('manager'), approveGoal);
router.put('/:id/return', authorize('manager'), returnGoal);

export default router;