import React, { useContext, useState, useEffect } from 'react';
import ProductsSalesList from './products-sales-list';
import UserContext from 'context/user/UserContext';
import InfoHead from './InfoHead';

export default function Home(){

  const [filter, setFilter] = useState('active');
  const [list, setlist] = useState([]);

  const userContext = useContext(UserContext);
  const { groups, products, activeGroup, activeGroupMethod } = userContext;

  useEffect(() => {
    if(filter === 'active'){
      setlist(products.filter(x => x.status === 'ACTIVE' && x.group === activeGroup.name && !x.sale))
    }
    if(filter === 'total'){
      setlist(products.filter(x => x.group === activeGroup.name && !x.sale))
    }
    if(Object.keys(activeGroup).length === 0 && groups.length > 0){
      activeGroupMethod({
        name: groups[0].name,
        color: groups[0].color
      })
    }
  }, [filter, products, activeGroup, groups]);

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