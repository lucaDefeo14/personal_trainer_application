import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UserList from './pages/UserList';
import TrainingList from './pages/TrainingList';
import PaymentList from './pages/PaymentList';
import Signup from './pages/Signup'
import UserUpdateForm from './pages/UserUpdateForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/trainings" element={<TrainingList />} />
        <Route path="/payments" element={<PaymentList />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user/update/:id" element={<UserUpdateForm />} />

      </Routes>
    </Router>
  );
};

export default App;
