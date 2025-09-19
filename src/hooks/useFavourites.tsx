'use client';
import { useEffect, useState } from 'react';

export function useFavourites() {
  const [favourites, setFavourites] = useState<string[]>([]);

  useEffect(() => {
    const savedItems = localStorage.getItem('favourites');
    if (savedItems) {
      try {
        const parsedItems = JSON.parse(savedItems);
        setFavourites(parsedItems);
      } catch (error) {
        console.error('Could not parse favourites from localStorage', error);
        setFavourites([]);
      }
    } else {
      setFavourites([]);
    }
  }, []);

  const toggleFavourite = (countryName: string) => {
    setFavourites((prev) => {
      const updatedFavourites = prev.includes(countryName)
        ? prev.filter((fav) => fav !== countryName)
        : [...prev, countryName];

      localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
      return updatedFavourites;
    });
  };
  return { favourites, toggleFavourite };
}
