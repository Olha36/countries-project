const BASE_URL =
  'https://restcountries.com/v3.1/all?fields=name,capital,flags,languages,population,region,borders,currencies';

export async function fetchCountries() {
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    throw new Error('Failed to fetch countries');
  }
  const data = await res.json();
  return data;
}
