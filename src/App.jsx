import React from 'react'
import {  Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import VerifyEmail from './pages/VerifyEmail'
import RestePassword from './pages/RestePassword'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element= {<Home/>} />
        <Route path='/login' element = {<Login/>} />
        <Route path='/verifyemail' element = {<VerifyEmail/>} />
        <Route path='/resetpassword' element = {<RestePassword/>} />
      </Routes>
      <ToastContainer position='top-right' theme='dark'/>
    </div>
  )
}

export default App