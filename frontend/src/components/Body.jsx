import React, { useEffect, useState } from "react";
import Sidebar from "./Body/Sidebar";
import Newsitems from "./Body/Newsitems";
import Spinner from "./Body/Spinner";
import Navbar from "./Navbar";
import {BiSolidPencil} from 'react-icons/bi';
import { Link } from "react-router-dom";
const Body = ({ category, pageSize }) => {
  const [user, setUser] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [length, setLength] = useState(6);
  const [loading, setLoading] = useState(false);
  const upDate = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=fc542050b05a4ceb84798d2e8a5c7fcb&page=${page}&pageSize=${pageSize}`;
    setLoading(true);
    let res = await fetch(url);
    let parsedData = await res.json();
    setLoading(false);
    setData(parsedData.articles);
    setTotalResults(parsedData.totalResults);
  };
  useEffect(() => {
    const parsedUser = JSON.parse(localStorage.getItem("userInfo"))
    setUser(parsedUser);
    upDate();
  }, []);
  const handlePrevious = async () =>{
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=66aaf94934c642bb8747dff47524acfe&page=${
      page - 1
    }&pageSize=${pageSize}`;
    setPage(page - 1);
    setLoading(true);
    let res = await fetch(url);
    let parsedData = await res.json();
    setLoading(false);
    setData(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLength(length-data.length);
  }

  const handleNext = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=66aaf94934c642bb8747dff47524acfe&page=${
      page + 1
    }&pageSize=${pageSize}`;
    setPage(page + 1);
    setLoading(true);
    let res = await fetch(url);
    let parsedData = await res.json();
    setLoading(false);
    setData(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLength(length+data.length);
  };

  return (
    <>
    <Navbar user={user}/>
    <div className="bg-slate-50 h-fit min-h-screen flex justify-evenly relative" id="scrollableDiv">
      {user?<Sidebar />:<div/>}
      {loading ? <Spinner/>: 
      <div className="mr-10 mb-10">
        <h1 className="text-6xl font-semibold my-3 text-center text-black">Latest News</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((news, index) => (
            <Newsitems key={index} {...news} />
          ))}
        </div>
        <div className="flex justify-between mt-5">
          <button onClick={()=>handlePrevious()} disabled={page===1?true:false} className={`${page===1?"bg-gray-500":"bg-black"} w-[7rem] text-white`}>Previous</button>
          <button onClick={()=>handleNext()} disabled={length >= totalResults? true: false} className={`${length >= totalResults?"bg-gray-500":"bg-black"} w-[7rem] text-white`}>Next</button>
        </div>
      </div>
      }
    {user?<Link className="fixed right-14 bottom-24 opacity-100 text-black hover:text-black" to="/notes">
      <button className=" text-black bg-white rounded-full padding-2 h-20 w-20 text-[1.5rem] border border-black hover:border-black"><BiSolidPencil/></button>
    </Link>:<div/>}
    </div>
    </>
  );
};

export default Body;
