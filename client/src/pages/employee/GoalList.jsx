import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GoalList = () => {
  const [goals, setGoals] = useState([]);
  const [totalWeightage, setTotalWeightage] = useState(0);
  const navigate = useNavigate();

  const fetchGoals = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/goals/my');
      setGoals(data.data);
      setTotalWeightage(data.data.reduce((sum, g) => sum + g.weightage, 0));
    } catch (err) {
      console.error("Error fetching goals");
    }
  };

  const submitSheet = async () => {
    try {
      await axios.post('http://localhost:5000/api/goals/submit');
      alert('Goal sheet submitted successfully!');
      fetchGoals();
    } catch (err) {
      alert(err.response?.data?.message || "Submission failed");
    }
  };

  useEffect(() => { fetchGoals(); }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Goals</h1>
          <p className="text-gray-500">Manage your performance objectives for the current cycle.</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className={`px-4 py-2 rounded-lg border font-bold ${totalWeightage === 100 ? 'bg-green-50 border-green-200 text-green-700' : 'bg-amber-50 border-amber-200 text-amber-700'}`}>
            Total Weightage: {totalWeightage}%
          </div>
          <button 
            onClick={() => navigate('/employee/create')}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            + Add New Goal
          </button>
        </div>
      </div>

      {goals.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <h3 className="text-lg font-medium text-gray-600">No goals created yet.</h3>
          <p className="text-gray-400 mb-6">Start by adding your first goal for this cycle.</p>
          <button 
            onClick={() => navigate('/employee/create')}
            className="text-blue-600 font-bold hover:underline"
          >
            Click here to add your first goal
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {goals.map(goal => (
            <div key={goal._id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
               <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black tracking-widest uppercase px-2 py-1 bg-gray-100 rounded text-gray-500">
                  {goal.thrustArea}
                </span>
                <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${
                  goal.status === 'approved' ? 'bg-green-100 text-green-700' : 
                  goal.status === 'submitted' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {goal.status}
                </span>
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">{goal.title}</h3>
              <p className="text-gray-500 text-sm h-12 overflow-hidden mb-4">{goal.description}</p>
              <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                <span className="text-xs text-gray-400 italic">Target: {goal.target} ({goal.uom})</span>
                <span className="text-lg font-black text-blue-600">{goal.weightage}%</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalWeightage === 100 && goals.some(g => g.status === 'draft' || g.status === 'returned') && (
        <div className="mt-10 p-6 bg-blue-600 rounded-xl text-white flex justify-between items-center">
          <div>
            <h4 className="font-bold text-lg">Ready to submit?</h4>
            <p className="text-blue-100 text-sm">Your total weightage is exactly 100%. You can now send this to your manager.</p>
          </div>
          <button onClick={submitSheet} className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition">
            Submit for Approval
          </button>
        </div>
      )}
    </div>
  );
};

export default GoalList;