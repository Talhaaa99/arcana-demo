import React from "react";
import { FaSearch } from "react-icons/fa";

const Searchbar = () => {
  return (
    <div className="flex w-[275px] h-[40px] rounded-xl self-center">
      <FaSearch className="z-10 absolute mt-3 ml-2 font-thin" />
      <input
        type="search"
        placeholder="search"
        className="w-full bg-[#18181A] border-none px-8 rounded-xl shadow-md focus:border-[#13A3FD]"
      ></input>
    </div>
  );
};

export default Searchbar;
