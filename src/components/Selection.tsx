'use client';

type SelectionProps = {
  search: string;
  setSearch: (value: string) => void;
  region: string;
  setRegion: (value: string) => void;
};

export default function Selection({ search, setSearch, region, setRegion }: SelectionProps) {
  return (
    <>
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
    </>
  );
}
