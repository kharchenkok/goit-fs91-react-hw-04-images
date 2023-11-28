import React, { Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import styles from './Searchbar.module.css';
export default class Searchbar extends Component {
  state = {
    query: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
    // this.setState({ query: '' });
  };

  handleChange = e => {
    this.setState({ query: e.target.value.trim() });
  };
  render() {
    const { query } = this.state;
    return (
      <header className={styles.Searchbar} onSubmit={this.handleSubmit}>
        <form className={styles.SearchForm}>
          <input
            className={styles.SearchFormInput}
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={this.handleChange}
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
  }
}
