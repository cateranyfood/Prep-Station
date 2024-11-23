'use client';

import { useState } from 'react';

interface SearchComponentProps {
  restaurants: Array<{ id: number; name: string; image: string; address: string }>;
  onSearchResults: (filtered: Array<{ id: number; name: string; image: string; address: string }>) => void;
}

export default function SearchComponent({ restaurants, onSearchResults }: SearchComponentProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Filter restaurants and pass the results to the parent
    const filtered = restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(term.toLowerCase())
    );
    onSearchResults(filtered);
  };

  return (
    <input
      type="text"
      placeholder="Search restaurants..."
      value={searchTerm}
      onChange={handleSearch}
      className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring focus:ring-purple-500"
    />
  );
}