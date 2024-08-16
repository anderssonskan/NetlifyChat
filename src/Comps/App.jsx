import '../Style/App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Chat from './Chat';
import Login from './Login';
import Register from './Register';
import Start from './Start';
// import PrivateRoute from './AppRoutes';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        {/* <Route path='*' element={<NoPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
