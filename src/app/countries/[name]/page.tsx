import Header from '@/components/Header';
import Image from 'next/image';
import type { Country, Currency } from '@/types/CountryTypes';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const res = await fetch('https://restcountries.com/v3.1/all?fields=name');

  const countries: Country[] = await res.json();

  if (!Array.isArray(countries)) {
    throw new Error('Expected an array of countries');
  }

  return countries.map((country) => ({
    name: encodeURIComponent(country.name.common),
  }));
}

export default async function CountryPage({ 
  params 
}: { params: Promise<{ name: string }>
 }) {

  const {name} = await params
  const decodedName = decodeURIComponent(name);

  const fields = [
    'name',
    'flags',
    'region',
    'capital',
    'population',
    'languages',
    'currencies',
    'borders',
  ].join(',');

  const res = await fetch(
    `https://restcountries.com/v3.1/name/${encodeURIComponent(
      decodedName
    )}?fullText=true&fields=${fields}`
  );

  if (!res.ok) {
    notFound();
  }

  const data: Country[] = await res.json();

  if (!Array.isArray(data) || data.length === 0) {
    notFound();
  }

  const country = data[0];

  return (
    <>
      <Header />
      <div className="card-container">
        <h2>{country.name.official}</h2>

        <Image
          src={country.flags.svg}
          alt={country.flags.alt || `Flag of ${country.name.common}`}
          width={130}
          height={200}
          unoptimized
        />

        <h3>Capital of {country.region} is:</h3>
        <p>{country.capital?.[0] || 'No capital available'}</p>

        <h3>Region:</h3>
        <p>{country.region}</p>

        <h3>Population:</h3>
        <p>
          {' '}
          {country.population.toLocaleString()
            ? country.population.toLocaleString()
            : 'No population data'}
        </p>

        <h3>Languages:</h3>
        <p>
          {country.languages
            ? Object.values(country.languages).join(', ')
            : 'No languages available'}
        </p>

        <h3>Currencies:</h3>
        <p>
          {country.currencies
            ? Object.values(country.currencies)
                .map(
                  (currency) => `${(currency as Currency).name} (${(currency as Currency).symbol})`
                )
                .join(', ')
            : 'No currencies available'}
        </p>
      </div>
    </>
  );
}
