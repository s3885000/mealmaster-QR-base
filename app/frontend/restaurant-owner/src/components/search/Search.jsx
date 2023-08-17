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
    <div className="relative bg-tertiary h-12 w-80 rounded-xl mx-auto flex items-center">
      <div className="pl-3 pt-2">
        <Buttons context="filter" onClick={() => { console.log("Filter clicked!") }} />
      </div>
      <input 
        className="flex-grow h-full rounded-xl pl-10 pr-10 text-sm bg-inherit focus:outline-none"
        type="text" 
        value={search} 
        onChange={handleChange} 
      />
      <div className="pr-3 pt-2">
        <Buttons context="search" onClick={handleSearch}>
        </Buttons>
      </div>
    </div>
  );
};

export default Search;
