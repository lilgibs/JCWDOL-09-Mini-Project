import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../features/cart/cartSlice';
import { useEffect } from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  MenuDivider,
} from '@chakra-ui/react';

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  const userGlobal = useSelector((state) => state.user.user);
  const cartsGlobal = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleClick = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  return (
    <nav className="w-full h-16 bg-white border-b shadow-md">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        <Link to="/" className="font-bold text-xl text-teal-600">
          Team 10
        </Link>

        <div className="hidden md:flex items-center w-full md:w-1/2">
          <input
            type="text"
            className="border rounded-md w-full px-3 py-2 text-gray-700"
            placeholder="Mau cari apa nih?"
          />
        </div>

        {!userGlobal.id ? (
          <div className="hidden md:flex gap-4">
            <Link to="/login">
              <button className="px-3 py-2 font-semibold text-gray-600 hover:text-gray-900 transition duration-200">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-teal-400 font-semibold text-white px-3 py-2 rounded-md hover:bg-teal-500 transition duration-200">
                Register
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/cart" className="text-gray-600 hover:text-gray-900 transition duration-200">
              <FontAwesomeIcon icon={faShoppingCart} className="text-lg" />
              <span className="ml-2">{cartsGlobal.length}</span>
            </Link>
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              className="w-8 h-8 object-cover border border-gray-300 rounded-full cursor-pointer"
            />
            <Menu>
              <MenuButton as={Button} variant="link" px={0} py={0}>
                <p className="text-gray-600 text-lg font-normal hover:text-gray-900 transition duration-200">
                  {userGlobal.name}
                </p>
              </MenuButton>
              <MenuList>
                <Link to="/dashboard">
                  <MenuItem>Dashboard</MenuItem>
                </Link>
                <Link to="/transaction">
                  <MenuItem>Transaction</MenuItem>
                </Link>
                <MenuDivider />
                <MenuItem onClick={() => {/* Add your logout function here */ }}>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        )}

        <div className="md:hidden cursor-pointer" onClick={handleClick}>
          <FontAwesomeIcon icon={faBars} className="text-teal-400 text-2xl" />
        </div>
      </div>

      {toggle && (
        <div className="flex flex-col w-11/12 mx-auto mt-2">
          <div className="md:hidden">
            <input
              type="text"
              className="rounded-md border w-full px-3 py-1 text-gray-700"
              placeholder="Mau cari apa nih?"
            />
          </div>
          <div className="md:hidden flex gap-4 mt-2 justify-center">
            <button className="px-3 py-1 text-gray-600 hover:text-gray-900 transition duration-200">
              Login
            </button>
            <Link to="/register">
              <button className="bg-teal-400 text-white px-3 py-1 rounded-md hover:bg-teal-500 transition duration-200">
                Register
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

