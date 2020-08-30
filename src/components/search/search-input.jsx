/**@jsx jsx */
import React, { useRef, useEffect, useState, useContext } from 'react';
import { jsx, css, keyframes } from '@emotion/core';
import LoadingIcon from 'components/Resources/loading-icon';
import UserContext from 'context/user/UserContext';

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

  // TODO · Cambiar los iconos de los elementos select 08/30/2020 
  
  const [keyWord, setKeyWord] = useState('');

  const inputSearch = useRef(null);

  const userContext = useContext(UserContext);
  const { products } = userContext;

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
          className={`${loading ? 'pr-10' : ''} w-full rounded-full py-3 px-4 text-description placeholder-bluegray-200 border ${ products.length === 0 ? 'cursor-not-allowed bg-bluegray-100' : 'shadow-skin border-white bg-background' }`}
          onChange={ e => handleSearch(e) }
          disabled={ products.length === 0 ? true : false }
        />
        { loading ? (
          <>
            <LoadingIcon w="18" h="18" classN="ring"/>
          </>
        ) : null }
    </div>
  );
};