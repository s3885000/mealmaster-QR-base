import React, { useState } from 'react';
import { Buttons } from '../../components';

const Search = () => {
  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    console.log(`Searching for ${search}`);
  }

  return (
    <div className="relative bg-tertiary h-10 md:h-12 w-full md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-80 rounded-xl mx-auto flex items-center">
      <div className="pl-2 md:pl-3 pt-1 md:pt-2">
        <Buttons context="filter" onClick={() => { console.log("Filter clicked!") }} />
      </div>
      <input 
        className="flex-grow h-full rounded-xl pl-3 md:pl-5 pr-3 md:pr-5 text-xs md:text-sm bg-inherit focus:outline-none"
        type="text" 
        value={search} 
        onChange={handleChange} 
        placeholder="Search"
      />
      <div className="pr-2 md:pr-3 pt-1 md:pt-2">
        <Buttons context="search" onClick={handleSearch}>
        </Buttons>
      </div>
    </div>
  );
};

export default Search;
