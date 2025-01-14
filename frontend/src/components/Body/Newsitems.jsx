import React, { useState } from "react";
import {BsBookmark,BsFillBookmarkFill} from "react-icons/bs";
const Newsitems = ({urlToImage, title, source, description, url, author, date}) => {
  const [bookmarkActive, setBookmarkActive] = useState(false);
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-2xl relative">
      <img src={!urlToImage? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjCAfVgATBaPFFWX2WWJF6x-gVW4P1mdvfKA&usqp=CAU' : urlToImage} alt={title} className="w-full h-56" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-black">{title}</div>
        <p className="text-gray-700 text-base line-clamp-3 text-justify">{!description? title : description}</p>
      </div>
      <div className="px-6 pt-4 pb-2 text-center">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          {source.name}
        </span>
        <p className='card-date'>by {!author?'Unknown':author} on {date}</p>
        <a href={url} className="">Read More</a>
      </div>
      <button onClick={()=>setBookmarkActive(!bookmarkActive)} className='absolute right-5 bottom-2 text-black bg-inherit'>{!bookmarkActive?<BsBookmark/>:<BsFillBookmarkFill/>}</button>
    </div>
  );
};

export default Newsitems;
