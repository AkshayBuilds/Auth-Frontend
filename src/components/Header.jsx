import React from 'react'
import assets from '../assets/assets'
import { useContext } from 'react'
import { appContext } from '../context/appContext'

const Header = () => {

    const {userData, isLoggedIn} = useContext(appContext)


  return (
    <div className='flex flex-col items-center mt-20 px-4 text-center text-gray-800'>
        <img src={assets.header_img} className='w-36 h-36 rounded-full mb-6' alt="" />

        <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>Hey, {''}{userData ? userData.name : 'Developer'}!
            <img src={assets.hand_wave} alt="" className='w-8 aspect-square' /> </h1>

        <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>Welcome To our app</h2>

        <p className='mb-8 max-w-md'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, ipsam itaque corrupti delectus aperiam neque. </p>

        <button className='outline-none flex items-center gap-2 text-gray-800 border-2 border-gray-500 rounded-full px-6 py-2 hover:bg-gray-300 transition-all duration-300 cursor-pointer'>Get Started</button>
    </div>
  )
}

export default Header