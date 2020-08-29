/**@jsx jsx */
import React, { useRef, useEffect, useState } from 'react';
import FetchingIcon from 'components/Resources/fetching-icon';
import { jsx, css, keyframes } from '@emotion/core';

const intermittent = keyframes`
  from 0 to {
    opacity: .2;
  }
  25%{
    opacity: .5;
  }
  50%{
    opacity: 1;
  }
  75%{
    opacity: .5;
  }
  100%{
    opacity: .2;
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
          
          input[type="search"]{
            transition: all .2s ease-in-out;
          }
          
          svg.ring{
            position: absolute;
            right: .9rem;
            top: calc(50% - 10px);
            opacity: 0;
            animation: ${intermittent} .8s infinite;
            animation-delay: .1s;
            transition: all .2s ease-in-out;
          }
        `}
      >
        <input 
          ref={ inputSearch }
          type="search"
          placeholder="Busca por nombre de producto"
          className={`${loading ? 'pr-10' : ''} w-full rounded-full shadow-skin py-3 px-4 text-description placeholder-bluegray-200 bg-background border border-white`}
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