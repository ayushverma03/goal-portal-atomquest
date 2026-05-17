import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Placeholder Components (We will build these in next steps)
const Login = () => <div className="p-10 text-center">Login Page (Building Next)</div>;
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
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <DashboardSelector />
            </ProtectedRoute>
          } />

          <Route path="/employee/*" element={
            <ProtectedRoute allowedRoles={['employee']}>
              <div className="p-10">Employee Dashboard Shell</div>
            </ProtectedRoute>
          } />

          <Route path="/manager/*" element={
            <ProtectedRoute allowedRoles={['manager']}>
              <div className="p-10">Manager Dashboard Shell</div>
            </ProtectedRoute>
          } />

          <Route path="/admin/*" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <div className="p-10">Admin Dashboard Shell</div>
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;