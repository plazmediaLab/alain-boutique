import React, { useContext } from 'react';
import UserContext from '../../context/user/UserContext';
import ItemsSales from './items-sales';

export default function Sales(){

  const userContext = useContext(UserContext);
  const { products } = userContext;

  return (
    <ItemsSales products={ products } />
  );
};