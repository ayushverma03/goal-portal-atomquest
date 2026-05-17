import express from 'express';
import { getCycles, createCycle, toggleCycleActive, getAuditLogs } from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect, authorize('admin'));

router.get('/cycles', getCycles);
router.post('/cycles', createCycle);
router.put('/cycles/:id/activate', toggleCycleActive);
router.get('/audit-logs', getAuditLogs);

export default router;