import { useState, useEffect } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearchSubmit, clearResults }) => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!searchQuery == '') {
      onSearchSubmit(searchQuery);
    } else {
      clearResults();
    }
  }, [searchQuery]);

  return (
    <input
      className='nav-search-input'
      id='nav-search-input'
      onChange={e => setSearchQuery(e.target.value)}
      placeholder='Search for a user...'
      type='search'
      value={searchQuery}
    />
  );
};

export default SearchBar;
