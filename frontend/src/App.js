import React from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
import Login from './pages/Login';
import UserManagement from './pages/UserManagement';


function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/users" element={<UserManagement />} />
    </Routes>
  );
}

export default App;