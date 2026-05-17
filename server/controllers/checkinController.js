import Checkin from '../models/Checkin.js';
import { CustomError } from '../middleware/errorMiddleware.js';

export const createCheckin = async (req, res) => {
  const { employeeId, goalId, quarter, comment } = req.body;

  const checkin = await Checkin.create({
    managerId: req.user._id,
    employeeId,
    goalId,
    quarter,
    comment
  });

  res.status(201).json({ success: true, data: checkin });
};

export const getCheckins = async (req, res) => {
  const { employeeId, quarter } = req.params;
  const checkins = await Checkin.find({ employeeId, quarter });
  res.status(200).json({ success: true, data: checkins });
};