/**@jsx jsx */
import React, { useRef, useEffect, useState } from 'react';
import FetchingIcon from 'components/Resources/fetching-icon';
import { jsx, css } from '@emotion/core';

export default function SearchInput({ setSearchWord }){

  const [loading, setLoading] = useState(false);
  const [keyWord, setKeyWord] = useState('');

  const inputSearch = useRef(null);

  let time;
  const search = () => {
    time = setTimeout(() => {
      setSearchWord(keyWord);
      setLoading(false);
    }, 3000);
  };
  
  const handleSearch = e => {
    setLoading(true);
    clearTimeout(time);
    setKeyWord(e.target.value);
  };
  
  useEffect(() => {
    inputSearch.current.focus();
  }, [/* dependencia */]);
  useEffect(() => {
    if(keyWord !== ''){
      search();
    }
    if(keyWord === ''){
      setSearchWord('')
      setLoading(false);
    }
  }, [keyWord]);

  return (
    <div
        className="relative w-full"
        css={css`
          svg{
            position: absolute;
            right: .7rem;
            top: calc(50% - 5px);
          }
          svg.ring{
            position: absolute;
            right: .5rem;
            top: calc(50% - 10px);
          }
        `}
      >
        <input 
          ref={ inputSearch }
          type="text"
          placeholder="Busca por nombre de producto"
          className="pr-10 w-full rounded-full border border-bluegray-100 shadow-xl py-2 px-3 text-description focus:outline-none focus:shadow-outline placeholder-bluegray-200"
          onChange={ e => handleSearch(e) }
        />
        { loading ? (
          <>
            <svg viewBox="0 0 20 20" fill="currentColor" className="search w-3 h-3 text-p_blue-300"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
            <FetchingIcon strokeC="#98B3EB" width="20" height="20" classN="ring" strokeWidth="3"/>
          </>
        ) : null }
    </div>
  );
};