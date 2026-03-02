import React from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { appContext } from '../context/appContext'
import { toast } from 'react-toastify'
import axios from 'axios'



const Navbar = () => {

    const [showMenu, setShowMenu] = useState(false);

    axios.defaults.withCredentials = true
    const navigate = useNavigate()
    const {backend_URL, userData, setUserData, setisLoggedIn} =useContext(appContext)

    const logout = async() => {
        try {
            axios.defaults.withCredentials = true
            const { data } = await axios.get(backend_URL+'/auth/logout')
            data.success && setisLoggedIn(false)
            data.success && setUserData(false)
            data.success && localStorage.removeItem("token")
            data.success && toast.success(data.message)
            navigate('/')
        } catch (error) {
            toast.error(error.message)
        }
    }

    const sendverificationOTP = async() => {
        try {
            const token = localStorage.getItem("token");
            const { data } =await axios.post(backend_URL+'/auth/send-verify-otp', {}, { headers: { Authorization: `Bearer ${token}` } })
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
    <div
  className='w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group cursor-pointer'
  onClick={() => setShowMenu(!showMenu)}
>
  {userData.name}

  <div
    className={`absolute top-0 right-0 z-10 text-black rounded pt-10 
    ${showMenu ? "block" : "hidden"} sm:group-hover:block`}
  >
    <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
      {!userData.isVerified && (
        <li
          className='py-1 px-2 hover:bg-gray-200 cursor-pointer'
          onClick={sendverificationOTP}
        >
          Verify E-mail
        </li>
      )}

      <li
        onClick={logout}
        className='py-1 px-2 pr-12 hover:bg-gray-200 cursor-pointer'
      >
        Logout
      </li>
    </ul>
  </div>
</div>
  )
}

export default Navbar
