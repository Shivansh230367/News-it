import React, { useState } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
const Dropdown = ({options, handleFunction}) => {
  const [isOpen, setIsOpen] = useState(false);
  const tag = options[0].name=="general"?"Interest":"Country";
  const [ops, setOps] = useState(tag);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const selectOption = (coun) => {
    handleFunction(coun.symbol);
    setOps(coun.name);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-[150px] rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          id={`menu-button-${tag}`}
          aria-expanded="true"
          aria-haspopup="true"
          onClick={toggleDropdown}
        >
          {ops}
          {!isOpen?
            <IoMdArrowDropdown className='-mr-1 ml-2 h-5 w-5'/> 
         :<IoMdArrowDropup className='-mr-1 ml-2 h-5 w-5' />}
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            {options.map((option, ind)=>(
              <button
                type='button'
                onClick={()=>{
                    selectOption(option)
                }}
                className="text-gray-700 text-left block px-4 py-2 text-sm w-full cursor-pointer hover:border-black"
                tabIndex="-1"
                role='menuitem'
                id={`menu-item-${ind}`}
                key={ind}
              >
                {option.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
