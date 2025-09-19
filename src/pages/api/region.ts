import { fetchCountries } from '@/lib/api';
import type { Country } from '@/types/CountryTypes';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { region } = req.query;

  try {
    const countries = await fetchCountries();

    if (!region || region === 'All') {
      return res.status(200).json(countries);
    }

    const filtered = countries.filter((country: Country) => country.region === region);

    res.status(200).json(filtered);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching countries' });
    console.error(error);
  }
}
