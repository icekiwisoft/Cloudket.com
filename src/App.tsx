import './App.scss';
import Server from './pages/server';
import Login from './pages/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/register';
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/authcontext';
import Logout from './pages/logout';
import React from 'react';

function App() {
  return (

    <BrowserRouter >
      <AuthProvider>
        <Routes>

          <Route path='/' element={<PrivateRoute><Server /></PrivateRoute>} />
          <Route path='/:id' element={<PrivateRoute><Server /></PrivateRoute>} />
          <Route path='/:id/:folderid' element={<PrivateRoute><Server /></PrivateRoute>} />

          <Route path='/register' element={<Register />} />

          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>

  );
}

export default App;
