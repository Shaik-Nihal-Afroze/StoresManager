import React, { useEffect } from 'react';

import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';

import {Routes, Route, Navigate} from 'react-router-dom';


import { ClipLoader } from 'react-spinners';


import { useAuthStore } from './store/useAuthStore';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';

import LoginPage from './pages/LoginPage';

import SignupPage from './pages/SignUpPage';


import StoreOwner from './pages/StoreOwnerPage';

import "./App.css"

const App =() => {
  const {authUser, isCheckingAuth, checkAuth} = useAuthStore();

  

  useEffect(() => {
    checkAuth()
  }, [checkAuth]);

  // console.log({authUser})
  
  const Loader = () => {
  return (
    <div className="loader-container">
      <div className="dot-wave">
        <div className="dot dot1"></div>
        <div className="dot dot2"></div>
        <div className="dot dot3"></div>
        <div className="dot dot4"></div>
      </div>
      <p className="loading-text">Loading the app...⏳ This may take 15–20 seconds.</p>
    </div>
  );
};
  if (isCheckingAuth && !authUser){
    return (
      <div className='loader-container'>
        
        <Loader color="#123abc" size={50} />;
      </div>
    )
  }


  return (
    <>
      <Routes>
        <Route path="/" element={!authUser ? <Navigate to="/login"/> :<Navigate to={`/${authUser.role.toLowerCase()}`}/> } />
        <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to={`/${authUser.role.toLowerCase()}`}/>}/>
        <Route path="/signup" element={!authUser ? <SignupPage/> : <Navigate to={`/${authUser.role.toLowerCase()}`}/>}/>
        <Route path="/user" element={authUser?.role === 'User' ? <UserPage/> : <Navigate to="/login"/> }/>
        <Route path="/admin" element={authUser?.role === 'Admin' ? <AdminPage/> : <Navigate to="/login"/> }/>
        <Route path="/owner" element={authUser?.role === 'Owner' ? <StoreOwner/> : <Navigate to="/login"/> }/>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
