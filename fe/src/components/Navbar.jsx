import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    setToggle(!toggle);
  };

  return (
    <div className="w-full h-14 bg-white border-b">
      <div className="w-11/12 m-auto h-full flex justify-between items-center">
        <div className="">
          <Link to="/">
            <p className="font-semibold">Team 10</p>
          </Link>
        </div>

        <div className="hidden md:flex items-center w-full md:w-2/4">
          <input
            type="text"
            className="border rounded-md w-full md:w-full px-3 py-1"
            placeholder="Mau cari apa nih?"
          />
        </div>

        <div className="hidden md:flex gap-4">
          <button className="px-3 py-1">Login</button>
          <Link to="/register">
            <button className="bg-emerald-500 text-white px-3 py-1 rounded-md">
              Register
            </button>
          </Link>
        </div>

        <div className="md:hidden cursor-pointer" onClick={handleClick}>
          <FontAwesomeIcon
            icon={faBars}
            className=" text-emerald-500 text-2xl"
          />
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
              <button className="bg-emerald-500 text-white px-3 py-1 rounded-md">
                Register
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
