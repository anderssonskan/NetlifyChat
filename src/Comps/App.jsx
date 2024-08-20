import '../Style/App.css'
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Chat from './Chat';
import Login from './Login';
import Register from './Register';
import Start from './Start';
// import PrivateRoute from './AppRoutes';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (token, userData) => {
    setUser({
      token,
      username: userData.username,
      avatar: userData.avatar,
      id: userData.id
    });
  }

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login onLogin={handleLogin} />} />
        <Route path='/chat' element={<Chat user={user} />} />
        {/* <Route path='*' element={<NoPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
