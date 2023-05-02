import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../features/cart/cartSlice';
import { useEffect } from 'react';

const Navbar = () => {
  const [toggle, setToggle] = useState(false)

  const userGlobal = useSelector(state => state.user.user)
  const cartsGlobal = useSelector(state => state.cart.items)
  const dispatch = useDispatch()


  const handleClick = () => {
    setToggle(!toggle);

  }

  useEffect(() => {
    dispatch(fetchCart())
  }, [])


  return (
    <div className='w-full h-14 bg-white border-b shadow-md'>

      <div className='w-11/12 m-auto h-full flex justify-between items-center'>

        <div className=''>
          <Link to='/'>
            <p className='font-semibold'>Team 10</p>
          </Link>
        </div>

        <div className='hidden md:flex items-center w-full md:w-2/4'>
          <input
            type="text"
            className='border rounded-md w-full md:w-full px-3 py-2'
            placeholder='Mau cari apa nih?' />
        </div>
        {
          !userGlobal.id ?
            <div className='hidden md:flex gap-4'>
              <Link to='/login'>
                <button className='px-3 py-2 font-semibold'>Login</button>
              </Link>
              <Link to='/register'>
                <button className='bg-emerald-500 font-semibold text-white px-3 py-2 rounded-md hover:bg-emerald-600 transition duration-100'>Register</button>
              </Link>
            </div>
            :
            <>
              <div className='flex flex-row items-center gap-2'>
                <Link to='/cart'>
                  <p>Cart {cartsGlobal.length}</p>
                </Link>
                <img
                  src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                  className='w-8 object-cover border border-gray-500 rounded-full cursor-pointer' />
                <p>{userGlobal.name}</p>
              </div>
            </>
        }

        <div className='md:hidden cursor-pointer' onClick={handleClick}>
          <FontAwesomeIcon icon={faBars} className=' text-emerald-500 text-2xl ' />
        </div>
      </div>

      {toggle && (
        <div className="flex flex-col w-11/12 m-auto mt-2 ">
          <div className="md:hidden">
            <input
              type="text"
              className="rounded-md border w-full px-3 py-1"
              placeholder="Mau cari apa nih?"
            />
          </div>
          <div className="md:hidden flex gap-4 mt-2 justify-center">
            <button className="px-3 py-1">Login</button>
            <Link to="/register">
              <button className="bg-emerald-500 text-white px-3 py-1 rounded-md">Register</button>
            </Link>
          </div>
        </div>
      )}

    </div>
  )
}

export default Navbar;
