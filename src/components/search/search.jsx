import React, { useState, useContext, useEffect } from 'react';
import SearchInput from './search-input';
import UserContext from 'context/user/UserContext';
import notResults from 'images/not-found-results.svg';
import LoadingIcon from 'components/Resources/loading-icon';

export default function Search(){

  const [loading, setLoading] = useState(false);
  const [hasResult, setHasResult] = useState(true);
  const [searchWord, setSearchWord] = useState('');
  const [listFound, setListFound] = useState([]);

  const userContext = useContext(UserContext);
  const { products } = userContext;

  const accentsDelete = str => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
  };
  
  const search = str => {
    setHasResult(true);
    let newList = [];
    products.map(item => {
      const name = accentsDelete(item.name.toLowerCase());
      const word = accentsDelete(str.toLowerCase().trim());
      
      if(name.indexOf(word) !== -1){
        newList = [...newList, item];
      }
    });
    if(newList.length === 0){
      setHasResult(!hasResult);
    }
    setListFound(newList);
  };

  useEffect(() => {
    if(searchWord !== ''){
      search(searchWord);
      setLoading(false);
    }
    if(searchWord === ''){
      setListFound([]);
      setLoading(false);
      setHasResult(true);
    }
  }, [searchWord]);

  return (
    <>
      <SearchInput setSearchWord={ setSearchWord } setLoading={ setLoading } loading={ loading }/>

      {listFound.length > 0 ? (

        <section className="bg-white rounded-container shadow-container p-3 mt-5">

          <ul>
            { listFound.map(item => (
              <li key={ item.id }> { item.name } </li>
            )) }
          </ul>

        
        </section>

      ) : null}

      { !hasResult ? <img src={notResults} alt="Not found results" className="p-6 mt-5 md:max-w-md mx-auto"/> : null }

    </>
  );
};