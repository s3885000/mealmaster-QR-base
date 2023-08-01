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
    <div className="relative bg-tertiary h-12 w-80 rounded-xl mx-auto">
      <input 
        className="h-full w-full rounded-xl pl-4 pr-10 text-sm bg-inherit focus:outline-none"
        type="text" 
        placeholder="Explore new restaurants" 
        value={search} 
        onChange={handleChange} 
      />
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
        <Buttons context="search" onClick={handleSearch}>
        </Buttons>
      </div>
    </div>
  );
};

export default Search;
