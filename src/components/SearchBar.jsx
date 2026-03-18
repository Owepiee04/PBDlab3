import { useState } from 'react';
import './SearchBar.css';

export default function SearchBar({ onSearch, loading }) {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = city.trim();
    if (trimmed) onSearch(trimmed);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <input
        type="text"
        className="search-input"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        disabled={loading}
        aria-label="City name"
        autoComplete="off"
      />
      <button
        type="submit"
        className="search-btn"
        disabled={loading || !city.trim()}
        aria-label="Search weather"
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}
