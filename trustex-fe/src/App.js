import logo from './logo.svg';
import { BrowserRouter, Navigate, Route, Routes, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import Profile from './components/Profile/Profile';
import { useState, useEffect } from 'react';

import './App.css';
import Home from './components/Home/Home';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("tokenKey");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("tokenKey");
    localStorage.removeItem("currentUser");
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/profile" 
            element={isAuthenticated ? <Profile /> : <Navigate to="/auth" />} 
          />
        <Route 
            path="/auth" 
            element={!isAuthenticated ? <Auth onLogin={handleLogin} /> : <Navigate to="/" />} 
          />
{/* {   <Route 
            path="/auth/register" 
            element={!isAuthenticated ? <Auth onLogin={handleLogin} /> : <Navigate to="/" />} 
          />} */}
       </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
