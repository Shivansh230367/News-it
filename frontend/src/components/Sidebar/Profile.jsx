import React, { useEffect, useState } from "react";
import Backbutton from "../../assets/icons/Backbutton";
import { FaPen } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "../Dropdown.jsx";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "../../store/atom/token";
import Toast from "../Toasts/Toast.jsx";
import axios from "axios";
const Profile = () => {
  const token= useRecoilValue(tokenAtom);
  const [toast, setToast] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  console.log(token);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [showFirstnameInputline, setShowFirstnameInputline] = useState(false);
  const [showLasttnameInputline, setShowLastnameInputline] = useState(false);
  const [modifiedFirstname, setModifiedFirstname] = useState("");
  const [modifiedLastname, setModifiedLastname] = useState("");
  const [modifiedCountry, setModifiedCountry] = useState("");
  const [modifiedInterest, setModifiedInterest] = useState("");
  const interestOptions = [
    { name: "general", symbol: "general" },
    { name: "business", symbol: "business" },
    { name: "entertainment", symbol: "entertainment" },
    { name: "health", symbol: "health" },
    { name: "science", symbol: "science" },
    { name: "sports", symbol: "sports" },
    { name: "technology", symbol: "technology" },
  ];
  const countryOptions = [
    { name: "India", symbol: "in" },
    { name: "Japan", symbol: "jp" },
    { name: "USA", symbol: "us" },
    { name: "Russia", symbol: "ru" },
    { name: "Australia", symbol: "au" },
  ];
  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const handleUpdate = async () => {
    if (
      modifiedCountry ||
      modifiedFirstname ||
      modifiedInterest ||
      modifiedLastname
    ) {
      try {
        const modifiedBody = {
          firstname: modifiedFirstname, lastname: modifiedLastname, country: modifiedCountry, interest: modifiedInterest
        };
        let body = {};
        Object.keys(modifiedBody).forEach(key => {
          if (modifiedBody[key] !== "") {
            body[key] = modifiedBody[key];
          }
        });
        console.log(body);
        const config = {
          headers: {
            'Content-Type': 'application/json', 
            "Authorization": `Bearer ${token}`,
          },
        };
        const { data } = await axios.put(
          "http://localhost:8000/api/v1/user/", body, config
        );
        console.log(data.user);
        localStorage.setItem("userInfo", JSON.stringify(data.user));
        setToast("toast-success");
        setToastMessage("Updated successfully!");
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 3000);
        navigate('/');
        return;
      } catch (err) {
        setToast("toast-danger");
        setToastMessage("Error Occured");
        console.log(err.message);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 3000);
        return;
      }
    }
    setToast("toast-danger");
    setToastMessage("No Changes to Update");
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
    return;
  };
  return (
    <div className="bg-slate-50 min-h-screen h-fit">
      <ul className="flex justify-between bg-slate-200 pt-4 pb-4 pl-8 pr-8 items-center">
        <li>
          <Backbutton />
        </li>
        <li className="">
          <h1 className="text-black">Profile</h1>
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
      <div className="relative text-black border border-black w-[1400px] max-h-[450px] h-[400px] min-h-fit px-10 mx-10 mt-10 py-16 rounded-md space-y-4">
        <div className="flex w-full justify-between">
          <div className="flex space-x-3 items-center">
            <div>
              <label htmlFor="fname">First name: </label>
              {!showFirstnameInputline ? (
                user.firstname
              ) : (
                <input
                  id="fname"
                  name="firstname"
                  type="text"
                  value={modifiedFirstname}
                  onChange={(e) => setModifiedFirstname(e.target.value)}
                />
              )}
            </div>
            <button
              onClick={() => setShowFirstnameInputline(!showFirstnameInputline)}
              className="cursor-pointer hover:border-white"
            >
              <FaPen />
            </button>
          </div>
          <div className="flex space-x-3 items-center">
            <div>
              <label htmlFor="lname">Last name: </label>
              {!showLasttnameInputline ? (
                user.lastname
              ) : (
                <input
                  id="lname"
                  name="lastname"
                  type="text"
                  value={modifiedLastname}
                  onChange={(e) => setModifiedLastname(e.target.value)}
                />
              )}
            </div>
            <button
              onClick={() => setShowLastnameInputline(!showLasttnameInputline)}
              className="cursor-pointer hover:border-white"
            >
              <FaPen />
            </button>
          </div>
        </div>
        <div className="flex space-x-3 items-center">Password: ********</div>
        <div className="flex space-x-3 items-center">
          <div>{`Country: ${
            !modifiedCountry ? user.country : modifiedCountry
          }`}</div>
          <div className="cursor-pointer hover:border-white">
            <Dropdown
              options={countryOptions}
              handleFunction={setModifiedCountry}
            />
          </div>
        </div>
        <div className="flex space-x-3 items-center">
          <div>{`Interest: ${
            !modifiedInterest ? user.interest : modifiedInterest
          }`}</div>
          <div className="cursor-pointer hover:border-white">
            <Dropdown
              options={interestOptions}
              handleFunction={setModifiedInterest}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="bg-red-900 text-white hover:text-gray-300 ml-[200px]"
        >
          Logout
        </button>
        <button
          type="button"
          onClick={handleUpdate}
          className=" bg-green-950 text-white hover:text-gray-300 ml-[600px]"
        >
          Update Details
        </button>
      </div>
      {showToast?<Toast setShowToast={setShowToast} message={toastMessage} toast={toast} />:<div/>}
    </div>
  );
};

export default Profile;
