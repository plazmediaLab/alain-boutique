import React, { useContext, useState } from 'react';
import FormNewProduct from './form-new-product';
import GroupList from './group-list';
import UserContext from '../../context/user/UserContext';

export default function NewProduct(){

  const [groups, setGroups] = useState([
    "Evan",
    "Ropa_de_hermana",
    "Ropa_nueva"
  ]);

  // const userContext = useContext(UserContext);
  // const { groups } = userContext;

  return (
    <>
      <GroupList groups={ groups }/>
      <FormNewProduct/>
    </>
  );
};