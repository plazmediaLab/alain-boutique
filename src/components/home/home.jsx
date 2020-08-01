import React, { useContext, useState, useEffect } from 'react';
import InfoHead from './info-head';
import UserContext from '../../context/user/UserContext';
import ProductsSalesList from './products-sales-list';

export default function Home(){

  const [salesTap, setSalesTap] = useState(true);
  const [hiddeIcon, setHiddeIcon] = useState(false);
  const [list, setlist] = useState([]);

  const userContext = useContext(UserContext);
  const { groups, products, activeGroup, activeGroupMethod } = userContext;

  useEffect(() => {
    if(salesTap){
      const productsList = products.filter(item => item.status === 'ACTIVE' && item.group === activeGroup );
      setlist(productsList)
    }else{
      const productsList = products.filter(item => item.group === activeGroup);
      setlist(productsList)
    }
  }, [activeGroup, products, salesTap]);

  return (
    <>
      <InfoHead 
        groups={ groups }
        products={ products }
        activeGroupMethod={ activeGroupMethod }
        activeGroup={ activeGroup }
        setlist={ setlist }
        salesTap={ salesTap }
        setSalesTap={ setSalesTap }
        setHiddeIcon={ setHiddeIcon }
      />
      
      <ProductsSalesList list={ list } hiddeIcon={ hiddeIcon } />

    </>
  );
};