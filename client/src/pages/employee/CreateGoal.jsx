import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const CreateGoal = () => {
  const { register, handleSubmit, watch } = useForm();
  const navigate = useNavigate();
  const [currentTotal, setCurrentTotal] = useState(0);

  useEffect(() => {
    const fetchCurrentWeightage = async () => {
      const { data } = await axios.get('http://localhost:5000/api/goals/my');
      const total = data.data.reduce((sum, g) => sum + g.weightage, 0);
      setCurrentTotal(total);
    };
    fetchCurrentWeightage();
  }, []);

  const onSubmit = async (data) => {
    if (currentTotal + Number(data.weightage) > 100) {
      alert("Total weightage cannot exceed 100%");
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/goals', data);
      navigate('/employee');
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6">Create New Performance Goal</h2>
      <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded font-medium">
        Current Total Weightage: {currentTotal}% (Remaining: {100 - currentTotal}%)
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Thrust Area</label>
            <input {...register('thrustArea')} required className="w-full border rounded p-2" placeholder="e.g. Revenue" />
          </div>
          <div>
            <label className="block text-sm font-medium">Unit of Measure (UoM)</label>
            <select {...register('uom')} className="w-full border rounded p-2">
              <option value="numeric_min">Numeric (Higher is better)</option>
              <option value="numeric_max">Numeric (Lower is better)</option>
              <option value="timeline">Timeline/Date</option>
              <option value="zero">Binary (Zero-based)</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Goal Title</label>
          <input {...register('title')} required className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Target Value</label>
          <input {...register('target')} type="number" required className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Weightage (%) - Min 10</label>
          <input {...register('weightage')} type="number" min="10" required className="w-full border rounded p-2" />
        </div>
        <div className="flex gap-4 pt-4">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Save Goal</button>
          <button type="button" onClick={() => navigate('/employee')} className="bg-gray-200 px-6 py-2 rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CreateGoal;