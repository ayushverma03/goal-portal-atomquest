import { useEffect, useState } from 'react';
import axios from 'axios';

const TeamGoals = () => {
  const [goals, setGoals] = useState([]);

  const fetchTeamGoals = async () => {
    const { data } = await axios.get('http://localhost:5000/api/goals/team');
    setGoals(data.data);
  };

  const handleAction = async (id, action) => {
    let commentPayload = '';

    if (action === 'return') {
      const managerComment = prompt("Please provide feedback or a reason for returning this goal for rework:");
      
      if (managerComment === null) return;

      if (!managerComment.trim()) {
        alert("Action aborted: A feedback comment is strictly required to return goals[cite: 1].");
        return;
      }
      commentPayload = managerComment;
    } else if (action === 'approve') {
      // Optional comment for approvals
      commentPayload = 'Approved by manager';
    }

    try {
      await axios.put(`http://localhost:5000/api/goals/${id}/${action}`, {
        comment: commentPayload
      });
      fetchTeamGoals();
    } catch (err) {
      alert("Action failed");
    }
  };

  useEffect(() => { fetchTeamGoals(); }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Team Goal Approvals</h1>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-medium">Employee</th>
              <th className="p-4 font-medium">Goal Title</th>
              <th className="p-4 font-medium">Weightage</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {goals.map(goal => (
              <tr key={goal._id} className="border-b hover:bg-gray-50">
                <td className="p-4">{goal.employeeId?.name || 'N/A'}</td>
                <td className="p-4">{goal.title}</td>
                <td className="p-4 font-bold">{goal.weightage}%</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${goal.status === 'submitted' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}>
                    {goal.status}
                  </span>
                </td>
                <td className="p-4 space-x-2">
                  {goal.status === 'submitted' && (
                    <>
                      <button onClick={() => handleAction(goal._id, 'approve')} className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition">Approve</button>
                      <button onClick={() => handleAction(goal._id, 'return')} className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition">Return</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamGoals;