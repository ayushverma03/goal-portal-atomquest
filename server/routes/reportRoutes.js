import express from 'express';
import { getAchievementReport, exportReportCSV } from '../controllers/reportController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.get('/achievement', authorize('admin', 'manager'), getAchievementReport);
router.get('/export', authorize('admin'), exportReportCSV);

export default router;