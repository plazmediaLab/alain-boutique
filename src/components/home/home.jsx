import React, { useContext, useState, useEffect } from 'react';
import InfoHead from './info-head';
import ProductsSalesList from './products-sales-list';
import UserContext from 'context/user/UserContext';

export default function Home(){

  const [filter, setFilter] = useState('active');
  const [list, setlist] = useState([]);

  const userContext = useContext(UserContext);
  const { groups, products, activeGroup, activeGroupMethod } = userContext;

  useEffect(() => {
    if(filter === 'active'){
      setlist(products.filter(x => x.status === 'ACTIVE' && x.group === activeGroup))
    }
    if(filter === 'total'){
      setlist(products.filter(x => x.group === activeGroup && !x.sale))
    }
  }, [filter, products, activeGroup]);

  return (
    <>
      
      <InfoHead
        products={ products }
        setFilter={ setFilter }
        groups={ groups }
        activeGroup={ activeGroup }
        activeGroupMethod={ activeGroupMethod }
      />

      <ProductsSalesList list={ list } filter={ filter }/>

    </>
  );
};