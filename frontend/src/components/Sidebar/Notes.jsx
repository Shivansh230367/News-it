import React from "react";
import Backbutton from "../../assets/icons/Backbutton";
import { Link } from "react-router-dom";
import Body from "./Notes/Body";
const Notes = () => {
  return (
    <div className="bg-slate-50 min-h-screen h-fit">
      <ul className="flex justify-between bg-slate-200 pt-4 pb-4 pl-8 pr-8 items-center">
        <li>
          <Backbutton />
        </li>
        <li>
          <h1 className="text-black">Notes</h1>
        </li>
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
            <h1 className="font-normal">
              News<span className="text-2xl font-light">App.</span>
            </h1>
          </Link>
        </div>
      </ul>
      <div>
        <Body/>
      </div>
    </div>
  );
};

export default Notes;
