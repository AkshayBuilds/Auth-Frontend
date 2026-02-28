import React from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { appContext } from '../context/appContext'
import axios from 'axios'
import { toast } from 'react-toastify'



const RestePassword = () => {

    const navigate = useNavigate()
    const [email, setemail] = useState('')
    const [newPassword, setnewPassword] = useState('')
    const [isemailsent, setisemailsent] = useState('')
    const [otp, setotp] = useState(0)
    const [isotpsubmitted, setisotpsubmitted] = useState(false)



    const inputRefs = React.useRef([])
    axios.defaults.withCredentials = true
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
    

    const onSubmitEmail = async(e) =>{
        e.preventDefault();
        try {
            const {data} = await axios.post(backend_URL+'/auth/send-reset-otp', {email})
            data.success ? toast.success(data.message) : toast.error(data.message)
            data.success && setisemailsent(true)

        } catch (error) {
            toast.error(error.message)
        }
    }

    const onSubmitHandler = async(e) => {
        e.preventDefault();
        const otpArray = inputRefs.current.map((e) => e.value)
        setotp(otpArray.join(''))
        setisotpsubmitted(true)
    }

    const submitNewPassword = async(e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post(backend_URL+'/auth/reset-password',{
                email,
                otp,
                newpass: newPassword
            })

            data.success ? toast.success(data.message) : toast.error(data.message)

            data.success && navigate('/login')

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

      {!isemailsent && (<form className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm' onSubmit={onSubmitEmail}>
        <h1 className='text-white text-2xl text-center font-semibold mb-4'>Password Rest </h1>
        <p className='text-center mb-4 text-indigo-300'>Enter a 6-Digit code sent to your E-mail id. </p>
        <div className='flex gap-3 mb-4 items-center w-full px-5 py-2.5 rounded-full bg-[#333A5C] text-white'>
            <img src={assets.mail_icon} alt="" className='w-3 h-3'/>
            <input type="text" className='w-full bg-transparent outline-none' placeholder='E-mail'
            onChange={(e) => setemail(e.target.value)}
            value={email}
            required
            />
        </div>
        <button className="w-full py-2.5 rounded-full bg-linear-to-br from-indigo-500 to-indigo-900 text-white font-medium cursor-pointer hover:brightness-110  transition-all duration-300">Submit</button>
      </form>)}
    
        {!isotpsubmitted && isemailsent && (<form className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm' onSubmit={onSubmitHandler}>
        <h1 className='text-white text-2xl text-center font-semibold mb-4'>Reset Password OTP</h1>
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
      </form>)}

      {isemailsent && isotpsubmitted && (<form onSubmit={submitNewPassword} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm' >
              <h1 className='text-white text-2xl text-center font-semibold mb-4'>New Password</h1>
              <p className='text-center mb-4 text-indigo-300'>Enter new Password Below </p>
              <div className='flex gap-3 mb-4 items-center w-full px-5 py-2.5 rounded-full bg-[#333A5C] text-white'>
                    <input type="text" className='w-full bg-transparent outline-none' placeholder='new password'
                    onChange={(e) => setnewPassword(e.target.value)}
                    value={newPassword}
                    required
                    />
                </div>
              <button className="w-full py-2.5 rounded-full bg-linear-to-br from-indigo-500 to-indigo-900 text-white font-medium cursor-pointer hover:brightness-110  transition-all duration-300">Reset password</button>
     </form>)}
     
    </div>      
  )
}

export default RestePassword