import Header from '@/components/Header';
import { fetchCountries } from '@/lib/api';
import Image from 'next/image';

export default async function RandomCountry() {
  const countries = await fetchCountries();
  const randomIndex = Math.floor(Math.random() * countries.length);
  const country = countries[randomIndex];

  return (
    <div>
      <Header />
      <div className="random-container">
        <h2>{country.name.official}</h2>
        <Image src={country.flags.svg} alt={country.flags.alt} width={130} height={200} />
        <p>Region: {country.region}</p>
        <p>Capital: {country.capital?.[0] ?? 'Capital not found'}</p>
      </div>
    </div>
  );
}
