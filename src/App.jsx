import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Books from './pages/Books';
import Rent from './pages/Rent';
import RentHistory from './pages/RentHistory';
import Users from './pages/Users';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/books" element={
          <ProtectedRoute>
            <Books />
          </ProtectedRoute>
        } />
        <Route path="/rent" element={
          <ProtectedRoute>
            <Rent />
          </ProtectedRoute>
        } />
        <Route path="/history" element={
          <ProtectedRoute>
            <RentHistory />
          </ProtectedRoute>
        } />
        <Route path="/users" element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

export default App;