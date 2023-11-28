import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import styles from './Searchbar.module.css';
const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(query);
  };

  const handleChange = event => {
    setQuery(event.target.value.trim());
  };

  return (
    <header className={styles.Searchbar} onSubmit={handleSubmit}>
      <form className={styles.SearchForm}>
        <input
          className={styles.SearchFormInput}
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
        <button
          type="submit"
          disabled={!query}
          className={styles.SearchFormButton}
        >
          <BsSearch />
          <span className={styles.SearchFormButtonLabel}>Search</span>
        </button>
      </form>
    </header>
  );
};

export default Searchbar;
