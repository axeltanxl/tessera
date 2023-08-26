import React from 'react';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  return (
    <div className="relative rounded-lg h-8 bg-white bg-opacity-50 hover:bg-opacity-25 mr-0 md:mr-3 w-64 md:w-64">
      <div className="p-2 h-full absolute pointer-events-none flex items-center justify-center">
        <SearchIcon />
        </div>
      <InputBase
        className="text-white pb-0 pr-1 pl-10 w-full"
        placeholder="Search by Event"
        />
    </div>
  );
};

export default SearchBar;