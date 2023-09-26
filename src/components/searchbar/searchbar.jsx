import React, { useState } from 'react';
import css from './searchBar.module.css';
import { throttle } from 'lodash';
import 'react-toastify/dist/ReactToastify.css';

import {FcGoogle} from 'react-icons/fc';
import { ToastContainer, toast } from 'react-toastify';

const SearchBar = ({handleQuery}) =>  {

  const [searchQuery, setSearchQuery] = useState('');
  
  const handleInput = (e) =>  {

    setSearchQuery(e.target.value);
   
  }
  const handleSubmit = throttle((e) =>  {
    e.preventDefault();
  
    if (searchQuery.trim() === '') {
  
      toast("Search query can't be empty!");

      return;
    }
    handleQuery(searchQuery.toLowerCase().trim());
     setSearchQuery('');
  },300);
    


    return (
      <header className={css.header}>
        <form className={css.searchForm} onSubmit={e => handleSubmit(e)}>
          <button type="submit" className={css.searchForm_button}>
          <FcGoogle size="35"/>
          </button>

          <input
            className={css.searchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchQuery}
            onChange={e => handleInput(e)}
          />
        </form>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          limit={2}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </header>
    );
  
}

export default SearchBar;
