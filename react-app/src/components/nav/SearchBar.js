import { useState, useEffect } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearchSubmit, clearResults }) => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!searchQuery == '') {
      onSearchSubmit(searchQuery);
    } else {
        clearResults()
    }
  }, [searchQuery]);

  return (
    <div className='search-bar-container'>
      <input
        className='nav-search-input'
        onChange={e => setSearchQuery(e.target.value)}
        placeholder='Search for a user...'
        type='search'
        value={searchQuery}
      />
    </div>
  );
};

export default SearchBar;
