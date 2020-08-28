import React, { useState } from 'react';
import SearchInput from './search-input';

export default function Search(){

  const [searchWord, setSearchWord] = useState('');

  return (
    <>
      <SearchInput setSearchWord={ setSearchWord }/>

      <p>{searchWord}</p>
    </>
  );
};