import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import logo from "../assets/logo.png";
import { categories } from "../utils/data";
import { AiOutlineLogout } from 'react-icons/ai'
import { fetchUser } from "../utils/fetchUser";
import Tooltip from '@mui/material/Tooltip'



const Sidebar = ({ user, closeToggle }) => {
  const navigate = useNavigate();
  const isNotActiveStyle =
    "flex items-center px-3 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
  const isActiveStyle =
    "flex items-center px-3 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize";
  
  const googleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };
  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="logo" className="w-full"></img>
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <RiHomeFill />
            Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">
            Discover categories
          </h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSidebar}
              key={category.name}
            >
              <img
                src={category.image}
                alt="category"
                className="w-8 h-8 rounded-full shadow-sm"
              />
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      <h3 className="mt-2 px-5 text-base 2xl:text-xl">
        <a href="https://pikeshpatel.com" target="_blank">
        Checkout My Portfolio...
        </a>
      </h3>
      
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
          onClick={handleCloseSidebar}
        >
          <img
            src={user.image}
            className="w-10 h-10 rounded-full"
            alt="user-profile"
          />
          <p>{user.userName}</p>
          <Tooltip title="Logout">

          <button
          className="bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
          type="button"
          onClick={() => googleLogout()}
          >
          <AiOutlineLogout color="red" fontSize={21} />
        </button>
          </Tooltip>
        </Link>
        
      )}
    
    </div>
  );
};

export default Sidebar;
