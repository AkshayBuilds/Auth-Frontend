import React from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { appContext } from '../context/appContext'
import { toast } from 'react-toastify'
import axios from 'axios'



const Navbar = () => {

    axios.defaults.withCredentials = true
    const navigate = useNavigate()
    const {backend_URL, userData, setUserData, setisLoggedIn} =useContext(appContext)

    const logout = async() => {
        try {
            axios.defaults.withCredentials = true
            const { data } = await axios.get(backend_URL+'/auth/logout')
            
            data.success && setisLoggedIn(false)
            data.success && setUserData(false)
            navigate('/')
        } catch (error) {
            toast.error(error.message)
        }
    }

    const sendverificationOTP = async() => {
        try {
            const { data } =await axios.post(backend_URL+'/auth/send-verify-otp', { withCredentials:true })
            if(data.success){
                toast.success(data.message)
                navigate('/verifyemail')
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


    

  return (
    <div className='flex justify-between w-full items-center p-4 sm:p-6 sm:px-24 absolute top-0'>

        <img src={assets.logo} alt="" className='w-28 sm:w-32'/>

        {userData ? 
        <div className='w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group'> {userData.name[0].toUpperCase()} 
        <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
            <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
                {!userData.isVerified && <li className='py-1 px-2 hover:bg-gray-200 cursor-pointer' onClick={sendverificationOTP}>Verify E-mail</li> }
                <li onClick={logout} className='py-1 px-2 pr-12 hover:bg-gray-200 cursor-pointer'>Logout</li>
            </ul>
        </div>
        </div> 
        :  
        <button onClick={() => navigate('/login')} className='outline-none flex items-center gap-2 text-gray-800 border-2 border-gray-500 rounded-full px-6 py-2 hover:bg-gray-300 transition-all duration-300 cursor-pointer'>Login <img src={assets.arrow_icon} alt="" /></button>
    }

       
    </div>
  )
}

export default Navbar