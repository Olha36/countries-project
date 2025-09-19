'use client';
import FavouriteIcon from '@/components/FavouriteIcon';
import Header from '@/components/Header';
import { fetchCountries } from '@/lib/api';
import type { Country } from '@/types/CountryTypes';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useFavourites } from '@/hooks/useFavourites';

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('All');
  const { favourites, toggleFavourite } = useFavourites();

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
          <div className="country-list">
            {filteredCountries.map((country) => (
              <div key={country.name.official} className="country-card">
                <Link href={`/countries/${encodeURIComponent(country.name.official)}`}>
                  <div className="country-info__card">
                    <div className="country-info">
                      <Image
                        width={130}
                        height={200}
                        src={country.flags.svg}
                        alt={country.flags.alt}
                        className="country-info__flag"
                      />
                      <div className="country-info__details">
                        <h3 className="country-info__name">{country.name.official}</h3>
                        <p className="country-info__region">{country.region}</p>
                      </div>
                    </div>
                  </div>
                </Link>
                <FavouriteIcon
                  isFavourite={favourites.includes(country.name.official)}
                  onClick={() => toggleFavourite(country.name.official)}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
