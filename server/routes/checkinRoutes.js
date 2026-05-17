import express from 'express';
import { createCheckin, getCheckins } from '../controllers/checkinController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.post('/', authorize('manager'), createCheckin);
router.get('/:employeeId/:quarter', getCheckins);

export default router;