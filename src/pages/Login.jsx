import React, { useState } from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { appContext } from "../context/appContext";
import { toast } from 'react-toastify';
import axios from "axios";

const Login = () => {
  const [state, setstate] = useState("sign up");
  const navigate = useNavigate()

  const { backend_URL, setisLoggedIn, getUserData } = useContext(appContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async(e) => {
    e.preventDefault();

    try {
        axios.defaults.withCredentials = true
        if(state === 'sign up'){
            const {data} = await axios.post(backend_URL+'/auth/register', {name, email, password})
            if(data.success){
                setisLoggedIn(true);
                getUserData()
                toast.success('Successfully Register')
                navigate('/')
            }else{
                toast.error(data.message)
            }
        }else{
            const {data} = await axios.post(backend_URL+'/auth/login', {email, password})
            if(data.success){
                setisLoggedIn(true);
                getUserData()
                toast.success('Login Successfully')
                navigate('/')
            }else{
                toast.error(data.message)
            }
        }
    } catch (error) {
        toast.error(error.message)
    }
  }

  return (
    <div className="flex  items-center justify-center min-h-screen px-6 sm:px-0 bg-linear-to-br from-blue-200 to-purple-400">
      <img
      onClick={() => navigate('/')}
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      <div className="bg-slate-900 p-10 rounded-lg w-full sm:w-96 text-sm shadow-lg text-indigo-300">

        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === "sign up" ? "create Acccount" : "Login"}
        </h2>

        <p className="text-sm text-center mb-6">
          {state === "sign up"
            ? "create Your Acccount"
            : "Login to your Account"}
        </p>

        <form onSubmit={submitHandler}>
          {state === "sign up" && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.person_icon} alt="" />
              <input
                className="outline-none bg-transparent text-white"
                value={name}
                type="text"
                placeholder="Fullname"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="" />
            <input
              className="outline-none bg-transparent text-white"
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="" />
            <input
              className="outline-none bg-transparent text-white"
              type="password"
              placeholder="Password"
             value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {state !== "sign up" && (
            <p className="mb-4 text-indigo-500 cursor-pointer"
            onClick={() => navigate('/resetpassword')}
            >
              Forgot Password?
            </p>
          )}

          <button className="w-full py-2.5 rounded-full bg-linear-to-br from-indigo-500 to-indigo-900 text-white font-medium cursor-pointer hover:brightness-110  transition-all duration-300">
            {state === "sign up" ? "Create Account" : "Login"}
          </button>
        </form>

        {state === "sign up" ? (
          <p className="text-gray-400 text-xs text-center mt-4">
            Already have an account?{" "}
            <span
              className="text-blue-400 cursor-pointer underline"
              onClick={() => setstate("login")}
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-gray-400 text-xs text-center mt-4">
            Don't have an account?{" "}
            <span
              onClick={() => setstate("sign up")}
              className="text-blue-400 cursor-pointer underline"
            >
              Sign up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
