import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import GoalList from './pages/employee/GoalList';

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
                {/* We will add /create and /edit here in Step 9 */}
              </Routes>
            </ProtectedRoute>
          } />

          {/* Manager Routes */}
          <Route path="/manager/*" element={
            <ProtectedRoute allowedRoles={['manager']}>
              <div className="p-10">
                <h1 className="text-2xl font-bold">Manager Dashboard</h1>
                <p>Manager content coming in next step...</p>
              </div>
            </ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin/*" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <div className="p-10">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p>Admin content coming in next step...</p>
              </div>
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