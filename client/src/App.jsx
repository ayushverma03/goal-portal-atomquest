import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import GoalList from './pages/employee/GoalList';
import CreateGoal from './pages/employee/CreateGoal';
import TeamGoals from './pages/manager/TeamGoals';
import LogAchievement from './pages/employee/LogAchievement';
import AdminDashboard from './pages/admin/AdminDashboard';

const DashboardSelector = () => {
  const { user } = useAuth();
  if (user.role === 'admin') return <Navigate to="/admin" />;
  if (user.role === 'manager') return <Navigate to="/manager" />;
  return <Navigate to="/employee" />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Root Redirector */}
          <Route path="/" element={
            <ProtectedRoute>
              <DashboardSelector />
            </ProtectedRoute>
          } />

          {/* Employee Routes */}
          <Route path="/employee/*" element={
            <ProtectedRoute allowedRoles={['employee']}>
              <Routes>
                <Route path="/" element={<GoalList />} />
                <Route path="/create" element={<CreateGoal />} />
                <Route path="/log" element={<LogAchievement />} />
              </Routes>
            </ProtectedRoute>
          } />

          {/* Manager Routes */}
          <Route path="/manager/*" element={
            <ProtectedRoute allowedRoles={['manager']}>
              <Routes>
                <Route path="/" element={<TeamGoals />} />
              </Routes>
            </ProtectedRoute>
          } />

          {/* Admin Routes */}
         <Route path="/admin/*" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Routes>
                <Route path="/" element={<AdminDashboard />} />
              </Routes>
            </ProtectedRoute>
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;