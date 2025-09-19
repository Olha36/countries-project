'use client';
import FavouriteIcon from '@/components/FavouriteIcon';
import Header from '@/components/Header';
import { fetchCountries } from '@/lib/api';
import type { Props } from '@/types/CountryTypes';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useFavourites } from '../../hooks/useFavourites';

export default function Favourites() {
  const { favourites, toggleFavourite } = useFavourites();
  const [countries, setCountries] = useState<Props['countries']>([]);

  useEffect(() => {
    async function getCountries() {
      const data = await fetchCountries();
      setCountries(data);
    }
    getCountries();
  }, []);

  const favouriteCountries = countries.filter((country) =>
    favourites.includes(country.name.official)
  );

  return (
    <>
      <Header />
      <main>
        {favouriteCountries.length > 0 ? (
          <div className="country-list">
            {favouriteCountries.map((country) => (
              <div key={country.name.official} className="country-card">
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
                <FavouriteIcon
                  isFavourite={true}
                  onClick={() => toggleFavourite(country.name.official)}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="saved-text">Your saved countries will appear here.</p>
        )}
      </main>
    </>
  );
}
