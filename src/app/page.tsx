'use client';
import Header from '@/components/Header';
import { fetchCountries } from '@/lib/api';
import type { Country } from '@/types/CountryTypes';
import { useEffect, useState } from 'react';
import CountriesList from '@/components/CountryPage';

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('All');

  useEffect(() => {
    fetchCountries().then(setCountries);
  }, []);

  const filteredCountries = countries.filter((country) => {
    const matchesName = country.name.official.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = region === 'All' || country.region === region;
    return matchesName && matchesRegion;
  });
  return (
    <>
      <Header />
      <main>
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
        <div className="countries-container">
          <CountriesList countries={filteredCountries} itemsPerPage={10} />
        </div>
      </main>
    </>
  );
}
