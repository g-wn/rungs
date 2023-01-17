import { useState, useEffect } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearchSubmit, clearResults }) => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.getElementById('nav-search-input').focus()
  }, [])

  useEffect(() => {
    if (searchQuery !== '') {
      onSearchSubmit(searchQuery);
    } else {
      clearResults();
    }
  }, [searchQuery]); // eslint-disable-line

  return (
    <input
      autoComplete='off'
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
