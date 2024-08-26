// export default App;

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/helpers/authProvider';
import Login from './components/login.component';
import Home from './components/home.component';
import PrivateRoute from "./components/helpers/private-route.component";
import Profile from './components/profile.component'
import RegisterForm from './components/register.component'
import Navbar from './components/navbar.component';
import './App.css';
import SeanceForm from './components/seance/seance-form.component';
import Seance from './components/seance/seance.component';
import SeanceTemplate from './components/seance/seance-template.component';
const App: React.FC = () => {
  return (
    <div className="">
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/seance" element={<Seance />} />
            <Route path="/seance-form" element={<SeanceForm />} />
            <Route path="/seance-template" element={<SeanceTemplate />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
