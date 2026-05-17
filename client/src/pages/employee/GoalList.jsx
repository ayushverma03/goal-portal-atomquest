import { useEffect, useState } from 'react';
import axios from 'axios';

const GoalList = () => {
  const [goals, setGoals] = useState([]);
  const [totalWeightage, setTotalWeightage] = useState(0);

  const fetchGoals = async () => {
    const { data } = await axios.get('http://localhost:5000/api/goals/my');
    setGoals(data.data);
    setTotalWeightage(data.data.reduce((sum, g) => sum + g.weightage, 0));
  };

  const submitSheet = async () => {
    try {
      await axios.post('http://localhost:5000/api/goals/submit');
      alert('Goal sheet submitted successfully!');
      fetchGoals();
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  useEffect(() => { fetchGoals(); }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Goals</h1>
        <div className={`px-4 py-2 rounded font-bold ${totalWeightage === 100 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
          Total Weightage: {totalWeightage}%
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {goals.map(goal => (
          <div key={goal._id} className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
            <div className="flex justify-between text-xs font-bold uppercase text-gray-500 mb-2">
              <span>{goal.thrustArea}</span>
              <span className={`px-2 py-1 rounded ${goal.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-gray-100'}`}>{goal.status}</span>
            </div>
            <h3 className="font-bold text-lg mb-1">{goal.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{goal.description}</p>
            <div className="flex justify-between items-end">
              <span className="text-sm font-medium italic">UoM: {goal.uom}</span>
              <span className="text-xl font-bold text-blue-600">{goal.weightage}%</span>
            </div>
          </div>
        ))}
      </div>

      {totalWeightage === 100 && goals.some(g => g.status === 'draft' || g.status === 'returned') && (
        <button onClick={submitSheet} className="mt-8 bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700">
          Submit Goal Sheet
        </button>
      )}
    </div>
  );
};

export default GoalList;