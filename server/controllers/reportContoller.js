import Goal from '../models/Goal.js';
import Achievement from '../models/Achievement.js';
import User from '../models/User.js';

export const getAchievementReport = async (req, res) => {
  const { employeeId, department, quarter } = req.query;
  let query = {};

  if (employeeId) query.employeeId = employeeId;
  
  if (department) {
    const usersInDept = await User.find({ department }).select('_id');
    query.employeeId = { $in: usersInDept.map(u => u._id) };
  }

  const goals = await Goal.find(query).populate('employeeId', 'name department');
  
  const report = await Promise.all(goals.map(async (goal) => {
    const achievements = await Achievement.find({ 
      goalId: goal._id, 
      ...(quarter && { quarter }) 
    });
    return { goal, achievements };
  }));

  res.status(200).json({ success: true, data: report });
};

export const exportReportCSV = async (req, res) => {
  const goals = await Goal.find().populate('employeeId', 'name department');
  let csv = 'Employee,Department,Goal,Target,Weightage,Status\n';
  
  goals.forEach(g => {
    csv += `${g.employeeId.name},${g.employeeId.department},${g.title},${g.target},${g.weightage},${g.status}\n`;
  });

  res.header('Content-Type', 'text/csv');
  res.attachment('achievement-report.csv');
  res.send(csv);
};