import React, { useContext, useState, useEffect } from 'react';
import InfoHead from './info-head';
import UserContext from '../../context/user/UserContext';
import ProductsSalesList from './products-sales-list';

export default function Home(){

  const [sales, setSales] = useState(0);
  const [totalSales, setTotalSales] = useState(0);

  const userContext = useContext(UserContext);
  const { groups, products, activeGroup, activeGroupMethod } = userContext;

  const productsSalesGroupCount = () => {
    const number = products.filter(item => item.status === 'ACTIVE' && item.group === activeGroup );
    setSales(number.length);
  };
  const productsGroupCount = () => {
    const number = products.filter(item => item.group === activeGroup);
    setTotalSales(number.length);
  };

  useEffect(() => {
    productsSalesGroupCount();
    productsGroupCount();
  }, [activeGroup]);


  return (
    <>
      <InfoHead 
        groups={ groups }
        activeGroup={ activeGroup }
        activeGroupMethod={ activeGroupMethod }
        sales={ sales }
        totalSales={ totalSales }
      />
      
      <ProductsSalesList products={ products } products={ products } />
    </>
  );
};