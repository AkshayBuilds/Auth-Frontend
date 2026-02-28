import React from 'react'
import assets from '../assets/assets'
import { useContext, useEffect } from 'react'
import { appContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const VerifyEmail = () => {

    const inputRefs = React.useRef([])
    const navigate = useNavigate()

    const { backend_URL, userData, isLoggedIn, getUserData } = useContext(appContext)
    const handleInput = (e,index) => {
        if(e.target.value.length > 0 && index < inputRefs.current.length -1){
            inputRefs.current[index + 1].focus();
        }
    }

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && index > 0 && !e.target.value) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) =>{
        const paste = e.clipboardData.getData('text')
        const pasteArray = paste.split('');

        pasteArray.forEach((char, index) => {
            if(inputRefs.current[index]){
                inputRefs.current[index].value = char
            }
        })
    }

    useEffect(() => {
        isLoggedIn && userData && userData.isVerified && navigate('/')
    },[isLoggedIn, userData])

    const onSubmitHandler = async(e) => {
        try {
            e.preventDefault()

            const otpArray = inputRefs.current.map(e => e.value)
            const otp = otpArray.join('')

            const { data } =await axios.post(backend_URL+"/auth/verify-otp", {
                otp,
                userId: userData._id
            })

            if(data.success){
                toast.success(data.message);
                getUserData()
                navigate('/')
            }else{
                toast.error(data.message)
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

      <form className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm' onSubmit={onSubmitHandler}>
        <h1 className='text-white text-2xl text-center font-semibold mb-4'>E-mail verify OTP</h1>
        <p className='text-center mb-4 text-indigo-300'>Enter a 6-Digit code sent to your E-mail id. </p>
        <div className='flex justify-between mb-8' onPaste={handlePaste}>
            {Array(6).fill(0).map((_,index) => (
                <input type="text" maxLength={1} key={index} required
                className='w-12 h-12 bg-[#333A5C] outline-none text-white text-center text-xl rounded-md'
                ref={ e => inputRefs.current[index] = e}
                onInput={e => handleInput(e, index)}
                onKeyDown={e => handleKeyDown(e,index)}
                />
            ))}
        </div>
        <button className="w-full py-2.5 rounded-full bg-linear-to-br from-indigo-500 to-indigo-900 text-white font-medium cursor-pointer hover:brightness-110  transition-all duration-300">Verify Email</button>
      </form>
    </div>
  )
}

export default VerifyEmail