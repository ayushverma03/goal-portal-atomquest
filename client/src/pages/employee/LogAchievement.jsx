import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const LogAchievement = () => {
  const [goals, setGoals] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const fetchApproved = async () => {
      const { data } = await axios.get('http://localhost:5000/api/goals/my');
      setGoals(data.data.filter(g => g.status === 'approved'));
    };
    fetchApproved();
  }, []);

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:5000/api/achievements', data);
      alert('Achievement logged and score computed!');
      reset();
    } catch (err) {
      alert(err.response.data.message || 'Error logging achievement');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Log Quarterly Progress</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow space-y-4">
        <div>
          <label className="block text-sm font-medium">Select Goal</label>
          <select {...register('goalId')} required className="w-full border rounded p-2">
            {goals.map(g => <option key={g._id} value={g._id}>{g.title}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Quarter</label>
            <select {...register('quarter')} className="w-full border rounded p-2">
              <option value="Q1">Q1</option>
              <option value="Q2">Q2</option>
              <option value="Q3">Q3</option>
              <option value="Q4">Q4</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Actual Value</label>
            <input {...register('actualValue')} type="number" required className="w-full border rounded p-2" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Status</label>
          <select {...register('status')} className="w-full border rounded p-2">
            <option value="NotStarted">Not Started</option>
            <option value="OnTrack">On Track</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded font-bold hover:bg-green-700">
          Update Progress
        </button>
      </form>
    </div>
  );
};

export default LogAchievement;