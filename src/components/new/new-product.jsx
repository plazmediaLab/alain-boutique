import React, { useState } from 'react';
import FormNewProduct from './form-new-product';
import GroupList from './group-list';

export default function NewProduct(){

  // eslint-disable-next-line
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