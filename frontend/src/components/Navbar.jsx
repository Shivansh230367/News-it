import React, { useEffect } from "react";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };
  return (
    <div>
      <nav className="bg-slate-200 h-[7rem] flex justify-between pt-4 pb-4 pl-8 pr-8 items-center">
        <ul className="flex space-x-6 items-center">
          <li>
            <Link
              to="/"
              className={`text-black hover:text-gray-700 font-normal text-xl font-serif ${
                "active" ? "text-black" : "text-gray-700 "
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/business"
              className={`text-black hover:text-gray-700 font-normal text-xl font-serif ${
                "active" ? "text-black" : "text-gray-700"
              }`}
            >
              Business
            </Link>
          </li>
          <li>
            <Link
              to="/entertainment"
              className={`text-black hover:text-gray-700 font-normal text-xl font-serif ${
                "active" ? "text-black" : "text-gray-700"
              }`}
            >
              Entertainment
            </Link>
          </li>
          <li>
            <Link
              to="/health"
              className={`text-black hover:text-gray-700 font-normal text-xl font-serif ${
                "active" ? "text-black" : "text-gray-700"
              }`}
            >
              Health
            </Link>
          </li>
          <li>
            <Link
              to="/science"
              className={`text-black hover:text-gray-700 font-normal text-xl font-serif ${
                "active" ? "text-black" : "text-gray-700"
              }`}
            >
              Science
            </Link>
          </li>
          <li>
            <Link
              to="/sports"
              className={`text-black hover:text-gray-700 font-normal text-xl font-serif ${
                "active" ? "text-black" : "text-gray-700"
              }`}
            >
              Sports
            </Link>
          </li>
          <li>
            <Link
              to="/technology"
              className={`text-black hover:text-gray-700 font-normal text-xl font-serif ${
                "active" ? "text-black" : "text-gray-700"
              }`}
            >
              Technology
            </Link>
          </li>
          {!user ? (
            <button onClick={navigate('/login')} className="bg-inherit cursor:pointer hover:border-black">
              <LuLogIn />
            </button>
          ) : (
            <button onClick={handleLogout} className="bg-inherit cursor:pointer hover:border-black">
              <LuLogOut />
            </button>
          )}
        </ul>

        <div className="flex space-x-6">
          <Link to="/" className="text-black flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-book-open self-center"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
            <h1 className="font-normal text-7xl">
              News<span className="text-5xl font-light">App.</span>
            </h1>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
