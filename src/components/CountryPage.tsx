'use client';

import { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import type { Country } from '@/types/CountryTypes';
import Link from 'next/link';
import Image from 'next/image';
import FavouriteIcon from '@/components/FavouriteIcon';
import { useFavourites } from '@/hooks/useFavourites';

type CountriesListProps = {
  countries: Country[];
  itemsPerPage?: number;
};

export default function CountriesList({ countries, itemsPerPage = 10 }: CountriesListProps) {
  const [page, setPage] = useState(1);
  const [paginatedCountries, setPaginatedCountries] = useState<Country[]>([]);
  const { favourites, toggleFavourite } = useFavourites();

  useEffect(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setPaginatedCountries(countries.slice(start, end));
  }, [page, countries, itemsPerPage]);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <div>
      <div className="country-list">
        {paginatedCountries.map((country) => (
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

      <Pagination
        count={Math.ceil(countries.length / itemsPerPage)}
        color="primary"
        page={page}
        onChange={handleChange}
        sx={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'center',
          '& .MuiPaginationItem-root': {
            fontSize: '45px',
          },
          '& .MuiPaginationItem-root.Mui-selected': {
            padding: '30px',
            borderRadius: '40%',
          },
        }}
      />
    </div>
  );
}
