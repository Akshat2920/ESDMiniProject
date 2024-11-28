import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/js/bootstrap.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import './App.css';
import Login from './pages/Login';
import View from './pages/View';
import MainLayout from './layouts/MainLayout';

import React, { useState, useEffect } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, Navigate, RouterProvider } from 'react-router-dom';
import { validateToken } from './utils/httputil';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  // Check for token in localStorage on page load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      validateToken(token)
        .then(isValid => {
          if (isValid) {
            setLoggedIn(true);
          } else {
            handleLogout();
          }
        })
        .catch(() => handleLogout());
    }
  }, []);

  // Function to handle login and store the JWT token
  const handleLogin = (token) => {
    localStorage.setItem('token', token); // Store the token in localStorage
    setLoggedIn(true); // Update the loggedIn state to true
  };

  // Function to handle logout and remove the JWT token
  const handleLogout = () => {
    localStorage.clear(); // Clearing local storage on logout
    setLoggedIn(false); // Set loggedIn state to false
  };

  // Router configuration with authentication logic
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout loggedIn={loggedIn} handleLogout={handleLogout} />}>
        <Route index element={<Navigate to="/login" />} />
        <Route 
          path="/login" 
          element={
            !loggedIn ? <Login onLogin={handleLogin} /> : <Navigate to="/view" />
          }
        />
        <Route 
          path="/view" 
          element={
            loggedIn ? <View /> : <Navigate to="/login" />
          }
        />
        <Route path="*" element={<div>Error 404 - Page not found</div>} />
      </Route>
    )
  );

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;