'use client';
import Header from '@/components/Header';
import { fetchCountries } from '@/lib/api';
import type { Country } from '@/types/CountryTypes';
import { useEffect, useState } from 'react';
import CountriesList from '@/components/CountryPage';
import Selection from '@/components/Selection';

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
        <Selection search={search} setSearch={setSearch} region={region} setRegion={setRegion} />
        <div className="countries-container">
          <CountriesList countries={filteredCountries} itemsPerPage={10} />
        </div>
      </main>
    </>
  );
}
