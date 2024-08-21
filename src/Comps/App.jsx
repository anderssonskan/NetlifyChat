import '../Style/App.css'
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Chat from './Chat';
import Login from './Login';
import Register from './Register';
import Start from './Start';
// import PrivateRoute from './AppRoutes';

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storageData = localStorage.getItem('user')
    const user = JSON.parse(storageData)
    if (user !== null) {
      setUser(user);
    }
  }, []);

  const handleLogin = (token, userData) => {
    const user = {
      token,
      ...userData,
    };

    localStorage.setItem('user', JSON.stringify(user))
    setUser(user);
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
