import React from 'react';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({style}) => {
  return (
    <div className={`${style} relative rounded-full h-8 bg-white bg-opacity-50 border border-[#B4C1DB ] hover:bg-opacity-25 mx-1 md:mr-3 w-[85%] sm:w-64`}>
      <div className="p-2 h-full absolute pointer-events-none flex items-center justify-center">
        <SearchIcon />
        </div>
      <InputBase
        className="pb-0 pr-1 pl-10 w-full"
        placeholder="Search by Event"
        />
    </div>
  );
};

export default SearchBar;