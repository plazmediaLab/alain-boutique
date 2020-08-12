import React, { useContext } from 'react';
import UserContext from '../../context/user/UserContext';

export default function Sales(){

  const userContext = useContext(UserContext);
  const { products } = userContext;

  return (
    <h1>List of products that have already been sold</h1>
  );
};