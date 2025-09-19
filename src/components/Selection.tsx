'use client';

import { useState } from 'react';

export default function Selection() {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('All');

 
  return (
    <>
      <div className="search-controls">
        <input
          type="text"
          placeholder="enter the country"
          className="search-controls__input-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          name="country"
          id="country"
          className="search-controls__selection"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          <option value="All">All Regions</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
    </>
  );
}
