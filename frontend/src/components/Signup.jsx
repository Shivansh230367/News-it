import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import Toast from "./Toasts/Toast";
import { useSetRecoilState } from "recoil";
import {tokenAtom} from "../store/atom/token";
import axios from "axios";
const Signup = () => {
  const setToken = useSetRecoilState(tokenAtom);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [interest, setInterest] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [toast, setToast] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
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
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  }
  const myStyle = {
    backgroundImage: 'url("/login-bg.jpg")',
    backgroundSize: "cover",
  };


  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!firstname || !lastname || !email || !password || !confirmPassword || !age){
        setToast("toast-danger");
        setToastMessage("Please fill all the Fields");
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 3000);
        return;
    }
    if(password!==confirmPassword){
        console.log(password, " ", confirmPassword);
        setToast("toast-danger");
        setToastMessage("Passwords Do Not Match");
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 3000);
        return;
    }
    try{
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post(
            "http://localhost:8000/api/v1/user/signup",
            {
              firstname,
              lastname,
              email,
              password,
              age: Number(age),
              country,
              interest
            },
            config
        );
        localStorage.setItem("userInfo", JSON.stringify(data.user));
        setToken(data.token);
        navigate('/');
        setToast("toast-success");
        setToastMessage("Signing up successfull, Welcome!");
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 3000);
    }catch(err){
        setToast("toast-danger");
        setToastMessage("Error Occured");
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 3000);
        return;
    }
  }

  return (
    <div className=" bg-white h-full w-screen py-12" style={myStyle}>
      <div className="mx-auto h-fit w-[30rem] bg-white bg-opacity-80 py-8 px-8 relative">
        <h1 className="text-black font-bold text-center mb-6">Sign up</h1>
        <form
          onSubmit={handleSubmit}
          className="text-black flex flex-col items-start space-y-5 mb-12"
        >
          <div className="self-stretch">
            <label htmlFor="" className="self-start text-xl">
              Firstname:
            </label>
            <input
              type="text"
              className="bg-slate-50 w-full h-9"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>

          <div className="self-stretch">
            <label htmlFor="" className="self-start text-xl">
              Lastname:
            </label>
            <input
              type="text"
              className="bg-slate-50 w-full h-9"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>

          <div className="self-stretch">
            <label htmlFor="" className="self-start text-xl">
              Email:
            </label>
            <input
              type="text"
              className="bg-slate-50 w-full h-9"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative self-stretch">
            <label htmlFor="" className="self-start text-xl">
              Password:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="bg-slate-50 w-full h-9"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute inset-y-11 right-0 pr-3 text-xl flex items-center cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="relative self-stretch">
            <label htmlFor="" className="self-start text-xl">
              Confirm Password:
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="bg-slate-50 w-full h-9"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span
              className="absolute inset-y-11 right-0 pr-3 text-xl flex items-center cursor-pointer"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="self-stretch">
            <label className="self-start text-xl">
              Age:
            </label>
            <input
              type="text"
              className="bg-slate-50 w-full h-9"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="w-full flex justify-between">
            <div>
                <Dropdown options={countryOptions} handleFunction={setCountry}/>
            </div>
            <div>
                <Dropdown options={interestOptions} handleFunction={setInterest}/>
            </div>
          </div>

          <button type="submit" className=" text-white self-stretch bg-sky-950">
            Submit
          </button>
        </form>
        <div className="flex justify-between">
          <Link
            to="/login"
            className="text-sm hover:underline hover:underline-offset-2"
          >
            Already have an account
          </Link>
        </div>
        {showToast?<Toast setShowToast={setShowToast} message={toastMessage} toast={toast} />:<div/>}
      </div>
    </div>
  );
};

export default Signup;
