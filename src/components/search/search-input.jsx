/**@jsx jsx */
import React, { useRef, useEffect, useState } from 'react';
import { jsx, css, keyframes } from '@emotion/core';
import LoadingIcon from 'components/Resources/loading-icon';

const intermittent = keyframes`
  from 0 to {
    opacity: .2;
  }
  20%{
    opacity: .5;
  }
  40%{
    opacity: .8;
  }
  60%{
    opacity: .8;
  }
  80%{
    opacity: .5;
  }
  100%{
    opacity: .3;
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
            right: .8rem;
            top: calc(50% - 9px);
            opacity: .3;
            animation: ${intermittent} .8s infinite;
            animation-delay: .3s;
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
            <LoadingIcon w="18" h="18" classN="ring"/>
          </>
        ) : null }
    </div>
  );
};