import React, { useState } from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const [isActive, setisActive] = useState(false);
  const toggleSidebar = () => {
    if (!isActive) setisActive(true);
    else setisActive(false);
  };
  return (
    <div className="flex ml-0">
      <div
        className={`bg-slate-200 text-black h-full w-[200px] ${
          isActive ? "active" : "hidden"
        }`}
      >
        <ul className="pt-5 text-left pl-5 space-y-4">
          <li>
            <a
              href="#"
              className="text-black hover:text-black font-normal font-serif cursor-default"
            >
              <label htmlFor="cars" className="mr-3">
                Country
              </label>
              <select
                name="countries"
                id="countries"
                className="bg-white text-[13px] w-4 cursor-pointer"
              >
                <option value="india">IND</option>
                <option value="usa">USA</option>
                <option value="japan">JP</option>
                <option value="australia">AUS</option>
              </select>
            </a>
          </li>
          <li>
            <Link
              to="/bookmarks"
              className="text-black hover:text-gray-700 font-normal font-serif"
            >
              Bookmarks
            </Link>
          </li>
          <li>
            <Link
              to="/notes"
              className="text-black hover:text-gray-700 font-normal font-serif"
            >
              Notes
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="text-black hover:text-gray-700 font-normal font-serif"
            >
              Profile
            </Link>
          </li>
        </ul>
      </div>

      <button
        onClick={toggleSidebar}
        className={`h-15 w-15 self-start mt-40 bg-slate-50 flex items-center rounded-none hover:border-slate-50 ${
          isActive ? "mr-[200px]" : "active absolute left-0"
        }`}
      >
        {!isActive ? (
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
            className="feather feather-arrow-right-circle text-black"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 16 16 12 12 8"></polyline>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
        ) : (
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
            className="feather feather-arrow-left-circle text-black"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 8 8 12 12 16"></polyline>
            <line x1="16" y1="12" x2="8" y2="12"></line>
          </svg>
        )}
      </button>
    </div>
  );
};

export default Sidebar;
