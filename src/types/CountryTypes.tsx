export type Currency = {
  name: string;
  symbol: string;
};

export type Country = {
  name: { official: string; common: string };
  flags: { svg: string; alt: string };
  capital: string[];
  region: string;
  population: string;
  languages?: Record<string, Currency>;
  currencies?: Record<string, Currency>;
  borders?: string[];
};

export type Props = {
  countries: Country[];
  country: Country;
};

export type FavouriteIconProps = {
  isFavourite: boolean;
  onClick: () => void;
};
