/**@jsx jsx */
import React, { useRef, useEffect, useState } from 'react';
import FetchingIcon from 'components/Resources/fetching-icon';
import { jsx, css, keyframes } from '@emotion/core';

const intermittent = keyframes`
  from 0 to {
    opacity: 1;
  }
  50%{
    opacity: .4;
  }
  100%{
    opacity: 1;
  }
`;

export default function SearchInput({ setSearchWord, setLoading, loading }){

  
  const [keyWord, setKeyWord] = useState('');

  const inputSearch = useRef(null);

  let time;
  const search = () => {
    time = setTimeout(() => {
      setSearchWord(keyWord);
    }, 3000);
  };
  
  const handleSearch = e => {
    setLoading(true);
    clearTimeout(time);
    setKeyWord(e.target.value);
    if(e.target.value === ''){
      setSearchWord('')
    }
  };
  
  useEffect(() => {
    inputSearch.current.focus();
  }, [/* dependencia */]);
  useEffect(() => {
    if(keyWord !== ''){
      search();
    }
  }, [keyWord]);

  return (
    <div
        className="relative w-full"
        css={css`
          svg.ring{
            position: absolute;
            right: .5rem;
            top: calc(50% - 10px);
            animation: ${intermittent} .8s infinite;
          }
        `}
      >
        <input 
          ref={ inputSearch }
          type="search"
          placeholder="Busca por nombre de producto"
          className={`${loading ? 'pr-10' : ''} w-full rounded-full border border-bluegray-100 shadow-xl py-2 px-3 text-description focus:border-p_blue-400 placeholder-bluegray-200`}
          onChange={ e => handleSearch(e) }
        />
        { loading ? (
          <>
            <FetchingIcon strokeC="#98B3EB" width="20" height="20" classN="ring" strokeWidth="3"/>
          </>
        ) : null }
    </div>
  );
};