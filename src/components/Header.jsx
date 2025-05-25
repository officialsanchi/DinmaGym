import React from "react";
import { Link } from "react-router-dom";
// import logo from "../assets/logo.png";
import gym from "../assets/gym.png";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";

const Header = () => {
    const [showSideBar, setShowSideBar] = useState(false);

  return (
    
    <nav>
          <div className="md:hidden z-50 absolute top-5 right-5">
        {showSideBar ? (
          <FiX
            className="text-3xl cursor-pointer text-gray-500"
            onClick={() => setShowSideBar(false)}
          />
        ) : (
          <FiMenu
            className="text-3xl cursor-pointer text-gray-500"
            onClick={() => setShowSideBar(true)}
          />
        )}
      </div>
      <div className="flex justify-between items-center px-10 py-4">
      {/* <img src={logo} alt="logo" className="h-12 w-auto" /> */}
      <img src={gym} alt="gym" className="h-12 w-auto" />
      <div className=" hidden md:flex gap-6 text-lg font-medium ">
        <Link to="/" className="hover:bg-black hover:text-white transition">Home</Link>
        <Link to="/about" className= " hover:bg-black hover:text-white transition">About</Link>
        <Link to="/workout-programs" className="hover:bg-black hover:text-white transition">Workout Programs</Link>
        <Link to="/recipes" className="hover:bg-black hover:text-white transition">Recipes</Link>
        <Link to="/store" className="hover:bg-black hover:text-white transition">Store</Link>
        <Link to="/login" className="hover:bg-black hover:text-white transition">Login</Link>
        <Link to="/signup" className="hover:bg-black hover:text-white transition">Signup</Link>
      </div>

    </div>
    {showSideBar && (
      <div className="fixed top-0 left-0 w-2/3 h-full text-black bg-gray-300 p-5 flex flex-col space-y-6 shadow-lg md:hidden z-[60]">
        <div className="flex flex-col gap-6 px-10 py-4">
          <Link to="/"  onClick={() => setShowSideBar(false)} className="hover:text-white transition">Home</Link>
          <Link to="/about" onClick={() => setShowSideBar(false)} className="hover:text-white transition">About</Link>
          <Link to="/workout-programs" className="hover:text-white transition">Workout Programs</Link>
          <Link to="/recipes" className="hover:text-white transition">Recipes</Link>
          <Link to="/store" className="hover:text-white transition">Store</Link>
          <Link to="/login" className="hover:text-white transition">Login</Link>
          <Link to="/signup" className="hover:text-white transition">Signup</Link>
  
      </div>
      </div>
    )}
    </nav>
    
  );
};

export default Header;
